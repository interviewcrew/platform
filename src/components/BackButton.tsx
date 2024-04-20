"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      className="text-cyan-100 rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
    >
      <ArrowLeft className="text-gray-600 h-6 w-6" />
    </button>
  );
}
