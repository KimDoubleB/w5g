# w5g

## 로컬에서 확인하기

```sh
npm install
npm run dev
```

- 기본 화면: http://localhost:5173/w5g/
- 결혼식 당일 미리보기: http://localhost:5173/w5g/?preview=wedding-day
- 기존 청첩장 미리보기: http://localhost:5173/w5g/?preview=invitation
- 감사 페이지 미리보기: http://localhost:5173/w5g/?preview=thank-you

미리보기 옵션은 개발 서버와 실제 배포 사이트 모두에서 날짜와 관계없이 적용됩니다. `?preview=invitation`은 일반 청첩장, `?preview=wedding-day`는 당일 청첩장, `?preview=thank-you`는 감사 페이지를 보여줍니다. 파라미터가 없거나 알 수 없는 값이면 `src/data/wedding.ts`의 예식 날짜를 기준으로 한국 시간(Asia/Seoul)에 따라 화면을 선택합니다. 예식 전날 00:00부터 예식 다음 날 00:00 전까지 당일 화면을 보여줍니다. 페이지를 열어 둔 경우에도 30초마다 날짜를 확인하며 화면으로 돌아왔을 때도 확인합니다.

당일 화면 순서: OUR WEDDING DAY → 신랑·신부 이름 → 결혼 인사 → 예식 일시·장소 → 감사 인사 → 오시는 길 → 연락하실 곳 → 마음 전하실 곳. 메인 사진과 갤러리, 달력은 표시하지 않습니다.

한국 시간 기준 예식 다음 날(2026년 11월 1일) 00:00부터는 이름과 하트, 감사 인사, 연락하실 곳만 표시합니다. 예식장 안내와 계좌, 사진, 공유 버튼은 표시하지 않습니다. 개발 서버가 다른 포트에서 실행되면 위 주소의 포트를 서버가 안내하는 번호로 바꿔 주세요.

```sh
npm test
npm run build
```

