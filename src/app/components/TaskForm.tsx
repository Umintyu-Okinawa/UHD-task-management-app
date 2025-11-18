"use client";

import { FormEvent } from "react";

type Props = {
  title: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
};

export default function TaskForm({ title, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 mb-4">
      <input
        className="flex-1 border rounded px-3 py-2"
        placeholder="タスクを入力..."
        value={title}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-500 text-white font-semibold"
      >
        追加
      </button>
    </form>
  );
}
