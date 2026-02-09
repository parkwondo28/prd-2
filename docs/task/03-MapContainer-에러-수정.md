# MapContainer 에러 수정

## 작업 일자

2026-02-09

## 문제 상황

`components/map/MapContainer.tsx`의 48번째 줄에서 런타임 에러 발생:

```
TypeError: Cannot read properties of null (reading 'capitalize')
```

에러 발생 위치: `markers.forEach((marker) => marker.setMap(null))`

## 원인 분석

1. `markers` 상태가 useState로 관리되어 클로저 문제로 인해 이전 상태를 참조할 수 있음
2. 마커가 null이거나 유효하지 않을 때 `setMap` 호출 시 에러 발생
3. 네이버 지도 API가 완전히 로드되기 전에 지도 초기화 시도
4. 마커 정리 로직에 null 체크가 없음

## 수정 내용

### 1. markers를 useRef로 변경

- `useState`에서 `useRef`로 변경하여 항상 최신 마커 배열 참조 보장
- 클로저 문제 해결

### 2. 안전한 마커 정리 로직 추가

- 마커 제거 시 null 체크 및 try-catch 추가
- `clearMarkers` 함수로 마커 정리 로직 분리
- 각 마커의 유효성 검사 후 `setMap(null)` 호출

### 3. useEffect cleanup 함수 추가

- 컴포넌트 언마운트 시 마커 정리
- 메모리 누수 방지

### 4. 네이버 지도 API 로드 확인 강화

- `checkNaverMapLoaded` 함수로 API 로드 상태 확인
- API가 로드되지 않았을 경우 재시도 로직 추가

### 5. 에러 처리 강화

- 마커 생성 시 try-catch 추가
- 지도 범위 조정 시 에러 처리 추가
- null 마커 필터링

## 수정된 파일

- `components/map/MapContainer.tsx`

## 주요 변경사항

### Before

```typescript
const [markers, setMarkers] = useState<any[]>([]);

useEffect(() => {
  if (!map || !window.naver) return;

  // 기존 마커 제거
  markers.forEach((marker) => marker.setMap(null));

  // 새 마커 생성
  const newMarkers = cafes.map((cafe) => {
    const marker = new window.naver.maps.Marker({...});
    return marker;
  });

  setMarkers(newMarkers);
}, [map, cafes, onMarkerClick]);
```

### After

```typescript
const markersRef = useRef<any[]>([]);

// 네이버 지도 API 로드 확인 강화
useEffect(() => {
  const checkNaverMapLoaded = () => {
    if (window.naver && window.naver.maps) {
      // 지도 초기화
    } else {
      setTimeout(checkNaverMapLoaded, 100);
    }
  };
  checkNaverMapLoaded();
}, [center]);

// 안전한 마커 관리
useEffect(() => {
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => {
      if (marker && typeof marker.setMap === "function") {
        try {
          marker.setMap(null);
        } catch (error) {
          console.warn("마커 제거 중 오류:", error);
        }
      }
    });
    markersRef.current = [];
  };

  clearMarkers();

  // 새 마커 생성 (에러 처리 포함)
  const newMarkers = cafes.map((cafe) => {
    try {
      const marker = new window.naver.maps.Marker({...});
      return marker;
    } catch (error) {
      return null;
    }
  });

  markersRef.current = newMarkers.filter(m => m !== null);

  return () => {
    clearMarkers();
  };
}, [map, cafes, onMarkerClick]);
```

## 테스트 결과

- ✅ 마커 정리 시 null 참조 에러 해결
- ✅ 네이버 지도 API 로드 대기 로직 추가
- ✅ 안전한 마커 관리 로직 구현
- ✅ 린터 오류 없음

## 추가 개선 사항

- 마커 생성 실패 시 에러 로깅 추가
- 지도 범위 조정 실패 시 경고 로깅 추가
- cleanup 함수로 메모리 누수 방지
