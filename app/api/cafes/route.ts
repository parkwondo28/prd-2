import { NextResponse } from "next/server";
import type { Cafe } from "@/lib/types";

// 임시 데이터 (나중에 데이터베이스로 교체)
const mockCafes: Cafe[] = [
  {
    id: "1",
    name: "스타벅스 홍대점",
    address: "서울특별시 마포구 어울마당로 123",
    latitude: 37.5563,
    longitude: 126.9236,
    outletAvailability: "many",
    wifiSpeed: "fast",
    noiseLevel: "moderate",
    description: "작업하기 좋은 카페입니다.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "이디야커피 마포점",
    address: "서울특별시 마포구 월드컵북로 456",
    latitude: 37.5665,
    longitude: 126.978,
    outletAvailability: "some",
    wifiSpeed: "medium",
    noiseLevel: "quiet",
    description: "조용한 분위기의 카페입니다.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "할리스커피 합정점",
    address: "서울특별시 마포구 합정동 789",
    latitude: 37.5497,
    longitude: 126.9135,
    outletAvailability: "few",
    wifiSpeed: "fast",
    noiseLevel: "loud",
    description: "활기찬 분위기의 카페입니다.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // 필터 파라미터 파싱
  const outletFilter = searchParams.get("outletAvailability")?.split(",");
  const wifiFilter = searchParams.get("wifiSpeed")?.split(",");
  const noiseFilter = searchParams.get("noiseLevel")?.split(",");

  let filteredCafes = [...mockCafes];

  // 필터 적용
  if (outletFilter && outletFilter.length > 0) {
    filteredCafes = filteredCafes.filter((cafe) =>
      outletFilter.includes(cafe.outletAvailability),
    );
  }

  if (wifiFilter && wifiFilter.length > 0) {
    filteredCafes = filteredCafes.filter((cafe) =>
      wifiFilter.includes(cafe.wifiSpeed),
    );
  }

  if (noiseFilter && noiseFilter.length > 0) {
    filteredCafes = filteredCafes.filter((cafe) =>
      noiseFilter.includes(cafe.noiseLevel),
    );
  }

  return NextResponse.json(filteredCafes);
}
