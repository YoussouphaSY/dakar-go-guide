import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Send, Mic, MicOff, Volume2, VolumeX, Landmark, Medal, Theater } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import ReactMarkdown from "react-markdown";
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
  const { t } = useLanguage();
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
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessage.id
                    ? { ...m, text: assistantText }
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

      if (autoSpeak) {
        const cleanText = assistantText.replace(/[*#_~`]/g, '');
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

  const WHATSAPP_NUMBER = "221338200000";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto px-2 md:px-4 py-4 md:py-6" style={{ maxWidth: 640 }}>
        <div className="mb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <img src={aiAssistantImage} alt="Assistant IA" className="h-8 w-8 rounded-full" />
              <div>
                <h1 className="text-lg font-bold leading-tight">AYO Chat</h1>
                <p className="text-xs text-muted-foreground">{t.assistant?.subtitle || "Expert en culture sénégalaise et JOJ 2026"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 overflow-x-auto">
                {(Object.keys(languageConfig) as Language[]).map((lang) => (
                  <Button
                    key={lang}
                    variant={language === lang ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage(lang)}
                    className="gap-1 text-xs whitespace-nowrap h-7 px-2"
                  >
                    <span>{languageConfig[lang].flag}</span>
                    <span className="hidden sm:inline">{languageConfig[lang].name}</span>
                  </Button>
                ))}
              </div>
              <button
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20JOJ%20Dakar%202026%20!`, "_blank")}
                className="flex items-center gap-1.5 px-3 h-7 rounded-lg text-white text-xs font-semibold whitespace-nowrap flex-shrink-0"
                style={{ background: "#25D366" }}
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        <Card className="flex flex-col" style={{ height: "calc(100vh - 176px)" }}>
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
                    {message.sender === "assistant" ? (
                      <div className="prose prose-sm max-w-none text-foreground [&_p]:mb-2 [&_ul]:mb-2 [&_ol]:mb-2 [&_li]:mb-0.5 [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_strong]:text-foreground">
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap text-sm md:text-base break-words">{message.text}</p>
                    )}
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString(language === "fr" ? "fr-FR" : "en-US")}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
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
                <span className="hidden sm:inline">{autoSpeak ? (t.assistant?.autoOn || "Lecture auto") : (t.assistant?.autoOff || "Manuel")}</span>
              </Button>
            </div>
            <div className="flex gap-1.5 md:gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.assistant?.placeholder || "Posez votre question..."}
                className="flex-1 text-sm md:text-base"
                disabled={isLoading}
              />
              <Button
                size="icon"
                variant={isListening ? "destructive" : "outline"}
                onClick={toggleListening}
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

          {/* Quick-action chips — inside the card */}
          <div className="border-t px-3 py-2 grid grid-cols-3 gap-2 flex-shrink-0">
            <button
              className="flex flex-col items-start gap-0.5 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
              onClick={() => sendMessage("Raconte-moi l'histoire de l'île de Gorée")}
            >
              <span className="flex items-center gap-1 text-[11px] font-semibold text-foreground">
                <Landmark className="h-3 w-3 text-primary flex-shrink-0" />
                {t.assistant?.goree || "Gorée"}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">{t.assistant?.goreeDesc || "Patrimoine UNESCO"}</span>
            </button>
            <button
              className="flex flex-col items-start gap-0.5 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
              onClick={() => sendMessage("Quels sont les sports aux JOJ Dakar 2026 ?")}
            >
              <span className="flex items-center gap-1 text-[11px] font-semibold text-foreground">
                <Medal className="h-3 w-3 text-secondary flex-shrink-0" />
                {t.assistant?.program || "Programme"}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">{t.assistant?.programDesc || "Sports olympiques"}</span>
            </button>
            <button
              className="flex flex-col items-start gap-0.5 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
              onClick={() => sendMessage("Parle-moi de la culture sénégalaise")}
            >
              <span className="flex items-center gap-1 text-[11px] font-semibold text-foreground">
                <Theater className="h-3 w-3 text-accent flex-shrink-0" />
                {t.assistant?.culture || "Culture"}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">{t.assistant?.cultureDesc || "Teranga & traditions"}</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Assistant;
