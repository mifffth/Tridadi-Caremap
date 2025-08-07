import "../../styles/credit-view.css";

export class CreditView {
  constructor(container) {
    this.container = container;
    this.presenter = null;
  }

  setPresenter(presenter) {
    this.presenter = presenter;
  }

  render() {
    this.container.innerHTML = `
 <div class="credit-container">

      <div class="logo-section">

          <a href="https://ugm.ac.id/" target="_blank">
              <img src="icons/Logo_UGM.png" alt="Logo UGM" />
          </a>
          <a href="https://kkn.ugm.ac.id/" target="_blank">
              <img src="icons/Logo_KKN_UGM.png" alt="Logo KKN UGM" />
          </a>
          <a href="https://www.instagram.com/pandriberseri" target="_blank">
              <img src="icons/Logo_Pandri.webp" alt="Logo Pandri Berseri" />
          </a>

      </div>

      <div class="credit-text max-w-2xl mx-auto">
          <p>Proyek WebGIS ini dikembangkan sebagai bagian dari program <strong>Kuliah Kerja Nyata (KKN) PPM-UGM 2025
                  Periode II</strong> yang dilaksanakan di Kalurahan Tridadi, Kabupaten Sleman, Daerah Istimewa
              Yogyakarta. Pengembangan dan implementasi WebGIS ini merupakan hasil kontribusi utama dari <strong>Miftah
                  Desma S.</strong></p>

              <p>Peta interaktif dibangun menggunakan 
              <a href="https://leafletjs.com/" target="_blank">Leaflet.js</a> 
              sebagai pustaka pemetaan berbasis web
              dan 
              <a href="https://webpack.js.org/" target="_blank">Webpack</a> 
              untuk modularisasi dan optimasi kode. Basemap yang digunakan
              mencakup 
              <a href="https://www.openstreetmap.org/#map=17/-7.723548/110.358798" target="_blank">OpenStreetMap</a>, 
              <a href="https://opentopomap.org/" target="_blank">OpenTopoMap</a>, dan 
              <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9" target="_blank">Esri World Imagery</a>. Data spasial administratif
              diperoleh dari 
              <a href="https://geoportal.slemankab.go.id/#/" target="_blank">Geoportal Sleman</a>,
              survey KKN, dan
              arsip Pemerintah Kalurahan Tridadi.</p>

          <p>WebGIS ini bertujuan untuk mempermudah masyarakat, pemerintah desa, dan pemangku kepentingan lainnya dalam
              mengakses informasi lokasi fasilitas kesehatan secara lebih komprehensif, interaktif, dan berbasis data
              spasial yang aktual.</p>

      </div>
  </div>
    `;
  }
}
