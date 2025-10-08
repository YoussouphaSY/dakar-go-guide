import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Bot, User, Languages } from "lucide-react";
import aiAssistantImage from "@/assets/ai-assistant.png";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

type Language = "fr" | "en" | "wo" | "ff";

const welcomeMessages: Record<Language, string> = {
  fr: "Bonjour ! Je suis votre assistant pour les Jeux Olympiques de la Jeunesse Dakar 2026. Comment puis-je vous aider aujourd'hui ?",
  en: "Hello! I am your assistant for the Dakar 2026 Youth Olympic Games. How can I help you today?",
  wo: "Salaam aleekum! Man mooy sa assistant ci Jeux Olympiques yu Jeunesse Dakar 2026. Naka man mën a jëkkëri la?",
  ff: "Bismillah! Mi ko wallifaajo mo kampani Olimpik e Dow Dakar 2026. Hol no mbaɗan wallitaade ma?"
};

const Assistant = () => {
  const [language, setLanguage] = useState<Language>("fr");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: welcomeMessages.fr,
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update welcome message when language changes
    setMessages([{
      id: 1,
      text: welcomeMessages[language],
      sender: "assistant",
      timestamp: new Date(),
    }]);
  }, [language]);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<Language, string[]> = {
        fr: [
          "Je peux vous aider à trouver les horaires des événements. Quel sport vous intéresse ?",
          "Le stade Léopold Sédar Senghor est accessible en bus ligne 7 ou en taxi. Souhaitez-vous plus d'informations ?",
          "Les événements d'athlétisme commencent à 9h00 chaque jour. Voulez-vous ajouter cet événement à votre agenda ?",
          "Pour les recommandations d'hébergement, je vous suggère de consulter votre profil où vous trouverez des options personnalisées.",
        ],
        en: [
          "I can help you find event schedules. Which sport are you interested in?",
          "Léopold Sédar Senghor Stadium is accessible by bus line 7 or taxi. Would you like more information?",
          "Athletics events start at 9:00 AM every day. Would you like to add this event to your agenda?",
          "For accommodation recommendations, I suggest checking your profile where you'll find personalized options.",
        ],
        wo: [
          "Man mën nañu gis li nekk ci waxtu événements yi. Lan sport la bëgg?",
          "Stade Léopold Sédar Senghor nekk na ci bus ligne 7 walla taxi. Bëgg nga gëna xam?",
          "Athlétisme dafay tambali ci 9h00 bés bu nekk. Bëgg nga yokk ko ci sa agenda?",
          "Ngir recommandations yu dëkk, man lay wone nga gis sa profil, fi nga gis options yu personalisées.",
        ],
        ff: [
          "Miɗo waawi wallude ma yiytude sahaa gollol. Hol walla sportu no yiɗi?",
          "Stade Léopold Sédar Senghor waɗi e bus ligne 7 walla taxi. Aɗa yiɗi teskude humpito?",
          "Gollol athlétisme fuɗɗii ka sahaa 9h00 kala ñalawma. Aɗa yiɗi ɓeydude mo e agenda maa?",
          "Ngam rekommendaasiyoŋ duumɓe, mi waɗi ɗum yiylo profil maa, ɗo a yiytu options personalisées.",
        ],
      };

      const languageResponses = responses[language];
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: languageResponses[Math.floor(Math.random() * languageResponses.length)],
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8 h-[calc(100vh-8rem)]">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              <img src={aiAssistantImage} alt="Assistant" className="h-12 w-12" />
              Assistant IA
            </h1>
            <p className="text-muted-foreground">
              {language === "fr" && "Posez vos questions sur les événements, horaires, transports et plus encore"}
              {language === "en" && "Ask your questions about events, schedules, transport and more"}
              {language === "wo" && "Laaj sa questions ci événements, waxtu, transport ak yeneen"}
              {language === "ff" && "Naamna haala maa e gollol, sahaa, transport e goɗɗe"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-muted-foreground" />
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="wo">🇸🇳 Wolof</SelectItem>
                <SelectItem value="ff">🇸🇳 Pulaar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="flex flex-col h-[calc(100%-8rem)]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "assistant" && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {message.sender === "user" && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-5 w-5 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Posez votre question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Assistant;
