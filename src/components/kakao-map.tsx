"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RestaurantWithEpisode } from "@/types/domain";

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (container: HTMLElement, options: { center: unknown; level: number }) => unknown;
        Marker: new (options: { position: unknown; map: unknown; title: string }) => unknown;
      };
    };
  }
}

type KakaoMapProps = {
  restaurants: RestaurantWithEpisode[];
  selectedRestaurantId: string;
  onSelectRestaurant: (restaurantId: string) => void;
};

export function KakaoMap({ restaurants, selectedRestaurantId, onSelectRestaurant }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
  const selectedRestaurant = restaurants.find(
    (restaurant) => restaurant.id === selectedRestaurantId,
  );

  const bounds = useMemo(() => {
    const lats = restaurants.map((restaurant) => restaurant.lat);
    const lngs = restaurants.map((restaurant) => restaurant.lng);

    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [restaurants]);

  useEffect(() => {
    if (!kakaoKey || !containerRef.current || isKakaoReady) {
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>("script[data-kakao-map]");

    if (existingScript) {
      window.kakao?.maps.load(() => setIsKakaoReady(true));
      return;
    }

    const script = document.createElement("script");
    script.dataset.kakaoMap = "true";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao?.maps.load(() => setIsKakaoReady(true));
    document.head.appendChild(script);
  }, [isKakaoReady, kakaoKey]);

  useEffect(() => {
    if (!isKakaoReady || !containerRef.current || !window.kakao || !selectedRestaurant) {
      return;
    }

    const kakao = window.kakao;
    const center = new kakao.maps.LatLng(selectedRestaurant.lat, selectedRestaurant.lng);
    const map = new kakao.maps.Map(containerRef.current, {
      center,
      level: 5,
    });

    restaurants.forEach((restaurant) => {
      const position = new kakao.maps.LatLng(restaurant.lat, restaurant.lng);
      new kakao.maps.Marker({
        position,
        map,
        title: restaurant.name,
      });
    });
  }, [isKakaoReady, restaurants, selectedRestaurant]);

  if (kakaoKey) {
    return <div className="h-full min-h-[520px] w-full" ref={containerRef} />;
  }

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden bg-[#d9e1d2]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(33,28,24,0.08)_1px,transparent_1px),linear-gradient(rgba(33,28,24,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
      {restaurants.map((restaurant) => {
        const top = project(restaurant.lat, bounds.minLat, bounds.maxLat, true);
        const left = project(restaurant.lng, bounds.minLng, bounds.maxLng);
        const isSelected = restaurant.id === selectedRestaurantId;

        return (
          <button
            aria-label={`${restaurant.name} 선택`}
            className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#b33b2e] shadow-[0_0_0_7px_rgba(179,59,46,0.16)] transition-transform hover:scale-125"
            key={restaurant.id}
            onClick={() => onSelectRestaurant(restaurant.id)}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              transform: `translate(-50%, -50%) scale(${isSelected ? 1.35 : 1})`,
            }}
            type="button"
          />
        );
      })}
      <div className="absolute right-5 bottom-5 max-w-[260px] border border-[#211c18]/10 bg-white px-4 py-3 text-sm">
        카카오맵 키가 없어서 좌표 기반 대체 지도를 표시 중입니다.
      </div>
    </div>
  );
}

function project(value: number, min: number, max: number, invert = false) {
  if (min === max) {
    return 50;
  }

  const ratio = (value - min) / (max - min);
  const padded = 12 + ratio * 76;

  return invert ? 100 - padded : padded;
}
