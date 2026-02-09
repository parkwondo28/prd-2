"use client";

import Link from "next/link";
import type { Cafe } from "@/lib/types";

interface CafeDetailProps {
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

export default function CafeDetail({ cafe }: CafeDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">{cafe.name}</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-1">주소</h2>
          <p className="text-base">{cafe.address}</p>
        </div>

        {cafe.description && (
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">설명</h2>
            <p className="text-base">{cafe.description}</p>
          </div>
        )}

        {cafe.phoneNumber && (
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">
              전화번호
            </h2>
            <p className="text-base">{cafe.phoneNumber}</p>
          </div>
        )}

        {cafe.operatingHours && (
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">
              운영시간
            </h2>
            <p className="text-base">{cafe.operatingHours}</p>
          </div>
        )}

        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-2">
            작업 환경
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
              {outletLabels[cafe.outletAvailability]}
            </span>
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded">
              {wifiLabels[cafe.wifiSpeed]}
            </span>
            <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded">
              {noiseLabels[cafe.noiseLevel]}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Link
            href={`https://map.naver.com/v5/search/${encodeURIComponent(cafe.address)}`}
            target="_blank"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            길찾기
          </Link>
          <Link
            href={`/review/${cafe.id}`}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            리뷰 작성
          </Link>
          <Link
            href="/etiquette"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            이용 에티켓
          </Link>
        </div>
      </div>
    </div>
  );
}
