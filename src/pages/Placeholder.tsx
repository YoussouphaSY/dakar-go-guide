import { Construction } from "lucide-react";

/* Écran temporaire pour les lots non encore construits. */
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
    <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
      <Construction className="h-7 w-7 text-muted-foreground" />
    </div>
    <div>
      <h1 className="font-display font-extrabold text-2xl">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">Écran en cours de construction.</p>
    </div>
  </div>
);

export default Placeholder;
