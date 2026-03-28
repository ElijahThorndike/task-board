import { parseAbi } from "viem";
import { CONTRACT_ADDRESS } from "@/lib/constants";

export const taskBoardAbi = parseAbi([
  "function addTask(string calldata t) external",
  "function getTasks(address user) external view returns (string[] memory)",
]);

export { CONTRACT_ADDRESS };
