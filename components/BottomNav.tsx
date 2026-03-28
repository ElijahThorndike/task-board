"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Board" },
  { href: "/tasks", label: "Tasks" },
  { href: "/tasks/new", label: "New" },
  { href: "/stats", label: "Stats" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" style={{ position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 50 }}>
      <div className="panel" style={{ maxWidth: 520, margin: "0 auto", background: "#111111", color: "white", boxShadow: "6px 6px 0 #2453FF" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8, padding: 10 }}>
          {items.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className="btn" style={{ minHeight: 44, padding: "0 10px", background: active ? "#C7FF3C" : "white" }}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
