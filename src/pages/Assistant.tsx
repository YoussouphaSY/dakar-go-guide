import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import aiAssistantImage from "@/assets/ai-assistant.png";
import aiAssistantImage from "@/assets/IMG_0167-e1761916299674.jpeg";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

type Language = "fr" | "en" | "wo";

const languageConfig: Record<Language, { flag: string; name: string }> = {
  fr: { flag: "🇫🇷", name: "Français" },
  en: { flag: "🇬🇧", name: "English" },
  wo: { flag: "🇸🇳", name: "Wolof" },
};

const welcomeMessages: Record<Language, string> = {
  fr: "Bienvenue ! Je suis votre assistant pour les Jeux Olympiques de la Jeunesse Dakar 2026 et la découverte du Sénégal. Jërëjëf !",
  en: "Welcome! I'm your assistant for the Dakar 2026 Youth Olympic Games and discovering Senegal.",
  wo: "Dalal ak djam! Mangi assistant bi ngir Jeux Olympiques Jeunesse Dakar 2026 ak découverte Sénégal.",
};

const Assistant = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: welcomeMessages.fr,
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState<Language>("fr");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: welcomeMessages[language],
        sender: "assistant",
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'wo-SN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        // Envoyer automatiquement après la reconnaissance vocale
        setTimeout(() => {
          sendMessage(transcript);
        }, 100);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Erreur",
          description: "Impossible d'utiliser le microphone",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language, toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Non supporté",
        description: "La reconnaissance vocale n'est pas supportée par votre navigateur",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'wo-SN';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/senegal-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: messages
              .filter((m) => m.sender === "user" || m.sender === "assistant")
              .map((m) => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text,
              }))
              .concat([{ role: "user", content: messageText }]),
            language: language,
          }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Erreur de communication avec l'assistant");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      let textBuffer = "";

      const assistantMessage: Message = {
        id: messages.length + 2,
        text: "",
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;

        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantText += content;
              // Nettoyer les ** markdown
              const cleanText = assistantText.replace(/\*\*/g, '');
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessage.id
                    ? { ...m, text: cleanText }
                    : m
                )
              );
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Parler uniquement si autoSpeak est activé
      if (autoSpeak) {
        const cleanText = assistantText.replace(/\*\*/g, '');
        speak(cleanText);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de communiquer avec l'assistant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 mb-4">
            <div className="flex items-center gap-2 md:gap-3">
              <img src={aiAssistantImage} alt="Assistant IA" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">AYO Chat</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Expert en culture sénégalaise et JOJ 2026</p>
              </div>
            </div>
            <div className="flex gap-1.5 md:gap-2 w-full md:w-auto overflow-x-auto">
              {(Object.keys(languageConfig) as Language[]).map((lang) => (
                <Button
                  key={lang}
                  variant={language === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage(lang)}
                  className="gap-1.5 md:gap-2 text-xs md:text-sm whitespace-nowrap"
                >
                  <span>{languageConfig[lang].flag}</span>
                  <span>{languageConfig[lang].name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Card className="h-[500px] md:h-[600px] flex flex-col">
          <ScrollArea ref={scrollRef} className="flex-1 p-3 md:p-6">
            <div className="space-y-3 md:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] rounded-lg p-3 md:p-4 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm md:text-base break-words">{message.text}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString(language === "fr" ? "fr-FR" : "en-US")}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <Badge variant="secondary" className="text-xs md:text-sm">L'assistant réfléchit...</Badge>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2 px-2">
              <Button
                size="sm"
                variant={autoSpeak ? "default" : "outline"}
                onClick={() => setAutoSpeak(!autoSpeak)}
                className="text-xs"
              >
                {autoSpeak ? <Volume2 className="h-3 w-3 mr-1" /> : <VolumeX className="h-3 w-3 mr-1" />}
                <span className="hidden sm:inline">{autoSpeak ? "Lecture auto activée" : "Lecture auto désactivée"}</span>
                <span className="sm:hidden">{autoSpeak ? "Auto" : "Manuel"}</span>
              </Button>
            </div>
            <div className="flex gap-1.5 md:gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                className="flex-1 text-sm md:text-base"
                disabled={isLoading}
              />
              <Button
                size="icon"
                variant={isListening ? "destructive" : "outline"}
                onClick={toggleListening}
                title="Appuyez pour parler"
                className="h-9 w-9 md:h-10 md:w-10 flex-shrink-0"
              >
                {isListening ? <MicOff className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <Mic className="h-3.5 w-3.5 md:h-4 md:w-4" />}
              </Button>
              <Button
                size="icon"
                variant={isSpeaking ? "destructive" : "outline"}
                onClick={isSpeaking ? stopSpeaking : () => {
                  if (messages.length > 0) {
                    const lastAssistantMsg = [...messages].reverse().find(m => m.sender === 'assistant');
                    if (lastAssistantMsg) speak(lastAssistantMsg.text);
                  }
                }}
                title={isSpeaking ? "Arrêter la lecture" : "Lire le dernier message"}
                className="h-9 w-9 md:h-10 md:w-10 flex-shrink-0"
              >
                {isSpeaking ? <VolumeX className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <Volume2 className="h-3.5 w-3.5 md:h-4 md:w-4" />}
              </Button>
              <Button 
                size="icon" 
                onClick={() => sendMessage()} 
                disabled={isLoading || !inputValue.trim()}
                className="h-9 w-9 md:h-10 md:w-10 flex-shrink-0"
              >
                <Send className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <Card className="p-3 md:p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => sendMessage("Raconte-moi l'histoire de l'île de Gorée")}>
            <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">🏛️ Histoire de Gorée</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Découvrez le patrimoine UNESCO</p>
          </Card>
          <Card className="p-3 md:p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => sendMessage("Quels sont les sports aux JOJ Dakar 2026 ?")}>
            <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">🏅 Programme JOJ 2026</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Tous les sports olympiques</p>
          </Card>
          <Card className="p-3 md:p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => sendMessage("Parle-moi de la culture sénégalaise")}>
            <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">🎭 Culture Sénégalaise</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Teranga et traditions</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
