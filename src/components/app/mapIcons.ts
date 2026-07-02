import L from "leaflet";

/*
  mapIcons — fabrique des pins Leaflet de l'app (goutte colorée + point
  blanc, style du prototype) et du point « vous êtes ici » (halo pulsé,
  cf. .dg-userdot dans index.css). Partagé par la carte d'accueil et
  l'écran Mobilité.
*/

export function dropPin(color: string, size = 32, opts?: { muted?: boolean; selected?: boolean }): L.DivIcon {
  const opacity = opts?.muted ? 0.72 : 1;
  const shadow = opts?.selected
    ? "filter:drop-shadow(0 6px 10px rgba(0,0,0,.35));"
    : "filter:drop-shadow(0 3px 5px rgba(0,0,0,.25));";
  return L.divIcon({
    className: "dg-pin",
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;opacity:${opacity};${shadow}">
        <div style="position:absolute;inset:0;background:${color};border:2.5px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg)"></div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-62%);width:${Math.round(size * 0.22)}px;height:${Math.round(size * 0.22)}px;background:#fff;border-radius:50%"></div>
      </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

export function userDot(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: '<div class="dg-userdot"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}
