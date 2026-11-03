import { useState } from 'react';
import './App.css';
import Kartu from './Kartu';
import Penghitung from './Penghitung';
import FormTugas from './FormTugas';
import ItemTugas, { type Tugas } from './ItemTugas';

function App() {
  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>([
    { id: 1, judul: 'Install Node.js dan Vite', selesai: true },
    { id: 2, judul: 'Pelajari useState', selesai: false },
  ]);

  const tambahTugas = (judul: string) => {
    const tugasBaru: Tugas = {
      id: Date.now(),
      judul,
      selesai: false,
    };

    setDaftarTugas((tugasSebelumnya) => [...tugasSebelumnya, tugasBaru]);
  };

  const ubahStatus = (id: number) => {
    setDaftarTugas((tugasSebelumnya) =>
      tugasSebelumnya.map((tugas) =>
        tugas.id === id ? { ...tugas, selesai: !tugas.selesai } : tugas,
      ),
    );
  };

  const hapusTugas = (id: number) => {
    setDaftarTugas((tugasSebelumnya) =>
      tugasSebelumnya.filter((tugas) => tugas.id !== id),
    );
  };

  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;
  const persentaseSelesai =
    daftarTugas.length === 0
      ? 0
      : Math.round((jumlahSelesai / daftarTugas.length) * 100);

  return (
    <main className="wadah">
      <header className="hero">
        <p className="hero-label">
          <span className="hero-label-dot" />
          RUANG BELAJAR <span className="hero-label-divider">/</span> MODUL 02
        </p>
        <h1 className="judul">Satu langkah kecil, progres besar.</h1>
        <p className="subjudul">
          Atur tugas praktikum dan rayakan setiap kemajuanmu.
        </p>
      </header>

      <Penghitung />

      <Kartu judul="Tambah Tugas Baru">
        <FormTugas onTambah={tambahTugas} />
      </Kartu>

      <Kartu judul="Daftar Tugas" className="kartu-daftar">
        <div className="ringkasan">
          <div className="ringkasan-teks">
            <span>Progres praktikum</span>
            <strong>
              {jumlahSelesai}
              <span className="ringkasan-total"> / {daftarTugas.length}</span>
            </strong>
          </div>
          <div
            className="progress-trek"
            role="progressbar"
            aria-label="Progres tugas selesai"
            aria-valuenow={persentaseSelesai}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span
              className="progress-isi"
              style={{ width: `${persentaseSelesai}%` }}
            />
          </div>
          <p className="progress-label">{persentaseSelesai}% selesai</p>
        </div>

        {daftarTugas.length === 0 ? (
          <p className="kosong">
            Belum ada tugas. Yuk tambahkan tugas pertamamu!
          </p>
        ) : (
          <ul className="daftar">
            {daftarTugas.map((tugas) => (
              <ItemTugas
                key={tugas.id}
                tugas={tugas}
                onUbahStatus={ubahStatus}
                onHapus={hapusTugas}
              />
            ))}
          </ul>
        )}
      </Kartu>
      <footer className="footer">
        Dibuat untuk belajar, satu tugas dalam satu waktu.
      </footer>
    </main>
  );
}

export default App;