export interface Transaksi {
  id: number;
  keterangan: string;
  nominal: number;
  jenis: 'pemasukan' | 'pengeluaran';
}

interface ItemTransaksiProps {
  transaksi: Transaksi;
  onHapus: (id: number) => void;
}

function ItemTransaksi({ transaksi, onHapus }: ItemTransaksiProps) {
  const isPemasukan = transaksi.jenis === 'pemasukan';

  return (
    <li className="item-transaksi">
      <div className="info-transaksi">
        <strong className="judul-transaksi">{transaksi.keterangan}</strong>
        <span className={`badge-jenis ${isPemasukan ? 'badge-masuk' : 'badge-keluar'}`}>
          {transaksi.jenis}
        </span>
      </div>

      <div className="aksi-transaksi">
        <span className={`nominal-transaksi ${isPemasukan ? 'teks-pemasukan' : 'teks-pengeluaran'}`}>
          {isPemasukan ? '+' : '-'} Rp {transaksi.nominal.toLocaleString('id-ID')}
        </span>

        <button
          className="tombol tombol-bahaya tombol-kecil"
          onClick={() => onHapus(transaksi.id)}
        >
          Hapus
        </button>
      </div>
    </li>
  );
}

export default ItemTransaksi;