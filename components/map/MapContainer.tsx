"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import type { Cafe } from "@/lib/types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet 마커 아이콘 설정 (기본 아이콘 경로 문제 해결)
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapContainerProps {
  cafes: Cafe[];
  center?: { lat: number; lng: number };
  onMarkerClick?: (cafe: Cafe) => void;
}

// 지도 범위 자동 조정 컴포넌트
function MapBounds({ cafes }: { cafes: Cafe[] }) {
  const map = useMap();

  useEffect(() => {
    if (cafes.length === 0) return;

    const bounds = L.latLngBounds(
      cafes.map((cafe) => [cafe.latitude, cafe.longitude]),
    );

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, cafes]);

  return null;
}

export default function MapContainer({
  cafes,
  center,
  onMarkerClick,
}: MapContainerProps) {
  const defaultCenter: [number, number] = center
    ? [center.lat, center.lng]
    : [37.5665, 126.978]; // 서울시청 기본 위치

  return (
    <div className="relative w-full h-full">
      <LeafletMapContainer
        center={defaultCenter}
        zoom={13}
        className="w-full h-full min-h-[600px] z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 카페 마커 표시 */}
        {cafes.map((cafe) => (
          <Marker
            key={cafe.id}
            position={[cafe.latitude, cafe.longitude]}
            icon={icon}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(cafe);
                }
              },
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-sm mb-1">{cafe.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{cafe.address}</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {cafe.outletAvailability === "many"
                      ? "콘센트 많음"
                      : cafe.outletAvailability === "some"
                        ? "콘센트 보통"
                        : cafe.outletAvailability === "few"
                          ? "콘센트 적음"
                          : "콘센트 없음"}
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    {cafe.wifiSpeed === "fast"
                      ? "와이파이 빠름"
                      : cafe.wifiSpeed === "medium"
                        ? "와이파이 보통"
                        : cafe.wifiSpeed === "slow"
                          ? "와이파이 느림"
                          : "와이파이 없음"}
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                    {cafe.noiseLevel === "quiet"
                      ? "조용함"
                      : cafe.noiseLevel === "moderate"
                        ? "보통"
                        : "시끄러움"}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 지도 범위 자동 조정 */}
        <MapBounds cafes={cafes} />
      </LeafletMapContainer>
    </div>
  );
}
