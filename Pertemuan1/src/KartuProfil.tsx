interface KartuProfilProps {
  nama: string;
  npm: string;
  kelas: string;
  status: string;
  fotoUrl?: string;
}

function KartuProfil({ nama, npm, kelas, status, fotoUrl }: KartuProfilProps) {
  return (
    <article className="profile-card">
      <div className="profile-card-main">
        <img
          src={fotoUrl || 'https://via.placeholder.com/80'}
          alt={`Foto ${nama}`}
          className="profile-avatar"
        />
        <div>
          <h3 className="profile-name">{nama}</h3>
          <p className="profile-detail">
            NPM <strong>{npm}</strong>
          </p>
          <p className="profile-detail">Kelas {kelas}</p>
        </div>
      </div>
      <div className="profile-status-row">
        <span className={`profile-status ${status === 'Aktif' ? 'is-active' : ''}`}>
          Status Akademik: {status}
        </span>
      </div>
    </article>
  );
}

export default KartuProfil;
