
interface BadgeSkillProps {
  namaSkill: string;
  level: 'Mahir' | 'Menengah' | 'Pemula';
}

function BadgeSkill({ namaSkill, level }: BadgeSkillProps) {
  return (
    <span className={`skill-badge skill-${level.toLowerCase()}`}>
      {namaSkill} ({level})
    </span>
  );
}

export default BadgeSkill;