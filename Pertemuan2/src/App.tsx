import { useState, useEffect } from 'react';
import './App.css';
import Kartu from './Kartu';
import Penghitung from './Penghitung';
import FormTugas from './FormTugas';
import ItemTugas, { type Tugas } from './ItemTugas';
import CatatanKeuangan from './CatatanKeuangan';

function App() {
  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>(() => {
    const dataTersimpan = localStorage.getItem('daftar-tugas');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [
      { id: 1, judul: 'Setup Lingkungan Pengembangan Vite & TypeScript', selesai: true },
      { id: 2, judul: 'Pelajari Hook useState & Controlled Form', selesai: false }
    ];
  });

  const [filter, setFilter] = useState<'semua' | 'belum' | 'selesai'>('semua');

  useEffect(() => {
    localStorage.setItem('daftar-tugas', JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  useEffect(() => {
    const sisa = daftarTugas.filter((t) => !t.selesai).length;
    document.title = `(${sisa}) PErtemuan 2 - Praktikum Web`;
  }, [daftarTugas]);

  const tambahTugas = (judul: string) => {
    const tugasBaru: Tugas = { id: Date.now(), judul: judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  const ubahStatus = (id: number) => {
    const daftarBaru = daftarTugas.map((tugas: Tugas) => {
      if (tugas.id === id) {
        return { ...tugas, selesai: !tugas.selesai };
      }
      return tugas;
    });
    setDaftarTugas(daftarBaru);
  };

  const hapusTugas = (id: number) => {
    setDaftarTugas(daftarTugas.filter((tugas: Tugas) => tugas.id !== id));
  };

  const hapusSemuaSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas: Tugas) => !tugas.selesai));
  };

  const jumlahSelesai = daftarTugas.filter((tugas: Tugas) => tugas.selesai).length;

  const daftarTugasTersaring = daftarTugas.filter((tugas: Tugas) => {
    if (filter === 'belum') return !tugas.selesai;
    if (filter === 'selesai') return tugas.selesai;
    return true;
  });

  return (
    <div className="wadah">
      <header className="app-header">
        <span className="badge-sistem">PRAKTIKUM WEB · MODUL 02</span>
        <h1 className="judul">Praktikum Pemrograman Web</h1>
        <p className="subjudul">
          Ruang kerja praktikum untuk mengelola agenda, memahami state, dan mencatat arus kas dalam satu dashboard.
        </p>
      </header>

      <main className="dashboard-layout">
        <div className="agenda-column">
          {/* Latihan 1: State Interaktif */}
          <Penghitung />

          {/* Latihan 2 & Tugas 1-2: Aplikasi Pengelola Agenda Tugas */}
          <Kartu judul="Tambah Agenda Tugas Baru">
            <FormTugas onTambah={tambahTugas} />
          </Kartu>

          <Kartu judul="Daftar Agenda Sesi Praktikum">
            <div className="ringkasan-box">
              <div className="ringkasan-teks">
                <span>Progres penyelesaian</span>
                <strong>{jumlahSelesai} <span className="ringkasan-total">/ {daftarTugas.length}</span></strong>
              </div>
              <div
                className="progress-trek"
                role="progressbar"
                aria-label="Progres penyelesaian tugas"
                aria-valuenow={daftarTugas.length === 0 ? 0 : Math.round((jumlahSelesai / daftarTugas.length) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span
                  className="progress-isi"
                  style={{ width: `${daftarTugas.length === 0 ? 0 : (jumlahSelesai / daftarTugas.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Tombol Filter */}
            <div className="grup-filter" aria-label="Filter agenda">
              <button
                className={`tombol-filter ${filter === 'semua' ? 'aktif' : ''}`}
                onClick={() => setFilter('semua')}
              >
                Semua ({daftarTugas.length})
              </button>
              <button
                className={`tombol-filter ${filter === 'belum' ? 'aktif' : ''}`}
                onClick={() => setFilter('belum')}
              >
                Belum Selesai ({daftarTugas.length - jumlahSelesai})
              </button>
              <button
                className={`tombol-filter ${filter === 'selesai' ? 'aktif' : ''}`}
                onClick={() => setFilter('selesai')}
              >
                Selesai ({jumlahSelesai})
              </button>
            </div>

            {daftarTugasTersaring.length === 0 ? (
              <p className="kosong">Tidak ada agenda tugas yang sesuai dengan filter saat ini.</p>
            ) : (
              <ul className="daftar">
                {daftarTugasTersaring.map((tugas: Tugas) => (
                  <ItemTugas
                    key={tugas.id}
                    tugas={tugas}
                    onUbahStatus={ubahStatus}
                    onHapus={hapusTugas}
                  />
                ))}
              </ul>
            )}

            {jumlahSelesai > 0 && (
              <div className="area-aksi-bawah">
                <button
                  className="tombol tombol-bahaya tombol-kecil"
                  onClick={hapusSemuaSelesai}
                >
                  Hapus Semua yang Selesai ({jumlahSelesai})
                </button>
              </div>
            )}
          </Kartu>
        </div>

        {/* Tugas 3: Aplikasi Catatan Keuangan Mini */}
        <CatatanKeuangan />
      </main>
    </div>
  );
}

export default App;