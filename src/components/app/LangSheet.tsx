import OptionSheet from "./OptionSheet";
import { useApp } from "@/store/appStore";
import { LANGS } from "@/data/appMock";

/* LangSheet — choix de la langue affichée (badge accueil / profil). */
const LangSheet = () => {
  const langOpen = useApp((s) => s.langOpen);
  const setLangOpen = useApp((s) => s.setLangOpen);
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);

  return (
    <OptionSheet
      open={langOpen}
      onClose={() => setLangOpen(false)}
      title="Choisir la langue"
      options={LANGS.map((l) => ({ value: l.id, label: l.full }))}
      active={lang}
      onSelect={(v) => setLang(v as typeof lang)}
    />
  );
};

export default LangSheet;
