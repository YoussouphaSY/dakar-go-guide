import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import FloatingChat from "./FloatingChat";
import ayoImage from "@/assets/ayo-mascot-official.png";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Hide entirely on the full assistant page
  if (location.pathname === "/assistant") return null;

  return (
    <>
      {isOpen && <FloatingChat onClose={() => setIsOpen(false)} />}

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        {!isOpen && (
          <div style={{
            background: "hsl(158,100%,21%)", color: "#fff",
            padding: "6px 16px", borderRadius: 999, fontWeight: 600,
            fontSize: 13, boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}>
            AYO Chat
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Fermer AYO Chat" : "Ouvrir AYO Chat"}
          style={{
            width: 64, height: 64, borderRadius: "50%", border: "none", padding: 0,
            overflow: "hidden", cursor: "pointer", position: "relative",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)", transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
        >
          <img
            src={ayoImage}
            alt="AYO"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isOpen ? 0.4 : 1, transition: "opacity 0.2s" }}
          />
          {isOpen ? (
            <X size={24} color="#fff" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          ) : (
            <MessageCircle size={22} color="#fff" style={{ position: "absolute", bottom: 4, right: 4, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }} />
          )}
        </button>
      </div>
    </>
  );
};

export default ChatbotButton;
