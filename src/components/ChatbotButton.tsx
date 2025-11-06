import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ayoImage from "@/assets/dakar2026-logo.jpg";

const ChatbotButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/assistant")}
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-50 p-0 overflow-hidden"
      size="icon"
    >
      <img 
        src={ayoImage} 
        alt="AYO Assistant" 
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/20 hover:bg-primary/30 transition-colors" />
      <MessageCircle className="absolute h-6 w-6 text-white bottom-1 right-1 drop-shadow-lg" />
    </Button>
  );
};

export default ChatbotButton;
