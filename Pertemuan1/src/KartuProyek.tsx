interface KartuProyekProps {
  judul: string;
  deskripsi: string;
  teknologi: string[];
  linkGithub: string;
}

function KartuProyek({
  judul,
  deskripsi,
  teknologi,
  linkGithub,
}: KartuProyekProps) {
  return (
    <article className="project-card">
      <h3 className="project-title">{judul}</h3>
      <p className="project-description">{deskripsi}</p>
      <div className="technology-list">
        {teknologi.map((namaTeknologi) => (
          <span key={namaTeknologi} className="technology-tag">
            {namaTeknologi}
          </span>
        ))}
      </div>
      <a
        href={linkGithub}
        target="_blank"
        rel="noreferrer"
        className="project-link"
      >
        Lihat di GitHub
      </a>
    </article>
  );
}

export default KartuProyek;
