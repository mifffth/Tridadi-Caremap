import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/map-view.css";

export class MapView {
  constructor(container) {
    this.container = container;
    this.presenter = null;
    this.map = null;
    this.userMarker = null;
  }

  setPresenter(presenter) {
    this.presenter = presenter;
  }

  render() {
    this.container.innerHTML = `

      <div id="map-container"></div>

    `;
    this.initMap();
  }

  async initMap() {
    const savedView = sessionStorage.getItem("mapView");
    if (savedView) {
      const { center, zoom } = JSON.parse(savedView);
      this.map = L.map("map-container").setView(center, zoom);
    } else {
      this.map = L.map("map-container").setView(
        [-7.711361976168338, 110.3525845328189],
        14
      );
    }

    const style = document.createElement("style");
    style.innerHTML = `
      .leaflet-control-layers-overlays label {
        text-align: center;
      }
    `;
    document.head.appendChild(style);

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const baseLayers = {
      OpenStreetMap: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap",
        }
      ).addTo(this.map),
      OpenTopoMap: L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          attribution: "Map data: &copy; OpenTopoMap contributors",
        }
      ),
      "Esri World Imagery": L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }
      ),
    };

    this.loadFaskesData(baseLayers);
    this.addLocationControl();

    this.map.on("moveend", () => {
      const center = this.map.getCenter();
      const zoom = this.map.getZoom();
      sessionStorage.setItem(
        "mapView",
        JSON.stringify({
          center: [center.lat, center.lng],
          zoom: zoom,
        })
      );
    });
  }

  async loadFaskesData(baseLayers) {
    try {
      const response = await fetch("./faskes.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const faskesData = await response.json();

      const orderedFaskesTypes = [
        { name: "Apotek", color: "#1E88E5" },
        { name: "Klinik", color: "#43A047" },
        { name: "Praktek Mandiri", color: "#FFC107" },
        { name: "Posyandu", color: "#E91E63" },
        { name: "Puskesmas", color: "#E53935" },
        { name: "Lainnya", color: "#9C27B0" },
      ];

      const overlays = {};
      const faskesLayers = {};

      orderedFaskesTypes.forEach((faskesType) => {
        const layerGroup = L.layerGroup().addTo(this.map);
        overlays[faskesType.name] = layerGroup;
        faskesLayers[faskesType.name] = {
          layer: layerGroup,
          color: faskesType.color,
        };
      });

      faskesData.forEach((faskes) => {
        const { tipe, nama, lat, lon } = faskes;

        if (faskesLayers[tipe]) {
          const icon = this.createColoredIcon(faskesLayers[tipe].color);
          const marker = L.marker([lat, lon], { icon })
            .bindPopup(`<b>${nama}</b><br>
                  <b>Tipe:</b> ${tipe} <br>
                  <b>Koordinat:</b> <a href="https://www.google.com/maps/place/${lat},${
          lon
        }" 
               target="_blank" 
               rel="noopener">
              ${lat.toFixed(5)}, ${lon.toFixed(5)}
            </a>`);

          faskesLayers[tipe].layer.addLayer(marker);
        }
      });

      const layersControl = L.control
        .layers(baseLayers, overlays, {
          position: "topright",
          collapsed: true,
        })
        .addTo(this.map);

      fetch("./data/batas_dusun.geojson")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("GeoJSON data loaded:", data);
          console.log("Type:", data.type);
          console.log(
            "Features count:",
            data.features?.length || "No features"
          );

          const geojsonLayer = L.geoJSON(data, {
            style: function (feature) {
              console.log("Styling feature:", feature);
              return {
                color: "#3388ff",
                weight: 3,
                opacity: 1,
                fillOpacity: 0.5,
              };
            },
            onEachFeature: function (feature, layer) {
              console.log("Feature:", feature);
              if (feature.properties) {
                layer.bindPopup("Padukuhan: " + feature.properties.dusun);
              }
            },
          });

          console.log(
            "GeoJSON Layer created:",
            geojsonLayer.getLayers().length,
            "layers"
          );

          layersControl.addOverlay(geojsonLayer, "Padukuhan");
          geojsonLayer.addTo(this.map);

          this.geojsonLayer = geojsonLayer;
        })

        .catch((error) =>
          console.error("Error loading the GeoJSON file:", error)
        );
    } catch (error) {
      console.error("Gagal memuat data Faskes:", error);
      this.container.innerHTML += `<div class="error-message">Gagal memuat data fasilitas kesehatan.</div>`;
    }
  }

  addLocationControl() {
    const LocationControl = L.Control.extend({
      options: {
        position: "topleft",
      },
      onAdd: (map) => {
        const button = L.DomUtil.create("button", "leaflet-bar");
        button.innerHTML =
          '<i class="fa-solid fa-location-dot" style="font-size: 19px;"></i>';
        button.setAttribute("aria-label", "Temukan lokasi saya");
        button.style.backgroundColor = "white";
        button.style.color = "black";
        button.style.padding = "8px 8px 8px 8px";
        button.style.borderRadius = "4px";
        button.style.boxShadow = "0 4px 12px rgba(68, 55, 55, 0.1)";
        button.style.cursor = "pointer";
        button.onclick = (e) => {
          e.stopPropagation();
          this.getUserLocation();
        };
        return button;
      },
    });
    this.map.addControl(new LocationControl());
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const latLng = [latitude, longitude];

          if (this.userMarker) {
            this.map.removeLayer(this.userMarker);
          }

          const userIcon = L.divIcon({
            html: '<div class="user-marker-pulse"></div>',
            className: "user-marker-container",
            iconSize: [20, 20],
          });

          this.userMarker = L.marker(latLng, { icon: userIcon }).addTo(
            this.map
          );
          this.map.setView(latLng, 15);

          const popupContainer = document.createElement("div");
          popupContainer.innerHTML = `
            <b>Lokasi Anda:</b><br>${latitude.toFixed(5)}, ${longitude.toFixed(
            5
          )}
            <br><br>
            <button class="delete-marker-button">Hapus</button>
        `;

          const deleteBtn = popupContainer.querySelector(
            ".delete-marker-button"
          );
          if (deleteBtn) {
            deleteBtn.onclick = () => {
              if (this.userMarker) {
                this.map.removeLayer(this.userMarker);
                this.userMarker = null;
              }
            };
          }

          this.userMarker.bindPopup(popupContainer).openPopup();
        },
        (error) => {
          alert(
            "Gagal mendapatkan lokasi Anda. Pastikan Anda memberikan izin lokasi."
          );
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation tidak didukung oleh browser Anda.");
    }
  }

  createColoredIcon(color) {
    const markerHtmlStyles = `
      background-color: ${color};
      width: 1.5rem;
      height: 1.5rem;
      display: block;
      left: -0.75rem;
      top: -0.75rem;
      position: relative;
      border-radius: 1.5rem 1.5rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`;

    return L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      popupAnchor: [0, -36],
      html: `<span style="${markerHtmlStyles}" />`,
    });
  }
}
