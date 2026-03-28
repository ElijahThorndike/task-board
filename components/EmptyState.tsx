import Link from "next/link";

type EmptyStateProps = {
  title: string;
  copy: string;
  actionHref: string;
  actionLabel: string;
};

export function EmptyState({ title, copy, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <section className="panel panel--blue">
      <div className="panel-inner stack">
        <h2 className="section-title">{title}</h2>
        <p className="section-copy" style={{ color: "rgba(255,255,255,0.85)" }}>
          {copy}
        </p>
        <div>
          <Link href={actionHref} className="btn btn--lime">
            {actionLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
