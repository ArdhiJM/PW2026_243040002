import { useState, type FormEvent } from 'react';

export interface DataTransaksiBaru {
  keterangan: string;
  nominal: number;
  jenis: 'pemasukan' | 'pengeluaran';
}

interface FormTransaksiProps {
  onTambah: (data: DataTransaksiBaru) => void;
}

function FormTransaksi({ onTambah }: FormTransaksiProps) {
  const [keterangan, setKeterangan] = useState<string>('');
  const [nominal, setNominal] = useState<string>('');
  const [jenis, setJenis] = useState<'pemasukan' | 'pengeluaran'>('pemasukan');

  const tidakValid = keterangan.trim() === '' || nominal === '' || Number(nominal) <= 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (tidakValid) return;

    onTambah({
      keterangan: keterangan.trim(),
      nominal: Number(nominal),
      jenis: jenis
    });

    setKeterangan('');
    setNominal('');
    setJenis('pemasukan');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="label-input">Keterangan Transaksi</label>
        <input
          className="input"
          type="text"
          placeholder="Contoh: Pembelian Modul, Honor Asisten"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        />
      </div>

      <div className="baris-ganda">
        <div className="form-group flex-1">
          <label className="label-input">Nominal (Rp)</label>
          <input
            className="input"
            type="number"
            placeholder="0"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
          />
        </div>

        <div className="form-group flex-1">
          <label className="label-input">Jenis Transaksi</label>
          <select
            className="input select-input"
            value={jenis}
            onChange={(e) => setJenis(e.target.value as 'pemasukan' | 'pengeluaran')}
          >
            <option value="pemasukan">Pemasukan (+)</option>
            <option value="pengeluaran">Pengeluaran (-)</option>
          </select>
        </div>
      </div>

      <button className="tombol tombol-utama lebar-penuh" type="submit" disabled={tidakValid}>
        + Catat Transaksi
      </button>
    </form>
  );
}

export default FormTransaksi;