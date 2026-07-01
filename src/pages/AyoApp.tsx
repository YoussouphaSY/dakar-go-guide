import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import { SUGGESTIONS } from "@/data/appMock";

/*
  AyoApp — écran assistant AYO (mobile), fidèle au prototype (Prototype-2).
  Header, fil de messages, suggestions rapides, barre de saisie. Le clic sur
  une suggestion pousse la question puis une réponse simulée.
*/

const AyoApp = () => {
  const nav = useNavigate();
  const chat = useApp((s) => s.chat);
  const addChat = useApp((s) => s.addChat);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.length]);

  const ask = (q: string, a: string) => {
    addChat({ who: "me", text: q });
    setTimeout(() => addChat({ who: "bot", text: a }), 450);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-muted/40">
      {/* header */}
      <div className="flex-shrink-0 flex items-center gap-3.5 px-[18px] pt-2.5 pb-3.5 bg-background border-b border-border">
        <button onClick={() => nav("/")} aria-label="Retour" className="w-[38px] h-[38px] flex items-center justify-center -ml-2">
          <ChevronLeft className="w-[22px] h-[22px]" strokeWidth={2} />
        </button>
        <div className="w-[42px] h-[42px] rounded-full bg-primary flex items-center justify-center relative flex-shrink-0">
          <MessageCircle className="w-[22px] h-[22px] text-primary-foreground" strokeWidth={2} />
          <span className="absolute -top-px -right-px w-[13px] h-[13px] rounded-full bg-accent border-2 border-background" />
        </div>
        <div className="flex-1">
          <div className="font-display font-extrabold text-[17px]">AYO</div>
          <div className="text-[11.5px] text-primary flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            En ligne · FR EN AR WO ES
          </div>
        </div>
      </div>

      {/* messages */}
      <div className="scr flex-1 overflow-y-auto p-[18px] flex flex-col gap-3">
        {chat.map((m, i) => {
          const me = m.who === "me";
          return (
            <div key={i} className={cn("flex", me ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[78%] px-[15px] py-3 text-sm leading-[1.5] anim-fade",
                  me
                    ? "bg-primary text-primary-foreground rounded-[18px_18px_4px_18px]"
                    : "bg-background text-foreground border border-border rounded-[18px_18px_18px_4px]",
                )}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* suggestions */}
      <div className="scr flex-shrink-0 flex gap-2 px-4 pb-3 overflow-x-auto">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.q}
            onClick={() => ask(s.q, s.a)}
            className="flex-shrink-0 border-[1.5px] border-border bg-background text-foreground rounded-full px-3.5 py-[9px] text-[13px] font-medium whitespace-nowrap"
          >
            {s.q}
          </button>
        ))}
      </div>

      {/* input */}
      <div className="flex-shrink-0 flex items-center gap-2.5 px-4 pt-2.5 pb-[max(1rem,env(safe-area-inset-bottom))] bg-background border-t border-border">
        <div className="flex-1 bg-muted rounded-full px-[18px] py-[13px] text-sm text-muted-foreground">Écrivez à AYO…</div>
        <button aria-label="Envoyer" className="w-[46px] h-[46px] rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Send className="w-5 h-5 text-primary-foreground" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default AyoApp;
