"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MapContainer from "@/components/map/MapContainer";
import WorkEnvironmentFilter from "@/components/filter/WorkEnvironmentFilter";
import CafeCard from "@/components/cafe/CafeCard";
import type { Cafe, WorkEnvironmentFilter as FilterType } from "@/lib/types";
import { useRouter } from "next/navigation";

async function fetchCafes(filter?: FilterType): Promise<Cafe[]> {
  const params = new URLSearchParams();

  if (filter?.outletAvailability && filter.outletAvailability.length > 0) {
    params.append("outletAvailability", filter.outletAvailability.join(","));
  }
  if (filter?.wifiSpeed && filter.wifiSpeed.length > 0) {
    params.append("wifiSpeed", filter.wifiSpeed.join(","));
  }
  if (filter?.noiseLevel && filter.noiseLevel.length > 0) {
    params.append("noiseLevel", filter.noiseLevel.join(","));
  }

  const response = await fetch(`/api/cafes?${params.toString()}`);
  if (!response.ok) {
    throw new Error("카페 데이터를 불러오는데 실패했습니다.");
  }
  return response.json();
}

export default function Home() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>({});
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // 위치 권한 거부 시 서울시청을 기본값으로 사용
          setUserLocation({ lat: 37.5665, lng: 126.978 });
        },
      );
    } else {
      setUserLocation({ lat: 37.5665, lng: 126.978 });
    }
  }, []);

  const { data: cafes = [], isLoading } = useQuery({
    queryKey: ["cafes", filter],
    queryFn: () => fetchCafes(filter),
  });

  const handleMarkerClick = (cafe: Cafe) => {
    router.push(`/cafe/${cafe.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">워크스팟</h1>
          <p className="text-sm text-gray-600">일하기 좋은 곳을 찾아서</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 필터 및 카페 목록 */}
          <div className="lg:col-span-1">
            <WorkEnvironmentFilter onFilterChange={setFilter} />

            <div className="mt-4">
              <h2 className="text-lg font-bold mb-4">카페 목록</h2>
              {isLoading ? (
                <div className="text-center py-8">로딩 중...</div>
              ) : cafes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  조건에 맞는 카페가 없습니다.
                </div>
              ) : (
                <div className="space-y-4">
                  {cafes.map((cafe) => (
                    <CafeCard key={cafe.id} cafe={cafe} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 지도 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {userLocation && (
                <MapContainer
                  cafes={cafes}
                  center={userLocation}
                  onMarkerClick={handleMarkerClick}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
