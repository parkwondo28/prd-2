"use client";

import Link from "next/link";
import type { Cafe } from "@/lib/types";

interface CafeCardProps {
  cafe: Cafe;
}

const outletLabels: Record<Cafe["outletAvailability"], string> = {
  many: "콘센트 많음",
  some: "콘센트 보통",
  few: "콘센트 적음",
  none: "콘센트 없음",
};

const wifiLabels: Record<Cafe["wifiSpeed"], string> = {
  fast: "와이파이 빠름",
  medium: "와이파이 보통",
  slow: "와이파이 느림",
  none: "와이파이 없음",
};

const noiseLabels: Record<Cafe["noiseLevel"], string> = {
  quiet: "조용함",
  moderate: "보통",
  loud: "시끄러움",
};

export default function CafeCard({ cafe }: CafeCardProps) {
  return (
    <Link href={`/cafe/${cafe.id}`}>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-lg font-bold mb-2">{cafe.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{cafe.address}</p>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {outletLabels[cafe.outletAvailability]}
          </span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            {wifiLabels[cafe.wifiSpeed]}
          </span>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
            {noiseLabels[cafe.noiseLevel]}
          </span>
        </div>
      </div>
    </Link>
  );
}
