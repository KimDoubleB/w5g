# 이미지 가이드

## 디렉토리 구조

```
public/img/
├─ main/
│  └─ hero.jpg           ← Hero 사진 (세로 3:4 권장)
├─ gallery/
│  └─ 01.jpg ~ 20.jpg    ← 갤러리 (정사각 1:1 권장)
├─ og/
│  └─ thumbnail.svg      ← 카톡/링크 미리보기 (1200×630 권장 → 실제 JPG로 교체 권장)
└─ icons/
   ├─ navermap.png       ← 네이버지도 앱 아이콘 (App Store 공식)
   ├─ kakaomap.png       ← 카카오맵 앱 아이콘 (App Store 공식)
   └─ tmap.png           ← 티맵 앱 아이콘 (App Store 공식)
```

## 사진 교체

1. 같은 위치 같은 파일명으로 새 사진을 저장 (예: `gallery/03.jpg` 덮어쓰기)
2. 갤러리 장수 변경 시 `src/data/wedding.ts` 의 `GALLERY_COUNT` 수정
3. 확장자 변경 시 `IMG_EXT` 수정
4. 큰 사진은 `npm run resize-images` 로 일괄 리사이즈 (원본은 `_original/` 에 자동 백업, gitignore 됨)

## OG 썸네일

`og/thumbnail.svg` 는 임시 SVG 입니다. 카톡 미리보기는 SVG를 거의 렌더하지 않으므로
실제 1200×630 JPG 로 교체하고 `index.html` 의 `og:image` 확장자도 `.jpg` 로 갱신하세요.

## 권장 사이즈

| 용도 | 비율 | 권장 해상도 | 포맷 |
| --- | --- | --- | --- |
| Hero | 3:4 (세로) | 1200×1600 ~ 1500×2000 | JPG (품질 80~85) |
| Gallery | 1:1 (정사각) | 1080×1080 ~ 1500×1500 | JPG |
| OG 썸네일 | 1.91:1 | 1200×630 | JPG |

## 아이콘 출처 (icons/)

3개 모두 한국 Apple App Store 의 공식 앱 아이콘에서 다운로드한 것입니다:

- **navermap.png** : `com.nhncorp.NaverMap` (네이버지도)
- **kakaomap.png** : `net.daum.maps` (카카오맵)
- **tmap.png** : `com.SKTelecom.TMap` (티맵)

각각 `https://itunes.apple.com/search?term=...&country=kr` 응답의 `artworkUrl100` 을
256×256 PNG 로 받아 96×96 으로 sharp 리사이즈한 결과입니다. 각 앱 운영사의 브랜드
자산이며, 본 청첩장에서는 사용자가 해당 앱으로 길찾기를 시작할 수 있도록 안내하는
용도(referrer 표시)로 한정하여 사용합니다.
