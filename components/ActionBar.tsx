import Link from "next/link";

type ActionBarProps = {
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryTone?: "primary" | "lime" | "red";
};

export function ActionBar({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  primaryTone = "primary",
}: ActionBarProps) {
  const primaryClass = primaryTone === "lime" ? "btn btn--lime" : primaryTone === "red" ? "btn btn--red" : "btn btn--primary";

  return (
    <div className="panel">
      <div className="panel-inner action-row">
        {primaryHref ? (
          <Link href={primaryHref} className={primaryClass}>
            {primaryLabel}
          </Link>
        ) : (
          primaryLabel && (
            <button className={primaryClass} type="button" onClick={onPrimaryClick}>
              {primaryLabel}
            </button>
          )
        )}
        {secondaryHref ? (
          <Link href={secondaryHref} className="btn">
            {secondaryLabel}
          </Link>
        ) : (
          secondaryLabel && (
            <button className="btn" type="button" onClick={onSecondaryClick}>
              {secondaryLabel}
            </button>
          )
        )}
      </div>
    </div>
  );
}
