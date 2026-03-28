// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract BaseTaskBoardV2 {
    struct Task {
        string title;
        string note;
        uint8 priority;
        bool completed;
        uint256 updatedAt;
    }

    mapping(address => Task[]) private tasks;

    function addTask(string calldata title, string calldata note, uint8 priority) external {
        tasks[msg.sender].push(
            Task({
                title: title,
                note: note,
                priority: priority,
                completed: false,
                updatedAt: block.timestamp
            })
        );
    }

    function updateTask(uint256 index, string calldata title, string calldata note, uint8 priority) external {
        require(index < tasks[msg.sender].length, "Task missing");

        Task storage task = tasks[msg.sender][index];
        task.title = title;
        task.note = note;
        task.priority = priority;
        task.updatedAt = block.timestamp;
    }

    function toggleTaskStatus(uint256 index) external {
        require(index < tasks[msg.sender].length, "Task missing");

        Task storage task = tasks[msg.sender][index];
        task.completed = !task.completed;
        task.updatedAt = block.timestamp;
    }

    function getTaskCount(address user) external view returns (uint256) {
        return tasks[user].length;
    }

    function getTask(address user, uint256 index)
        external
        view
        returns (string memory title, string memory note, uint8 priority, bool completed, uint256 updatedAt)
    {
        require(index < tasks[user].length, "Task missing");

        Task storage task = tasks[user][index];
        return (task.title, task.note, task.priority, task.completed, task.updatedAt);
    }
}
