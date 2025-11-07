/**
 * ChatbotButton.tsx
 * 
 * Composant : Bouton flottant d'accès rapide à l'assistant IA AYO
 * 
 * Fonctionnalités :
 * - Bouton fixe en bas à droite de l'écran
 * - Image de la mascotte AYO des JOJ 2026
 * - Effet hover avec animation scale
 * - Navigation directe vers la page /assistant
 * 
 * Utilisation :
 * Intégré dans App.tsx, visible sur toutes les pages
 */

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ayoImage from "@/assets/ayo-mascot-official.jpg"; // Image officielle de la mascotte AYO

const ChatbotButton = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      {/* Label "AYO Chat" */}
      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
        AYO Chat
      </div>
      
      {/* Bouton avec image */}
      <Button 
        onClick={() => navigate("/assistant")} 
        className="h-16 w-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 p-0 overflow-hidden" 
        size="icon" 
        aria-label="Ouvrir l'assistant AYO"
      >
        {/* Image de la mascotte AYO */}
        <img src={ayoImage} alt="AYO - Assistant IA des JOJ 2026" className="h-full w-full object-cover" />
        
        {/* Overlay avec effet hover */}
        <div className="absolute inset-0 transition-colors bg-black/0" />
        
        {/* Icône de message en bas à droite */}
        <MessageCircle className="absolute h-6 w-6 text-white bottom-1 right-1 drop-shadow-lg" />
      </Button>
    </div>
  );
};
export default ChatbotButton;