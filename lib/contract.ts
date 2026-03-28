import { parseAbi } from "viem";
import { CONTRACT_ADDRESS, CONTRACT_MODE } from "@/lib/constants";

export const legacyTaskBoardAbi = parseAbi([
  "function addTask(string calldata t) external",
  "function getTasks(address user) external view returns (string[] memory)",
]);

export const upgradedTaskBoardAbi = parseAbi([
  "function addTask(string calldata title, string calldata note, uint8 priority) external",
  "function updateTask(uint256 index, string calldata title, string calldata note, uint8 priority) external",
  "function toggleTaskStatus(uint256 index) external",
  "function getTaskCount(address user) external view returns (uint256)",
  "function getTask(address user, uint256 index) external view returns (string memory title, string memory note, uint8 priority, bool completed, uint256 updatedAt)",
]);

export const taskBoardAbi = CONTRACT_MODE === "upgraded" ? upgradedTaskBoardAbi : legacyTaskBoardAbi;
export const supportsOnchainTaskMutations = CONTRACT_MODE === "upgraded";

export { CONTRACT_ADDRESS };
