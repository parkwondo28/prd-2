"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import CafeDetail from "@/components/cafe/CafeDetail";
import type { Cafe } from "@/lib/types";

async function fetchCafe(id: string): Promise<Cafe> {
  const response = await fetch(`/api/cafes/${id}`);
  if (!response.ok) {
    throw new Error("카페 정보를 불러오는데 실패했습니다.");
  }
  return response.json();
}

export default function CafePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const {
    data: cafe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cafe", id],
    queryFn: () => fetchCafe(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error || !cafe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600">
            카페 정보를 불러올 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <a href="/" className="text-blue-500 hover:underline">
            ← 홈으로 돌아가기
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <CafeDetail cafe={cafe} />
      </main>
    </div>
  );
}
