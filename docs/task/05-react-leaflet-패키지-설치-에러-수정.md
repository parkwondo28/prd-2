# react-leaflet 패키지 설치 에러 수정

## 작업 일자

2026-02-09

## 문제 상황

빌드 시 다음 에러 발생:

```
Module not found: Can't resolve 'react-leaflet'
```

## 원인 분석

1. `package.json`에 `react-leaflet` 패키지가 정의되어 있었지만 설치되지 않음
2. `react-leaflet@5.0.0`은 React 19를 요구하지만 프로젝트는 React 18 사용
3. 의존성 충돌로 인해 패키지 설치 실패

## 해결 방법

### 1. react-leaflet 버전 다운그레이드

- `react-leaflet@5.0.0` → `react-leaflet@4.2.1`로 변경
- React 18과 호환되는 버전 사용

### 2. 패키지 설치

- `npm install` 실행하여 패키지 설치 완료

## 수정된 파일

- `package.json`: react-leaflet 버전을 4.2.1로 변경

## 변경 내용

### Before

```json
"react-leaflet": "^5.0.0"
```

### After

```json
"react-leaflet": "^4.2.1"
```

## 설치된 패키지

- `react-leaflet@4.2.1`: React 18과 호환되는 버전
- `leaflet@1.9.4`: 지도 렌더링 엔진
- `@types/leaflet@1.9.21`: TypeScript 타입 정의

## 결과

- 패키지 설치 성공
- 빌드 에러 해결
- 린터 오류 없음

## 참고 사항

- react-leaflet 5.x는 React 19를 요구함
- React 18 프로젝트에서는 react-leaflet 4.x 사용 권장
- react-leaflet 4.2.1은 React 18과 완전히 호환됨
