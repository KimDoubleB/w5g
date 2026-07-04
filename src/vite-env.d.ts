/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Phone numbers (set via .env.local locally; via GitHub Secrets at deploy time)
  readonly VITE_PHONE_GROOM?: string;
  readonly VITE_PHONE_GROOM_FATHER?: string;
  readonly VITE_PHONE_GROOM_MOTHER?: string;
  readonly VITE_PHONE_BRIDE?: string;
  readonly VITE_PHONE_BRIDE_FATHER?: string;
  readonly VITE_PHONE_BRIDE_MOTHER?: string;

  // Bank accounts: 6 people × {bank, number}
  readonly VITE_ACCT_GROOM_BANK?: string;
  readonly VITE_ACCT_GROOM_NUMBER?: string;
  readonly VITE_ACCT_GROOM_FATHER_BANK?: string;
  readonly VITE_ACCT_GROOM_FATHER_NUMBER?: string;
  readonly VITE_ACCT_GROOM_MOTHER_BANK?: string;
  readonly VITE_ACCT_GROOM_MOTHER_NUMBER?: string;
  readonly VITE_ACCT_BRIDE_BANK?: string;
  readonly VITE_ACCT_BRIDE_NUMBER?: string;
  readonly VITE_ACCT_BRIDE_FATHER_BANK?: string;
  readonly VITE_ACCT_BRIDE_FATHER_NUMBER?: string;
  readonly VITE_ACCT_BRIDE_MOTHER_BANK?: string;
  readonly VITE_ACCT_BRIDE_MOTHER_NUMBER?: string;

  // Map links (not secret, but env-driven for convenience)
  readonly VITE_MAP_NAVER?: string;
  readonly VITE_MAP_KAKAO?: string;
  readonly VITE_MAP_TMAP?: string;
  readonly VITE_NAVER_MAP_NCP_KEY_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
