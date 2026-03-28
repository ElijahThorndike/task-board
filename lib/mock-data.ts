import type { TaskItem } from "@/lib/types";
import { DEMO_ADDRESS } from "@/lib/constants";

const now = "2026-03-28T08:00:00.000Z";

export const demoTasks: TaskItem[] = [
  {
    id: "demo-1",
    title: "Lock sprint scope",
    note: "Freeze the mobile board tasks before noon and leave one review slot.",
    status: "pending",
    priority: "critical",
    source: "demo",
    owner: DEMO_ADDRESS,
    createdAt: now,
    updatedAt: now,
    tag: "Planning",
  },
  {
    id: "demo-2",
    title: "Clean task labels",
    note: "Merge duplicate tags and keep only one action verb per title.",
    status: "completed",
    priority: "steady",
    source: "demo",
    owner: DEMO_ADDRESS,
    createdAt: now,
    updatedAt: now,
    tag: "Board",
  },
  {
    id: "demo-3",
    title: "Ship wallet sync",
    note: "Wire the create flow to Base and keep local overlays for edits.",
    status: "pending",
    priority: "focus",
    source: "demo",
    owner: DEMO_ADDRESS,
    createdAt: now,
    updatedAt: now,
    tag: "Onchain",
  },
];
