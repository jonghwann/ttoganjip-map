"use client";

import { useMemo, useState } from "react";
import { KakaoMap } from "@/components/kakao-map";
import type { RestaurantWithEpisode } from "@/types/domain";

type RestaurantExplorerProps = {
  restaurants: RestaurantWithEpisode[];
};

export function RestaurantExplorer({ restaurants }: RestaurantExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(restaurants[0]?.id ?? "");

  const areas = useMemo(
    () => [
      "전체",
      ...Array.from(new Set(restaurants.map((restaurant) => restaurant.episode.area))),
    ],
    [restaurants],
  );
  const categories = useMemo(
    () => ["전체", ...Array.from(new Set(restaurants.map((restaurant) => restaurant.category)))],
    [restaurants],
  );

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      !normalizedQuery ||
      [restaurant.name, restaurant.address, restaurant.mainMenu, restaurant.episode.title]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    const matchesArea = selectedArea === "전체" || restaurant.episode.area === selectedArea;
    const matchesCategory = selectedCategory === "전체" || restaurant.category === selectedCategory;

    return matchesQuery && matchesArea && matchesCategory;
  });

  const visibleRestaurants = filteredRestaurants.length > 0 ? filteredRestaurants : restaurants;
  const selectedRestaurant =
    visibleRestaurants.find((restaurant) => restaurant.id === selectedRestaurantId) ??
    visibleRestaurants[0];

  return (
    <div className="grid flex-1 gap-5 py-5 lg:grid-cols-[390px_1fr]">
      <aside className="flex min-h-0 flex-col border border-[#211c18]/10 bg-white">
        <div className="border-[#211c18]/10 border-b p-4">
          <p className="font-semibold text-[#b33b2e] text-sm">또간집 지도 MVP</p>
          <h1 className="mt-1 text-3xl font-bold">맛집 탐색</h1>
          <p className="mt-3 text-[#6f6459] text-sm leading-6">
            샘플 데이터는 실제 방송 데이터 검증 전 단계입니다. Supabase 연결 후 seed를 실제 데이터로
            교체하면 같은 화면에서 바로 표시됩니다.
          </p>
        </div>

        <div className="grid gap-3 border-[#211c18]/10 border-b p-4">
          <label className="grid gap-2 text-sm">
            <span className="font-medium">검색</span>
            <input
              className="h-11 border border-[#211c18]/15 px-3 outline-none transition-colors focus:border-[#b33b2e]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="식당명, 메뉴, 회차 검색"
              type="search"
              value={query}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-2 text-sm">
              <span className="font-medium">지역</span>
              <select
                className="h-11 border border-[#211c18]/15 bg-white px-3 outline-none focus:border-[#b33b2e]"
                onChange={(event) => setSelectedArea(event.target.value)}
                value={selectedArea}
              >
                {areas.map((area) => (
                  <option key={area}>{area}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="font-medium">음식</span>
              <select
                className="h-11 border border-[#211c18]/15 bg-white px-3 outline-none focus:border-[#b33b2e]"
                onChange={(event) => setSelectedCategory(event.target.value)}
                value={selectedCategory}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {filteredRestaurants.length === 0 ? (
            <div className="p-4 text-[#6f6459] text-sm">검색 결과가 없습니다.</div>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <button
                className={`grid w-full gap-2 border-[#211c18]/10 border-b p-4 text-left transition-colors hover:bg-[#f7f3ec] ${
                  restaurant.id === selectedRestaurant?.id ? "bg-[#f7f3ec]" : "bg-white"
                }`}
                key={restaurant.id}
                onClick={() => setSelectedRestaurantId(restaurant.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{restaurant.name}</p>
                    <p className="mt-1 text-[#6f6459] text-sm">{restaurant.roadAddress}</p>
                  </div>
                  <span className="shrink-0 border border-[#b33b2e]/25 px-2 py-1 text-[#b33b2e] text-xs">
                    {restaurant.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-[#211c18]/5 px-2 py-1">{restaurant.mainMenu}</span>
                  <span className="bg-[#211c18]/5 px-2 py-1">{restaurant.episode.episodeNo}화</span>
                  <span className="bg-[#211c18]/5 px-2 py-1">
                    {restaurant.appearance.selectedLabel}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      <section className="grid min-h-[720px] grid-rows-[1fr_auto] overflow-hidden border border-[#211c18]/10 bg-white">
        <KakaoMap
          onSelectRestaurant={setSelectedRestaurantId}
          restaurants={visibleRestaurants}
          selectedRestaurantId={selectedRestaurant?.id ?? ""}
        />

        {selectedRestaurant ? (
          <div className="grid gap-4 border-[#211c18]/10 border-t p-5 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold">{selectedRestaurant.name}</h2>
                <span className="bg-[#f7f3ec] px-2 py-1 text-[#6f6459] text-xs">
                  {selectedRestaurant.status}
                </span>
              </div>
              <p className="mt-2 text-[#6f6459]">{selectedRestaurant.roadAddress}</p>
              <p className="mt-3 text-sm">
                {selectedRestaurant.episode.episodeNo}화 · {selectedRestaurant.episode.title} ·{" "}
                {selectedRestaurant.mainMenu}
              </p>
              <p className="mt-2 text-[#6f6459] text-sm">{selectedRestaurant.appearance.note}</p>
            </div>
            <div className="flex items-end gap-2">
              <a
                className="inline-flex h-11 items-center border border-[#211c18]/15 px-4 font-medium text-sm hover:bg-[#f7f3ec]"
                href={selectedRestaurant.episode.youtubeUrl}
                rel="noreferrer"
                target="_blank"
              >
                회차 보기
              </a>
              <a
                className="inline-flex h-11 items-center bg-[#211c18] px-4 font-medium text-sm text-white hover:bg-[#3a312a]"
                href={selectedRestaurant.mapUrl}
                rel="noreferrer"
                target="_blank"
              >
                지도 링크
              </a>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
