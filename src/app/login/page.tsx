"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLoginMode) {
        // ログイン
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }
      } else {
        // 新規登録
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw error;
        }
      }

      router.push("/tasks");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message === "Failed to fetch"
            ? "Supabase への接続に失敗しました。URL/鍵とネットワークを確認してください。"
            : err.message
          : "予期せぬエラーが発生しました。";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isLoginMode ? "ログイン" : "新規登録"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="パスワード"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded py-2 font-semibold"
          >
            {isLoginMode ? "ログイン" : "サインアップ"}
          </button>
        </form>

        <button
          className="mt-4 text-sm text-blue-600 underline block mx-auto"
          onClick={() => setIsLoginMode((prev) => !prev)}
        >
          {isLoginMode ? "新規登録はこちら" : "ログインはこちら"}
        </button>
      </div>
    </div>
  );
}
