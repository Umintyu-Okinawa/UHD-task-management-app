"use client";

import type { Task } from "@/types/task";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">まだタスクがありません。</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="bg-white border rounded px-3 py-2 flex justify-between items-center"
        >
          <span>{task.title}</span>
          <button
            className="text-sm text-red-500"
            onClick={() => onDelete(task.id)}
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}
