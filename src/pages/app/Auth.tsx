import { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  Auth — connexion / inscription (UI seule, sans backend).
  Register : Nom/Prénom · Email ou numéro · MDP → OTP de confirmation.
  Login : Email ou numéro · MDP → OTP.
  L'OTP accepte le code de démo « 1234 » (ou tout code à 4 chiffres).
*/

type Mode = "login" | "register";
type Step = "form" | "otp";

interface AuthProps {
  onDone: () => void;
}

const OTP_LEN = 4;
const DEMO_CODE = "1234";

const Auth = ({ onDone }: AuthProps) => {
  const [mode, setMode] = useState<Mode>("register");
  const [step, setStep] = useState<Step>("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState<string[]>(() => Array(OTP_LEN).fill(""));
  const [error, setError] = useState("");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formValid =
    (mode === "login" || (firstName.trim() && lastName.trim())) &&
    identifier.trim().length > 2 &&
    password.length >= 6;

  const submitForm = () => {
    if (!formValid) {
      setError("Merci de compléter tous les champs (MDP ≥ 6 caractères).");
      return;
    }
    setError("");
    setStep("otp");
  };

  const otpValue = otp.join("");
  const verifyOtp = () => {
    if (otpValue.length !== OTP_LEN) {
      setError(`Entrez les ${OTP_LEN} chiffres reçus.`);
      return;
    }
    // UI seule : on accepte le code démo, sinon message d'aide.
    if (otpValue !== DEMO_CODE && !new RegExp(`^\\d{${OTP_LEN}}$`).test(otpValue)) {
      setError(`Code invalide. (démo : ${DEMO_CODE})`);
      return;
    }
    setError("");
    onDone();
  };

  const setOtpAt = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < OTP_LEN - 1) otpRefs.current[i + 1]?.focus();
  };

  useEffect(() => {
    if (step === "otp") otpRefs.current[0]?.focus();
  }, [step]);

  return (
    <div className="flex-1 flex flex-col bg-background px-[26px] pb-8 overflow-y-auto scr">
      {/* header */}
      <div className="pt-6 flex items-center gap-2">
        {step === "otp" ? (
          <button onClick={() => { setStep("form"); setError(""); }} aria-label="Retour" className="-ml-2 w-9 h-9 flex items-center justify-center">
            <ChevronLeft className="w-6 h-6" strokeWidth={2} />
          </button>
        ) : (
          <div className="w-11 h-11 rounded-[14px] border-2 border-foreground/15 flex items-center justify-center">
            <span className="font-display font-extrabold text-lg">26</span>
          </div>
        )}
      </div>

      {step === "form" ? (
        <>
          <h1 className="font-display font-extrabold text-[30px] tracking-tight mt-6">
            {mode === "register" ? "Créer un compte" : "Bon retour 👋"}
          </h1>
          <p className="text-[14.5px] text-muted-foreground mt-1.5">
            {mode === "register"
              ? "Rejoignez Dakar-Go pour suivre les Jeux."
              : "Connectez-vous pour retrouver votre agenda."}
          </p>

          {/* mode toggle */}
          <div className="mt-5 flex bg-muted rounded-[14px] p-1">
            {(["register", "login"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={cn(
                  "flex-1 py-2.5 rounded-[11px] text-[14px] font-semibold transition-base",
                  mode === m ? "bg-background shadow-sm text-foreground" : "text-muted-foreground",
                )}
              >
                {m === "register" ? "Inscription" : "Connexion"}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3.5">
            {mode === "register" && (
              <div className="flex gap-3">
                <Field label="Prénom" value={firstName} onChange={setFirstName} placeholder="Awa" />
                <Field label="Nom" value={lastName} onChange={setLastName} placeholder="Ndiaye" />
              </div>
            )}
            <Field
              label="Email ou numéro"
              value={identifier}
              onChange={setIdentifier}
              placeholder="awa@email.com · +221…"
            />
            <Field
              label="Mot de passe"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              type="password"
            />
          </div>

          {error && <div className="text-[12.5px] text-destructive mt-3">{error}</div>}

          <button
            onClick={submitForm}
            className="mt-6 bg-primary text-primary-foreground font-semibold text-[15px] py-[15px] rounded-[15px] inline-flex items-center justify-center gap-2 active:scale-[0.98] transition-base"
          >
            {mode === "register" ? "Continuer" : "Se connecter"}
            <ArrowRight className="w-[17px] h-[17px]" strokeWidth={2.3} />
          </button>

          <button onClick={onDone} className="mt-4 text-[13px] text-muted-foreground self-center">
            Continuer sans compte
          </button>
        </>
      ) : (
        <>
          <h1 className="font-display font-extrabold text-[30px] tracking-tight mt-6">Vérification</h1>
          <p className="text-[14.5px] text-muted-foreground mt-1.5 leading-[1.5]">
            Nous avons envoyé un code à {OTP_LEN} chiffres à<br />
            <span className="font-semibold text-foreground">{identifier || "votre contact"}</span>.
          </p>

          <div className="flex gap-2.5 mt-7">
            {otp.map((d, i) => (
              <input
                key={i}
                ref={(el) => (otpRefs.current[i] = el)}
                value={d}
                onChange={(e) => setOtpAt(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
                }}
                inputMode="numeric"
                maxLength={1}
                className="flex-1 aspect-square min-w-0 text-center font-display font-extrabold text-[22px] rounded-[14px] border-[1.5px] border-border bg-muted focus:border-primary focus:bg-background outline-none transition-base"
              />
            ))}
          </div>

          {error && <div className="text-[12.5px] text-destructive mt-4">{error}</div>}

          <div className="mt-4 text-[13px] text-muted-foreground">
            Code non reçu ? <button className="font-semibold text-primary">Renvoyer</button>
            <span className="mx-1.5 opacity-40">·</span>
            <span className="font-mono text-[11px]">démo : {DEMO_CODE}</span>
          </div>

          <button
            onClick={verifyOtp}
            className="mt-6 bg-primary text-primary-foreground font-semibold text-[15px] py-[15px] rounded-[15px] inline-flex items-center justify-center gap-2 active:scale-[0.98] transition-base"
          >
            <Check className="w-[17px] h-[17px]" strokeWidth={2.4} />
            Confirmer
          </button>
        </>
      )}
    </div>
  );
};

const Field = ({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) => (
  <label className="flex-1 block">
    <span className="text-[12px] font-semibold text-muted-foreground">{label}</span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      className="mt-1.5 w-full bg-muted rounded-[13px] px-[15px] py-[13px] text-[14.5px] outline-none border-[1.5px] border-transparent focus:border-primary focus:bg-background transition-base"
    />
  </label>
);

export default Auth;
