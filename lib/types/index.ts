// 카페 작업 환경 필터 타입
export type OutletAvailability = "many" | "some" | "few" | "none";
export type WifiSpeed = "fast" | "medium" | "slow" | "none";
export type NoiseLevel = "quiet" | "moderate" | "loud";

// 카페 정보 타입
export interface Cafe {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  // 작업 환경 정보
  outletAvailability: OutletAvailability;
  wifiSpeed: WifiSpeed;
  noiseLevel: NoiseLevel;
  // 추가 정보
  description?: string;
  phoneNumber?: string;
  operatingHours?: string;
  createdAt: string;
  updatedAt: string;
}

// 리뷰 타입
export interface Review {
  id: string;
  cafeId: string;
  content: string;
  author?: string;
  createdAt: string;
}

// 작업 환경 필터 타입
export interface WorkEnvironmentFilter {
  outletAvailability?: OutletAvailability[];
  wifiSpeed?: WifiSpeed[];
  noiseLevel?: NoiseLevel[];
}
