import Toast from "./Toast";
import AyoFab from "./AyoFab";
import EventSheet from "./EventSheet";
import LangSheet from "./LangSheet";

/*
  AppOverlays — couche transverse de l'interface app : toast, bouton AYO
  flottant, et sheets globales (détail épreuve, langue). Montée une fois
  dans le shell app, au-dessus de tous les écrans. (Le pop-up d'un lieu de
  la carte est désormais ancré au-dessus du point dans MiniMap.)
*/
const AppOverlays = () => (
  <>
    <EventSheet />
    <LangSheet />
    <AyoFab />
    <Toast />
  </>
);

export default AppOverlays;
