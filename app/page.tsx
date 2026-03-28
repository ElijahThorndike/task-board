import Link from "next/link";
import { BoardHeader } from "@/components/BoardHeader";
import { HomeBoard } from "@/components/home/HomeBoard";

export default function HomePage() {
  return (
    <div className="page">
      <BoardHeader eyebrow="Task Board" title="Own The Day" description="A sharp mobile board for creating, tracking, and flipping tasks on Base." tone="blue" />
      <HomeBoard />
      <section className="split">
        <div className="panel panel--lime">
          <div className="panel-inner stack">
            <h2 className="section-title">Quick Entry</h2>
            <p className="section-copy" style={{ color: "#111111" }}>
              Jump straight into your board or pin a fresh task in one tap.
            </p>
            <div className="action-row">
              <Link href="/tasks" className="btn btn--primary">
                Open my board
              </Link>
              <Link href="/tasks/new" className="btn">
                Create task
              </Link>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-inner stack">
            <h2 className="section-title">Base Ready</h2>
            <p className="section-copy">Connect a wallet to read onchain tasks, create new ones, and keep local overlays for richer edits.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
