import '../../styles/credit-view.css';

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
                <img src="icons/Logo_Pandri.png" alt="Logo Pandri Berseri" />
            </a>

        </div>

        <div class="credit-text max-w-2xl mx-auto">
            <p>Proyek WebGIS ini dikembangkan sebagai bagian dari program <strong>Kuliah Kerja Nyata (KKN) PPM-UGM 2025 Periode II</strong> yang
                dilaksanakan di Kalurahan Tridadi, Kabupaten Sleman, Daerah Istimewa Yogyakarta.</p>
            <p>Data peta bersumber dari <a href="https://www.openstreetmap.org/#map=17/-7.723548/110.358798"
                    target="_blank">OpenStreetMap</a> dan pengembangan menggunakan <strong>Webpack</strong> 
                    untuk modularisasi dan optimasi kode.
            </p>
            <p>
                WebGIS ini bertujuan memudahkan masyarakat dalam mengakses informasi mengenai lokasi fasilitas kesehatan
                terdekat seperti rumah sakit, puskesmas, dan lainnya yang belum terjangkau internet/diketahui oleh umum.
            </p>
        </div>
    </div>
    `;
    }    
  }