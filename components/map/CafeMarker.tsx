"use client";

import type { Cafe } from "@/lib/types";

interface CafeMarkerProps {
  cafe: Cafe;
}

export default function CafeMarker({ cafe }: CafeMarkerProps) {
  // 마커는 MapContainer에서 직접 생성되므로 이 컴포넌트는 참고용입니다
  return null;
}
