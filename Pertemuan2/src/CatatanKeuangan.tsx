import { useState, useEffect } from 'react';
import Kartu from './Kartu';
import FormTransaksi, { type DataTransaksiBaru } from './FormTransaksi';
import ItemTransaksi, { type Transaksi } from './ItemTransaksi';

function CatatanKeuangan() {
  const [daftarTransaksi, setDaftarTransaksi] = useState<Transaksi[]>(() => {
    const dataTersimpan = localStorage.getItem('catatan-keuangan');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [
      { id: 1, keterangan: 'Alokasi Dana Praktikum', nominal: 500000, jenis: 'pemasukan' },
      { id: 2, keterangan: 'Pembelian Buku Referensi', nominal: 125000, jenis: 'pengeluaran' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('catatan-keuangan', JSON.stringify(daftarTransaksi));
  }, [daftarTransaksi]);

  const handleTambahTransaksi = (dataBaru: DataTransaksiBaru) => {
    const transaksiBaru: Transaksi = { id: Date.now(), ...dataBaru };
    setDaftarTransaksi([transaksiBaru, ...daftarTransaksi]);
  };

  const handleHapusTransaksi = (id: number) => {
    setDaftarTransaksi(daftarTransaksi.filter((t: Transaksi) => t.id !== id));
  };

  const totalPemasukan = daftarTransaksi
    .filter((t: Transaksi) => t.jenis === 'pemasukan')
    .reduce((acc: number, curr: Transaksi) => acc + curr.nominal, 0);

  const totalPengeluaran = daftarTransaksi
    .filter((t: Transaksi) => t.jenis === 'pengeluaran')
    .reduce((acc: number, curr: Transaksi) => acc + curr.nominal, 0);

  const totalSaldo = totalPemasukan - totalPengeluaran;

  return (
    <section className="keuangan-column">
      <div className="section-header">
        <span className="section-kicker">ADMINISTRASI</span>
        <h2>Aplikasi Catatan Keuangan Mini</h2>
        <p>Pencatatan arus kas operasional berbasis penyimpanan lokal (localStorage).</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card stat-saldo">
          <span className="stat-label">Total Saldo Kas</span>
          <h3 className={`stat-value ${totalSaldo >= 0 ? 'teks-netral' : 'teks-pengeluaran'}`}>
            Rp {totalSaldo.toLocaleString('id-ID')}
          </h3>
        </div>
        <div className="stat-card stat-pemasukan">
          <span className="stat-label">Total Pemasukan</span>
          <h3 className="stat-value teks-pemasukan">
            + Rp {totalPemasukan.toLocaleString('id-ID')}
          </h3>
        </div>
        <div className="stat-card stat-pengeluaran">
          <span className="stat-label">Total Pengeluaran</span>
          <h3 className="stat-value teks-pengeluaran">
            - Rp {totalPengeluaran.toLocaleString('id-ID')}
          </h3>
        </div>
      </div>

      <Kartu judul="Tambah Transaksi Baru">
        <FormTransaksi onTambah={handleTambahTransaksi} />
      </Kartu>

      <Kartu judul="Riwayat & Audit Transaksi">
        {daftarTransaksi.length === 0 ? (
          <p className="kosong">Belum ada riwayat transaksi yang tercatat.</p>
        ) : (
          <ul className="daftar">
            {daftarTransaksi.map((transaksi: Transaksi) => (
              <ItemTransaksi
                key={transaksi.id}
                transaksi={transaksi}
                onHapus={handleHapusTransaksi}
              />
            ))}
          </ul>
        )}
      </Kartu>
    </section>
  );
}

export default CatatanKeuangan;