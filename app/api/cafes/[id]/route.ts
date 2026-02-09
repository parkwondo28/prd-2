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
    phoneNumber: "02-1234-5678",
    operatingHours: "평일 07:00 - 22:00",
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
    phoneNumber: "02-2345-6789",
    operatingHours: "평일 08:00 - 21:00",
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
    phoneNumber: "02-3456-7890",
    operatingHours: "평일 09:00 - 23:00",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const cafe = mockCafes.find((c) => c.id === params.id);

  if (!cafe) {
    return NextResponse.json(
      { error: "카페를 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json(cafe);
}
