export type Account = {
  role: string;
  bank: string;
  number: string;
  holder: string;
};

export type BusGroup = {
  title: string;
  stop: string;
  lines: string[];
};

export type WeddingData = {
  groom: { name: string; parents: [string, string] };
  bride: { name: string; parents: [string, string] };
  date: Date;
  venue: {
    name: string;
    address: string;
    coords: { lat: number; lng: number };
    mapLinks: { naver: string; kakao: string; tmap: string };
  };
  ways: {
    subway: string[];
    bus: BusGroup[];
    car: string[];
  };
  accounts: { groom: Account[]; bride: Account[] };
  contacts: {
    groom: string;
    groomFather: string;
    groomMother: string;
    bride: string;
    brideFather: string;
    brideMother: string;
  };
  invitationMessage: string[];
};

const env = (key: keyof ImportMetaEnv): string => {
  const v = import.meta.env[key];
  return typeof v === 'string' ? v : '';
};

const acct = (prefix: 'GROOM' | 'GROOM_FATHER' | 'GROOM_MOTHER' | 'BRIDE' | 'BRIDE_FATHER' | 'BRIDE_MOTHER',
  role: string,
  holder: string,
): Account => ({
  role,
  holder,
  bank: env(`VITE_ACCT_${prefix}_BANK` as keyof ImportMetaEnv) || 'TODO',
  number: env(`VITE_ACCT_${prefix}_NUMBER` as keyof ImportMetaEnv) || 'TODO',
});

export const WEDDING: WeddingData = {
  groom: { name: '김보배', parents: ['김영칠', '심재숙'] },
  bride: { name: '현기숙', parents: ['현진설', '윤인숙'] },
  date: new Date('2026-10-31T14:00:00+09:00'),
  venue: {
    name: 'aT포레 웨딩홀',
    address: '서울특별시 서초구 강남대로 27 (양재동 232번지)',
    // TODO: 실제 좌표 입력 (필요 시)
    coords: { lat: 37.4699, lng: 127.0379 },
    mapLinks: {
      naver: env('VITE_MAP_NAVER') || '#TODO_NAVER_MAP_URL',
      kakao: env('VITE_MAP_KAKAO') || '#TODO_KAKAO_MAP_URL',
      tmap: env('VITE_MAP_TMAP') || '#TODO_TMAP_URL',
    },
  },
  ways: {
    subway: [
      '신분당선 양재시민의숲역(매헌) 하차',
      '지상 4번출구 이용 / 지하 내부 통로로 바로 연결 가능',
      '2호선 강남역, 3호선 양재역에서 신분당선 환승 가능',
    ],
    bus: [
      {
        title: '일반버스 (초록 지선·파랑 간선)',
        stop: '"AT센터·양재꽃시장" 하차',
        lines: [
          '서울 초록버스: 0411, 4432',
          '서울 파랑버스: 140, 400, 405, 421, 440, 441, 452, 470, 741',
          '경기: 11-3, 917 (잠실/과천/안양)',
        ],
      },
      {
        title: '좌석버스 · 빨강 광역노선',
        stop: '"시민의숲·양재꽃시장" 하차',
        lines: [
          '광역버스: 9404, 9408, 9409, 9711',
          '인천: 9100, 9200, 9201, 9300, 9500, 9501, 9802, M6405, M6450',
          '성남: 9408, 9400',
          '수원: 3002, 3007, 3008',
          '용인: 5001, 5001-1, 5002B',
          '경기버스: 1311, 1550, 1550-1, 1560',
        ],
      },
      {
        title: '마을버스',
        stop: '"시민의숲·양재꽃시장" 하차',
        lines: ['양재역 방면: 서초 20'],
      },
    ],
    car: [
      '네비게이션: "AT센터" 검색',
      '경부고속도로 양재 IC 개포·가락방향 진출 후 염곡사거리에서 좌회전 후 U턴 (꽃시장 옆)',
    ],
  },
  accounts: {
    groom: [
      acct('GROOM', '신랑', '김보배'),
      acct('GROOM_FATHER', '신랑 아버지', '김영칠'),
      acct('GROOM_MOTHER', '신랑 어머니', '심재숙'),
    ],
    bride: [
      acct('BRIDE', '신부', '현기숙'),
      acct('BRIDE_FATHER', '신부 아버지', '현진설'),
      acct('BRIDE_MOTHER', '신부 어머니', '윤인숙'),
    ],
  },
  contacts: {
    groom: env('VITE_PHONE_GROOM'),
    groomFather: env('VITE_PHONE_GROOM_FATHER'),
    groomMother: env('VITE_PHONE_GROOM_MOTHER'),
    bride: env('VITE_PHONE_BRIDE'),
    brideFather: env('VITE_PHONE_BRIDE_FATHER'),
    brideMother: env('VITE_PHONE_BRIDE_MOTHER'),
  },
  invitationMessage: [
    '함께하면 모든 것이 행복해지는 사람과',
    '새롭게 시작하는 날 초대합니다.',
    '예쁜 마음가짐으로 보듬어주며 살겠습니다.',
    '그동안 아껴주신 마음 그대로',
    '평생의 인연이 될 첫날에 함께해 주세요.',
  ],
};

export const GALLERY_COUNT = 20;

/** Image extension for hero/gallery files under `public/img/`. */
export const IMG_EXT = 'jpg' as const;
