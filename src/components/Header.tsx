interface HeaderProps {
  title: string;
  lead: string;
}

export function Header({ title, lead }: HeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header__grid" aria-hidden="true" />
      <div className="site-container page-header__inner">
        <p className="eyebrow">Worldshaper-Nanjing · iGEM 2026</p>
        <div className="page-header__content">
          <h1>{title}</h1>
          <p>{lead}</p>
        </div>
      </div>
    </header>
  );
}
