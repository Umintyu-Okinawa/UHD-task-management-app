"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setEmail(session.user.email ?? "");
    };

    load();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
      <p className="mb-4">ログイン中のメールアドレス：{email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        ログアウト
      </button>
    </div>
  );
}
