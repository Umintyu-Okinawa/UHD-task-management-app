"use client";

import { useEffect, useState, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Task } from "@/types/task";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  // タスク一覧取得
  const fetchTasks = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", session.user.id)
      .order("inserted_at", { ascending: false });

    if (error) {
      console.error("タスク取得エラー:", error.message);
      return;
    }

    if (data) {
      setTasks(data as Task[]);
    }
  }, [router]);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // タスク追加
  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("tasks").insert({
      title,
      user_id: session.user.id,
    });

    if (error) {
      console.error("タスク追加エラー:", error.message);
      return;
    }

    setTitle("");
    fetchTasks();
  };

  // タスク削除
  const handleDeleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("タスク削除エラー:", error.message);
      return;
    }

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const goProfile = () => router.push("/profile");

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">タスク一覧</h1>
        <button onClick={goProfile} className="text-sm text-blue-600 underline">
          プロフィール
        </button>
      </header>

      <TaskForm title={title} onChange={setTitle} onSubmit={handleAddTask} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
}
