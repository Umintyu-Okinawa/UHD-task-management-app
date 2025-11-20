"use client";

import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  user_id: string;
  title: string;
};

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  // タスク取得
  useEffect(() => {
    const fetchTasks = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: true });

      setTasks(data || []);
    };

    fetchTasks();
  }, [router]);

  // タスク追加
  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("tasks")
      .insert([{ title, user_id: user?.id }])
      .select();

    if (data) setTasks([...tasks, ...data]);
    setTitle("");
  };

  // タスク削除
  const handleDelete = async (id: number) => {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-xl mx-auto bg-white shadow-sm rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">タスク一覧</h1>

        <form onSubmit={handleAdd} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="タスクを入力..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            追加
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-xl shadow-sm"
            >
              <span className="font-medium">{task.title}</span>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                削除
              </button>
            </li>
          ))}

          {tasks.length === 0 && (
            <p className="text-center text-gray-500">
              まだタスクがありません。
            </p>
          )}
        </ul>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/profile")}
            className="text-blue-600 hover:underline"
          >
            プロフィールへ
          </button>
        </div>
      </div>
    </div>
  );
}
