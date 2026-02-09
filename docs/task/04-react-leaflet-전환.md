# react-leaflet + OpenStreetMap 전환 작업

## 작업 일자

2026-02-09

## 작업 개요

네이버 지도 API에서 react-leaflet + OpenStreetMap으로 지도 라이브러리를 전환했습니다.

## 변경 이유

- API 키 불필요 (완전 무료)
- 한국 지도 타일 지원
- React와 통합 용이
- 커스터마이징 가능
- 모바일/데스크톱 모두 지원

## 완료된 작업

### 1. PRD 버전 관리 구조 생성

- `PRD-v1.0.md`: 초기 버전 (네이버 지도 API 사용)
- `PRD-v2.0.md`: 새 버전 (react-leaflet + OpenStreetMap 사용)
- `PRD.md`: 최신 버전으로 업데이트 (v2.0)

### 2. 패키지 추가

다음 패키지를 `package.json`에 추가:

- `react-leaflet`: ^5.0.0 (React용 Leaflet 래퍼)
- `leaflet`: ^1.9.4 (지도 렌더링 엔진)
- `@types/leaflet`: ^1.9.21 (TypeScript 타입 정의)

### 3. Leaflet CSS 추가

`app/globals.css`에 Leaflet CSS import 추가:

```css
@import "leaflet/dist/leaflet.css";
```

### 4. MapContainer 컴포넌트 전면 재작성

`components/map/MapContainer.tsx`를 react-leaflet 기반으로 완전히 재작성:

**주요 변경사항:**

- 네이버 지도 API 제거
- react-leaflet의 `MapContainer`, `TileLayer`, `Marker`, `Popup` 컴포넌트 사용
- OpenStreetMap 타일 사용 (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
- Leaflet 마커 아이콘 설정 (기본 아이콘 경로 문제 해결)
- `MapBounds` 컴포넌트로 지도 범위 자동 조정
- 마커 클릭 시 카페 상세 페이지로 이동
- Popup에 카페 정보 및 작업 환경 표시

**주요 기능:**

- 지도 타일 로드
- 카페 마커 표시
- 마커 클릭 이벤트 처리
- 지도 범위 자동 조정 (모든 카페가 보이도록)
- Popup에 카페 정보 표시

### 5. app/page.tsx 수정

- 네이버 지도 스크립트 로드 코드 제거
- `Window.naver` 타입 선언 제거
- 사용자 위치 가져오기 로직은 유지 (지도 중심 설정용)

## 수정된 파일 목록

### 새로 생성된 파일

- `PRD-v1.0.md`: 초기 버전 백업
- `PRD-v2.0.md`: 새 버전 문서

### 수정된 파일

- `PRD.md`: v2.0으로 업데이트
- `package.json`: react-leaflet 관련 패키지 추가
- `app/globals.css`: Leaflet CSS import 추가
- `components/map/MapContainer.tsx`: 완전히 재작성
- `app/page.tsx`: 네이버 지도 관련 코드 제거

## 기술 스택 변경

### Before (v1.0)

- 네이버 지도 API
- API 키 필요
- 외부 스크립트 로드 필요

### After (v2.0)

- react-leaflet + OpenStreetMap
- API 키 불필요
- npm 패키지로 관리
- 완전 무료

## 사용된 지도 타일

- **URL**: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- **제공자**: OpenStreetMap
- **라이선스**: ODbL (Open Database License)

## 마커 아이콘

- 기본 Leaflet 마커 아이콘 사용
- CDN에서 로드 (unpkg.com)
- 아이콘 크기: 25x41px
- 그림자 포함

## 다음 단계

1. 패키지 설치: `npm install`
2. 개발 서버 실행: `npm run dev`
3. 지도 기능 테스트
4. 필요시 추가 커스터마이징

## 참고 사항

- Leaflet은 SSR(Server-Side Rendering)을 지원하지 않으므로 `"use client"` 디렉티브 필수
- 마커 아이콘은 CDN에서 로드하므로 인터넷 연결 필요
- 필요시 마커 아이콘을 로컬 파일로 변경 가능
