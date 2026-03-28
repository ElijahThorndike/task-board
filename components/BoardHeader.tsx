import { WalletButton } from "@/components/WalletButton";

type BoardHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "light" | "blue" | "lime" | "violet";
};

export function BoardHeader({ eyebrow, title, description, tone = "light" }: BoardHeaderProps) {
  const panelClass =
    tone === "blue" ? "panel panel--blue" : tone === "lime" ? "panel panel--lime" : tone === "violet" ? "panel panel--violet" : "panel";

  return (
    <header className={panelClass}>
      <div className="panel-inner stack">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <span className="eyebrow">{eyebrow}</span>
          <WalletButton />
        </div>
        <div className="stack" style={{ gap: 10 }}>
          <h1 className="display-title">{title}</h1>
          <p className="section-copy" style={tone === "light" ? undefined : { color: "rgba(255,255,255,0.88)" }}>
            {description}
          </p>
        </div>
      </div>
    </header>
  );
}
