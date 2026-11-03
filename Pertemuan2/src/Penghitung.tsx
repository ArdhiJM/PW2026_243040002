import { useState } from 'react';
import Kartu from './Kartu';

function Penghitung() {
  const [jumlah, setJumlah] = useState(0);

  const tambah = () => {
    setJumlah(jumlah + 1);
  };

  const ulangi = () => {
    setJumlah(0);
  };

  return (
    <Kartu judul="Pemanasan Klik" className="kartu-penghitung">
      <p className="penghitung-teks">
        Tombol sudah diklik <strong>{jumlah}</strong> kali
      </p>
      {jumlah >= 5 && (
        <p className="pesan-semangat">Wah, kamu rajin sekali mengklik!</p>
      )}
      <div className="baris baris-penghitung">
        <button className="tombol" onClick={tambah}>
          Klik Saya
        </button>
        <button className="tombol tombol-merah" onClick={ulangi}>
          Ulangi
        </button>
      </div>
    </Kartu>
  );
}

export default Penghitung;
