import "../../styles/home-view.css";
import "../../styles/styles.css";
export class HomeView {
  constructor(container) {
    this.container = container;
    this.presenter = null;
  }

  setPresenter(presenter) {
    this.presenter = presenter;
  }

  render() {
    this.container.innerHTML = `
    <div class="hero">
        <h1 class="text-4xl font-bold">WebGIS Persebaran Fasilitas Kesehatan Tridadi</h1>
    </div>

    <div class="welcome-content">
        <h2 class="text-5xl font-bold">Selamat Datang</h2>
        <p class="mt-6">
            WebGIS ini dirancang untuk memvisualisasikan persebaran fasilitas kesehatan seperti rumah sakit,
            puskesmas, apotek, dan fasilitas kesehatan lainnya di wilayah Kelurahan Tridadi, Sleman, Daerah Istimewa
            Yogyakarta
            secara interaktif dan informatif, disertai informasi nama dan koordinat geografis dari setiap titik
            fasilitas kesehatan.
        </p>
    </div>

    <div class="info-map-wrapper">
        <div class="tridadi-info">
            <div class="intro bg-gray-100 p-4 rounded-xl shadow">
                <h3 class="text-2xl font-bold mb-2">Tentang Kalurahan Tridadi</h3>
                <p>
                    Tridadi adalah kalurahan di Kapanéwon Sleman, Kabupaten Sleman, Daerah Istimewa Yogyakarta. Selain
                    sebagai pusat pemerintahan Kabupaten Sleman,
                    Tridadi juga dikenal karena memiliki <strong>Stadion Tridadi</strong>, markas latihan klub sepak bola
                    <strong>PSS Sleman</strong> sebelum memiliki Stadion Maguwoharjo.
                </p>
                <ul class="mt-3 list-disc list-inside">
                    <li>Provinsi: Daerah Istimewa Yogyakarta</li>
                    <li>Kabupaten: Sleman</li>
                    <li>Kecamatan: Sleman</li>
                    <li>Koordinat: 7°42′47.226″S, 110°21′23.586″E</li>
                </ul>
            </div>
        </div>

        <div class="map-home">
            <div id="map-home"></div>
        </div>
    </div>

    <div class="gallery-container">
        <div class="gallery">
          ${[
            {
              src: "/images/foto1.webp",
              label: "Klinik Pratama Adera",
              lat: -7.722794283039989,
              lon: 110.36085723820337,
            },
            {
              src: "/images/foto2.webp",
              label: "Apotek Pratama Tridadi",
              lat: -7.719279370082687,
              lon: 110.35429126817726,
            },
            {
              src: "/images/foto3.webp",
              label: "UPTD PSC SLEMAN EMERGENCY SERVICES",
              lat: -7.718408205424657,
              lon: 110.35654876282996,
            },
            {
              src: "/images/foto4.webp",
              label: "Denticia Dental Implant",
              lat: -7.723474790153414,
              lon: 110.36002313622022,
            },
            {
              src: "/images/foto5.webp",
              label: "Posyandu Melati Putih Desa Jaban",
              lat: -7.7227137131730705,
              lon: 110.35899028054988,
            },
            {
              src: "/images/foto6.webp",
              label: "Klinik Tridadi Peduli Sehat (FKTP Dr. Trisnina)",
              lat: -7.716955715479557,
              lon: 110.34536338117213,
            },
          ]
            .map(
              (item) => `
            <div class="image-card">
              <img src="${item.src}" alt="${item.label}" class="gallery-img" data-full="${item.src}">
              <div class="overlay-text">
                <a href="https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lon}" 
                  target="_blank" 
                  rel="noopener noreferrer">
                  ${item.label}
                </a>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
    </div>

    <div class="intro-full-width-container">
        <div class="intro">
            <h3 class="text-2xl font-bold">Mengapa Faskes Penting?</h3>
            <p class="mt-6">
                Faskes yang tersebar secara merata dapat meningkatkan akses layanan kesehatan, mengurangi waktu respons
                darurat, dan mendorong pemerataan kualitas hidup masyarakat. Informasi yang transparan tentang lokasi
                faskes membantu perencanaan wilayah dan pengambilan keputusan kebijakan publik.
            </p>
        </div>
    </div>

    <h2 class="text-2xl font-bold text-center mb-8 mt-8">Statistik Fasilitas Kesehatan Tridadi</h2>

    <div id="chart"></div>

    <div id="image-modal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center hidden z-50">
        <div class="relative">
            <img id="modal-image" src="" alt="Preview" class="max-h-[90vh] rounded-xl shadow-lg">
            <button id="modal-close" class="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200 text-black">
                ✕
            </button>
        </div>
    </div>
    `;

    const map = L.map("map-home").setView([-7.7125, 110.3503], 15);

    const baseLayers = {
      OpenStreetMap: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap",
        }
      ),
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

    baseLayers["OpenStreetMap"].addTo(map);

    const layersControl = L.control
      .layers(baseLayers, null, {
        position: "topright",
        collapsed: true,
      })
      .addTo(map);

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([-7.713206522583192, 110.35674613754897])
      .addTo(map)
      .bindPopup(
        `<b><a href="https://tridadisid.slemankab.go.id/home/" target="_blank" rel="noopener noreferrer">Kantor Kalurahan Tridadi</a></b><br>Pusat pemerintahan di Tridadi, Sleman.`
      )      
      .openPopup();

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
        console.log("Features count:", data.features?.length || "No features");

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

        layersControl.addOverlay(geojsonLayer, "Tridadi");
        geojsonLayer.addTo(map);

        this.geojsonLayer = geojsonLayer;
      })

      .catch((error) =>
        console.error("Error loading the GeoJSON file:", error)
      );

    fetch("./faskes.json")
      .then((response) => response.json())
      .then((data) => {
        const countsByTipe = data.reduce((acc, item) => {
          acc[item.tipe] = (acc[item.tipe] || 0) + 1;
          return acc;
        }, {});

        let categories = Object.keys(countsByTipe);

        const lainnyaIndex = categories.indexOf("Lainnya");
        if (lainnyaIndex > -1) {
          const lainnyaCategory = categories.splice(lainnyaIndex, 1)[0];
          categories.push(lainnyaCategory);
        }

        const values = categories.map((category) => countsByTipe[category]);

        const colorMap = {
          Apotek: "#1E88E5",
          Klinik: "#43A047",
          "Praktek Mandiri": "#FFC107",
          Posyandu: "#E91E63",
          Puskesmas: "#E53935",
          Lainnya: "#9C27B0",
        };

        const barColors = categories.map((tipe) => colorMap[tipe] || "#888");

        const options = {
          series: [
            {
              name: "Jumlah Fasilitas",
              data: values,
            },
          ],
          chart: {
            type: "bar",
            height: 350,
            fontFamily: "Segoe UI, sans-serif",
          },
          xaxis: {
            categories: categories,
            title: { text: "Tipe Fasilitas" },
          },
          yaxis: {
            title: { text: "Jumlah" },
            allowDecimals: false,
          },
          plotOptions: {
            bar: {
              distributed: true,
              borderRadius: 4,
              columnWidth: "50%",
            },
          },
          tooltip: {
            y: {
              formatter: (val) => `${val} fasilitas`,
            },
          },
          colors: barColors,
          legend: {
            show: false,
          },
        };
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      })
      .catch((error) => console.error("Gagal memuat JSON:", error));
  }
}
