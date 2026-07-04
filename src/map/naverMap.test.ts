import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  DEFAULT_NAVER_MAP_NCP_KEY_ID,
  buildNaverMapsScriptSrc,
  renderNaverMap,
  resolveNaverMapClientId,
  type NaverMapWindow,
} from './naverMap.js';

describe('resolveNaverMapClientId', () => {
  it('uses the provided configured client id after trimming it', () => {
    assert.equal(resolveNaverMapClientId('  custom-id  '), 'custom-id');
  });

  it('falls back to the project client id when no env value exists', () => {
    assert.equal(resolveNaverMapClientId(), DEFAULT_NAVER_MAP_NCP_KEY_ID);
    assert.equal(resolveNaverMapClientId('   '), DEFAULT_NAVER_MAP_NCP_KEY_ID);
  });
});

describe('buildNaverMapsScriptSrc', () => {
  it('builds the NAVER Maps SDK URL with ncpKeyId', () => {
    assert.equal(
      buildNaverMapsScriptSrc('abc123'),
      'https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=abc123',
    );
  });

  it('encodes the client id before putting it in the URL', () => {
    assert.match(buildNaverMapsScriptSrc('abc 123'), /ncpKeyId=abc%20123/);
  });
});

describe('renderNaverMap', () => {
  it('returns false when the NAVER Maps SDK is unavailable', () => {
    assert.equal(
      renderNaverMap({} as HTMLElement, { coords: { lat: 37, lng: 127 }, title: 'venue' }, {} as NaverMapWindow),
      false,
    );
  });

  it('creates a map and marker centered on the venue coordinates', () => {
    const calls: {
      latLng?: unknown;
      mapContainer?: HTMLElement;
      mapOptions?: Record<string, unknown>;
      mapInstance?: unknown;
      markerOptions?: Record<string, unknown>;
    } = {};

    class FakeLatLng {
      constructor(
        public readonly lat: number,
        public readonly lng: number,
      ) {
        calls.latLng = this;
      }
    }

    class FakeMap {
      constructor(container: HTMLElement, options: Record<string, unknown>) {
        calls.mapContainer = container;
        calls.mapOptions = options;
        calls.mapInstance = this;
      }
    }

    class FakeMarker {
      constructor(options: Record<string, unknown>) {
        calls.markerOptions = options;
      }
    }

    const container = {} as HTMLElement;
    const win = {
      naver: {
        maps: {
          LatLng: FakeLatLng,
          Map: FakeMap,
          Marker: FakeMarker,
        },
      },
    } as unknown as NaverMapWindow;

    assert.equal(renderNaverMap(container, { coords: { lat: 37.4699, lng: 127.0379 }, title: 'aT포레' }, win), true);
    assert.equal(calls.mapContainer, container);
    assert.deepEqual(
      {
        center: calls.mapOptions?.center,
        zoom: calls.mapOptions?.zoom,
      },
      { center: calls.latLng, zoom: 16 },
    );
    assert.deepEqual(calls.markerOptions, {
      position: calls.latLng,
      map: calls.mapInstance,
      title: 'aT포레',
    });
  });
});
