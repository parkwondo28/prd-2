# 워크스팟 (WorkSpot)

**사진 찍기 좋은 곳이 아닌, 실제로 일하기 좋은 곳을 찾아서**

## 프로젝트 개요

1인 가구 작업자(프리랜서, 직장인 등)들이 집 근처에서 일할 공간을 찾을 때, 작업 환경에 특화된 정보를 제공하는 서비스입니다.

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: React Query (TanStack Query)
- **지도 API**: 네이버 지도 API

## 시작하기

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_map_client_id
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

자세한 프로젝트 구조는 [docs/task/01-프로젝트-구조-제안.md](./docs/task/01-프로젝트-구조-제안.md)를 참고하세요.

## 개발 우선순위

1. ✅ 지도 기반 카페 탐색 + 작업 환경 필터 (완료)
2. ⏳ 카페 정보 수정 및 리뷰 작성 기능
3. ⏳ 이용 에티켓 화면

## 주요 기능

### 완료된 기능

- ✅ 지도 위 카페 표시
- ✅ 작업 환경 필터 (콘센트, 와이파이, 소음)
- ✅ 카페 상세 페이지

### 개발 예정

- 카페 정보 수정 요청
- 리뷰 작성 및 조회
- 이용 에티켓 가이드

## 참고 문서

- [PRD.md](./PRD.md) - 프로젝트 요구사항 문서
- [docs/task/](./docs/task/) - 작업 문서
