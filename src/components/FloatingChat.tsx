import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle, Maximize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
}

interface FloatingChatProps {
  onClose: () => void;
}

const WHATSAPP_NUMBER = "221763269249";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FloatingChat = ({ onClose }: FloatingChatProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Bonjour ! Je suis AYO, votre assistant JOJ Dakar 2026. Comment puis-je vous aider ?", sender: "assistant" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setMessages((p) => [...p, { id: Date.now(), text: msg, sender: "user" }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/senegal-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: [{ role: "user", content: msg }], language: "fr" }),
        }
      );
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let text = "";
      let buf = "";
      const aid = Date.now() + 1;
      setMessages((p) => [...p, { id: aid, text: "", sender: "assistant" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
          const line = buf.slice(0, idx).replace(/\r$/, "");
          buf = buf.slice(idx + 1);
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") break;
          try {
            const delta = JSON.parse(raw)?.choices?.[0]?.delta?.content;
            if (delta) {
              text += delta;
              setMessages((p) => p.map((m) => (m.id === aid ? { ...m, text } : m)));
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch {
      setMessages((p) => [...p, { id: Date.now() + 2, text: "Désolé, je suis momentanément indisponible.", sender: "assistant" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed right-6 z-[9999] flex flex-col rounded-2xl overflow-hidden"
      style={{ bottom: 96, width: 300, height: 360, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", border: "1px solid #e7e5e4", background: "#fff" }}
    >
      {/* Header */}
      <div style={{ background: "#18181b", flexShrink: 0 }} className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <MessageCircle size={14} color="#FFE72E" />
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>AYO Chat</span>
          <span style={{ color: "#52525b", fontSize: 10 }}>JOJ 2026</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => { onClose(); navigate("/assistant"); }}
            title="Agrandir"
            style={{ color: "#71717a", lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#71717a"; }}
          >
            <Maximize2 size={13} />
          </button>
          <button
            onClick={onClose}
            style={{ color: "#71717a", lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#71717a"; }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2" style={{ background: "#fafaf9" }}>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              style={{
                maxWidth: "82%",
                padding: "6px 10px",
                borderRadius: 12,
                fontSize: 12,
                lineHeight: 1.5,
                background: m.sender === "user" ? "#18181b" : "#fff",
                color: m.sender === "user" ? "#fff" : "#1c1917",
                border: m.sender === "user" ? "none" : "1px solid #e7e5e4",
              }}
            >
              {m.text || (m.sender === "assistant" && loading ? "…" : "")}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.sender === "user" && (
          <div className="flex justify-start">
            <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 12, padding: "6px 10px", display: "flex", gap: 4 }}>
              {[0, 150, 300].map((d) => <span key={d} className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* WhatsApp */}
      <div style={{ padding: "6px 10px 4px", flexShrink: 0 }}>
        <button
          onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20JOJ%20Dakar%202026%20!`, "_blank")}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
          style={{ background: "#25D366", fontSize: 11 }}
        >
          <WaIcon />
          Discuter sur WhatsApp
        </button>
      </div>

      {/* Input */}
      <div style={{ padding: "4px 10px 10px", flexShrink: 0, display: "flex", gap: 6 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Votre question…"
          disabled={loading}
          style={{
            flex: 1, height: 34, borderRadius: 8, border: "1px solid #e7e5e4",
            padding: "0 10px", fontSize: 12, outline: "none", background: "#fff", color: "#1c1917",
          }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            width: 34, height: 34, borderRadius: 8, background: "#18181b", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            opacity: loading || !input.trim() ? 0.4 : 1,
          }}
        >
          <Send size={14} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default FloatingChat;
