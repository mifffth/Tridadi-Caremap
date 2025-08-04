import L from "leaflet";

const baseUrl =
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master";

export const markerIcons = {
  Apotek: L.icon({
    iconUrl: `${baseUrl}/img/marker-icon-green.png`,
    shadowUrl: `${baseUrl}/img/marker-shadow.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  }),
  Klinik: L.icon({
    iconUrl: `${baseUrl}/img/marker-icon-grey.png`,
    shadowUrl: `${baseUrl}/img/marker-shadow.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  }),
  "Praktek Mandiri": L.icon({
    iconUrl: `${baseUrl}/img/marker-icon-gold.png`,
    shadowUrl: `${baseUrl}/img/marker-shadow.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  }),
  Posyandu: L.icon({
    iconUrl: `${baseUrl}/img/marker-icon-violet.png`,
    shadowUrl: `${baseUrl}/img/marker-shadow.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  }),
  Puskesmas: L.icon({
    iconUrl: `${baseUrl}/img/marker-icon-blue.png`,
    shadowUrl: `${baseUrl}/img/marker-shadow.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  }),
  Lainnya: L.icon({
    iconUrl: `${baseUrl}/img/marker-icon-orange.png`,
    shadowUrl: `${baseUrl}/img/marker-shadow.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  }),
};
