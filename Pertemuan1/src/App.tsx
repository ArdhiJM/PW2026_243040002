import KartuProfil from './KartuProfil';
import BadgeSkill from './BadgeSkill';
import ItemMatkul from './ItemMatkul';
import KartuProyek from './KartuProyek';
import './App.css';

function App() {
  // Data daftar keahlian
  const daftarSkill: {
    id: number;
    namaSkill: string;
    level: 'Mahir' | 'Menengah' | 'Pemula';
  }[] = [
    { id: 1, namaSkill: 'HTML & CSS', level: 'Mahir' },
    { id: 2, namaSkill: 'JavaScript (ES6+)', level: 'Menengah' },
    { id: 3, namaSkill: 'React JS', level: 'Pemula' },
    { id: 4, namaSkill: 'Git & GitHub', level: 'Menengah' }
  ];

  // Data daftar mata kuliah
  const daftarPraktikum = [
    { id: 101, kode: 'IF211', nama: 'Pemrograman Web (React & Laravel)', sks: 3, hari: 'Senin' },
    { id: 102, kode: 'IF212', nama: 'Sistem Basis Data (PostgreSQL)', sks: 3, hari: 'Rabu' },
    { id: 103, kode: 'IF213', nama: 'Rekayasa Perangkat Lunak Terapan', sks: 3, hari: 'Kamis' },
    { id: 104, kode: 'IF214', nama: 'Arsitektur Sistem Terdistribusi', sks: 2, hari: 'Jumat' }
  ];

  // Data 4 proyek portofolio
  const daftarProyek = [
    {
      id: 1,
      judul: 'Sistem Informasi Perpustakaan',
      deskripsi: 'Aplikasi manajemen peminjaman buku berbasis web dengan fitur katalog digital dan pencarian cepat.',
      teknologi: ['React', 'Node.js', 'TailwindCSS'],
      linkGithub: 'https://github.com/user/perpustakaan-app'
    },
    {
      id: 2,
      judul: 'Aplikasi Monitoring Cuaca',
      deskripsi: 'Dasbor pemantau cuaca real-time yang mengintegrasikan OpenWeather API dan grafik suhu harian.',
      teknologi: ['JavaScript', 'API', 'CSS3'],
      linkGithub: 'https://github.com/user/weather-dashboard'
    },
    {
      id: 3,
      judul: 'E-Commerce Mini Shop',
      deskripsi: 'Antarmuka toko online sederhana lengkap dengan fitur keranjang belanja dan kalkulasi total harga.',
      teknologi: ['React', 'Context API', 'Bootstrap'],
      linkGithub: 'https://github.com/user/mini-ecommerce'
    },
    {
      id: 4,
      judul: 'Task Management Board',
      deskripsi: 'Papan manajemen tugas Kanban interaktif untuk mencatat status pengerjaan proyek harian.',
      teknologi: ['React', 'Vite', 'LocalStorage'],
      linkGithub: 'https://github.com/user/kanban-task-app'
    }
  ];

  return (
    <main className="portfolio-shell">
      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">Portfolio · Informatika</p>
          <h1>Belajar, membangun, dan terus berkembang.</h1>
          <p className="hero-description">
            Laboratorium Informatika · Modul 1: Pengenalan React JS &amp; Vite
          </p>
        </div>
      </header>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Perkenalan</p>
            <h2>Profil praktikan</h2>
          </div>
          <span className="section-count">01 / PROFIL</span>
        </div>
        <div className="profile-layout">
          <KartuProfil
            nama="Ardhi Jamil Muchtar"
            npm="243040002"
            kelas="IF Praktikum"
            status="Aktif"
            fotoUrl="https://via.placeholder.com/80"
          />
          <div className="skill-panel">
            <h3>Keahlian yang sedang dikembangkan</h3>
            <div className="skill-list">
              {daftarSkill.map((skill) => (
                <BadgeSkill
                  key={skill.id}
                  namaSkill={skill.namaSkill}
                  level={skill.level}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Perkuliahan</p>
            <h2>Rencana praktikum</h2>
          </div>
          <span className="section-count">02 / AKADEMIK</span>
        </div>
        <div className="course-list">
          {daftarPraktikum.map((matkul) => (
            <ItemMatkul key={matkul.id} {...matkul} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Karya pilihan</p>
            <h2>Proyek mini</h2>
          </div>
          <span className="section-count">03 / PORTOFOLIO</span>
        </div>
        <div className="project-grid">
          {daftarProyek.map((proyek) => (
            <KartuProyek key={proyek.id} {...proyek} />
          ))}
        </div>
      </section>
      <footer className="page-footer">
        Dibuat dengan rasa ingin tahu dan React.
      </footer>
    </main>
  );
}

export default App;