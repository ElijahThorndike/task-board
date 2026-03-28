type ProgressStatCardProps = {
  label: string;
  value: string;
  tone?: "blue" | "lime" | "red" | "violet";
};

export function ProgressStatCard({ label, value, tone = "blue" }: ProgressStatCardProps) {
  const background = tone === "blue" ? "#2453FF" : tone === "lime" ? "#C7FF3C" : tone === "red" ? "#FF5A36" : "#7B61FF";
  const color = tone === "lime" ? "#111111" : "#FFFFFF";

  return (
    <article className="panel" style={{ background, color, boxShadow: "6px 6px 0 #111111" }}>
      <div className="panel-inner stack" style={{ gap: 8 }}>
        <span className="eyebrow" style={{ background: "white", color: "#111111" }}>
          {label}
        </span>
        <strong className="display-title" style={{ fontSize: "2.4rem", color }}>
          {value}
        </strong>
      </div>
    </article>
  );
}
