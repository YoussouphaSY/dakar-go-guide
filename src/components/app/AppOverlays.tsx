import Toast from "./Toast";
import AyoFab from "./AyoFab";
import EventSheet from "./EventSheet";
import VenueDetailSheet from "./VenueDetailSheet";

/*
  AppOverlays — couche transverse de l'interface app : toast, bouton AYO
  flottant, sheet globale (détail épreuve), et fiche lieu détaillée plein
  écran. Montée une fois dans le shell app, au-dessus de tous les écrans.
  (Le pop-up d'un lieu de la carte est ancré au-dessus du point dans MiniMap ;
  le choix de langue est un pop-up ancré sous le badge dans HomeApp.)
*/
const AppOverlays = () => (
  <>
    <EventSheet />
    <VenueDetailSheet />
    <AyoFab />
    <Toast />
  </>
);

export default AppOverlays;
