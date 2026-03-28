import { BoardHeader } from "@/components/BoardHeader";
import { StatsScreen } from "@/components/stats/StatsScreen";

export default function StatsPage() {
  return (
    <div className="page">
      <BoardHeader eyebrow="Stats" title="Signal Board" description="Short numeric views for progress, volume, and sync state." tone="violet" />
      <StatsScreen />
    </div>
  );
}
