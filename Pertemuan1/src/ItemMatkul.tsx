interface ItemMatkulProps {
  kode: string;
  nama: string;
  sks: number;
  hari: string;
}

function ItemMatkul({ kode, nama, sks, hari }: ItemMatkulProps) {
  return (
    <article className="course-card">
      <div className="course-card-info">
        <p className="course-name">
          <span className="course-code">{kode}</span>
          {nama}
        </p>
        <div className="course-day">
          Jadwal Sesi: {hari}
        </div>
      </div>
      <span className="course-credits">{sks} SKS</span>
    </article>
  );
}

export default ItemMatkul;