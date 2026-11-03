import type { ReactNode } from 'react';

type KartuProps = {
  judul: string;
  children: ReactNode;
  className?: string;
};

function Kartu({ judul, children, className }: KartuProps) {
  return (
    <section className={`kartu${className ? ` ${className}` : ''}`}>
      <h2>{judul}</h2>
      {children}
    </section>
  );
}

export default Kartu;