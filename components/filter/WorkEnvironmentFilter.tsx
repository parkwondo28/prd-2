"use client";

import { useState } from "react";
import type {
  WorkEnvironmentFilter,
  OutletAvailability,
  WifiSpeed,
  NoiseLevel,
} from "@/lib/types";

interface WorkEnvironmentFilterProps {
  onFilterChange: (filter: WorkEnvironmentFilter) => void;
}

export default function WorkEnvironmentFilter({
  onFilterChange,
}: WorkEnvironmentFilterProps) {
  const [filters, setFilters] = useState<WorkEnvironmentFilter>({});

  const handleOutletChange = (value: OutletAvailability, checked: boolean) => {
    const newFilters = { ...filters };
    if (!newFilters.outletAvailability) {
      newFilters.outletAvailability = [];
    }

    if (checked) {
      newFilters.outletAvailability = [...newFilters.outletAvailability, value];
    } else {
      newFilters.outletAvailability = newFilters.outletAvailability.filter(
        (v) => v !== value,
      );
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleWifiChange = (value: WifiSpeed, checked: boolean) => {
    const newFilters = { ...filters };
    if (!newFilters.wifiSpeed) {
      newFilters.wifiSpeed = [];
    }

    if (checked) {
      newFilters.wifiSpeed = [...newFilters.wifiSpeed, value];
    } else {
      newFilters.wifiSpeed = newFilters.wifiSpeed.filter((v) => v !== value);
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleNoiseChange = (value: NoiseLevel, checked: boolean) => {
    const newFilters = { ...filters };
    if (!newFilters.noiseLevel) {
      newFilters.noiseLevel = [];
    }

    if (checked) {
      newFilters.noiseLevel = [...newFilters.noiseLevel, value];
    } else {
      newFilters.noiseLevel = newFilters.noiseLevel.filter((v) => v !== value);
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const outletLabels: Record<OutletAvailability, string> = {
    many: "콘센트 많음",
    some: "콘센트 보통",
    few: "콘센트 적음",
    none: "콘센트 없음",
  };

  const wifiLabels: Record<WifiSpeed, string> = {
    fast: "와이파이 빠름",
    medium: "와이파이 보통",
    slow: "와이파이 느림",
    none: "와이파이 없음",
  };

  const noiseLabels: Record<NoiseLevel, string> = {
    quiet: "조용함",
    moderate: "보통",
    loud: "시끄러움",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-bold mb-4">작업 환경 필터</h2>

      {/* 콘센트 필터 */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">콘센트</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(outletLabels) as OutletAvailability[]).map((value) => (
            <label
              key={value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.outletAvailability?.includes(value) || false}
                onChange={(e) => handleOutletChange(value, e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">{outletLabels[value]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 와이파이 필터 */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">와이파이 속도</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(wifiLabels) as WifiSpeed[]).map((value) => (
            <label
              key={value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.wifiSpeed?.includes(value) || false}
                onChange={(e) => handleWifiChange(value, e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">{wifiLabels[value]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 소음 필터 */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">소음 수준</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(noiseLabels) as NoiseLevel[]).map((value) => (
            <label
              key={value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.noiseLevel?.includes(value) || false}
                onChange={(e) => handleNoiseChange(value, e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">{noiseLabels[value]}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
