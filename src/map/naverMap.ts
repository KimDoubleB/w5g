export const DEFAULT_NAVER_MAP_NCP_KEY_ID = 'fe7m7ra5ha';

const NAVER_MAP_SCRIPT_ID = 'naver-map-sdk';
const NAVER_MAP_SCRIPT_ORIGIN = 'https://oapi.map.naver.com/openapi/v3/maps.js';

type Coordinates = {
  lat: number;
  lng: number;
};

type NaverMapsNamespace = {
  LatLng: new (lat: number, lng: number) => unknown;
  Map: new (container: HTMLElement, options: Record<string, unknown>) => unknown;
  Marker: new (options: Record<string, unknown>) => unknown;
};

export type NaverMapWindow = Window &
  typeof globalThis & {
    naver?: {
      maps?: NaverMapsNamespace;
    };
  };

export const resolveNaverMapClientId = (configuredClientId?: string): string => {
  const trimmed = configuredClientId?.trim();
  if (trimmed) return trimmed;

  return DEFAULT_NAVER_MAP_NCP_KEY_ID;
};

export const buildNaverMapsScriptSrc = (clientId: string): string =>
  `${NAVER_MAP_SCRIPT_ORIGIN}?ncpKeyId=${encodeURIComponent(clientId)}`;

const hasNaverMaps = (win: NaverMapWindow): boolean => Boolean(win.naver?.maps?.Map);

const loadNaverMapsScript = (clientId: string, doc: Document): Promise<void> =>
  new Promise((resolve, reject) => {
    const existing = doc.getElementById(NAVER_MAP_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }

      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('NAVER Maps SDK failed to load')), { once: true });
      return;
    }

    const script = doc.createElement('script');
    script.id = NAVER_MAP_SCRIPT_ID;
    script.src = buildNaverMapsScriptSrc(clientId);
    script.async = true;
    script.defer = true;
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true';
        resolve();
      },
      { once: true },
    );
    script.addEventListener('error', () => reject(new Error('NAVER Maps SDK failed to load')), { once: true });

    doc.head.append(script);
  });

const ensureNaverMaps = async (clientId: string, win: NaverMapWindow, doc: Document): Promise<void> => {
  if (hasNaverMaps(win)) return;

  await loadNaverMapsScript(clientId, doc);

  if (!hasNaverMaps(win)) {
    throw new Error('NAVER Maps SDK loaded without the maps namespace');
  }
};

export const renderNaverMap = (
  container: HTMLElement,
  opts: { coords: Coordinates; title: string; zoom?: number },
  win: NaverMapWindow = window as NaverMapWindow,
): boolean => {
  const maps = win.naver?.maps;
  if (!maps) return false;

  const position = new maps.LatLng(opts.coords.lat, opts.coords.lng);
  const map = new maps.Map(container, {
    center: position,
    zoom: opts.zoom ?? 16,
    zoomControl: true,
    scaleControl: false,
    mapDataControl: false,
  });

  new maps.Marker({
    position,
    map,
    title: opts.title,
  });

  return true;
};

export const initializeNaverMap = async (
  container: HTMLElement,
  opts: { clientId?: string; coords: Coordinates; title: string; zoom?: number },
): Promise<boolean> => {
  const clientId = resolveNaverMapClientId(opts.clientId);

  await ensureNaverMaps(clientId, window as NaverMapWindow, document);
  return renderNaverMap(container, opts);
};
