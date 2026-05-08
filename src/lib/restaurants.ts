import { sampleCandidates, sampleRestaurants } from "@/lib/data/sample-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { RestaurantCandidate, RestaurantWithEpisode } from "@/types/domain";

type AppearanceRow = {
  id: string;
  selected_label: string;
  note: string | null;
  episodes: {
    id: string;
    episode_no: number;
    title: string;
    area: string;
    youtube_url: string;
    published_at: string;
  } | null;
  restaurants: {
    id: string;
    name: string;
    address: string;
    road_address: string;
    lat: number;
    lng: number;
    category: string;
    main_menu: string;
    map_url: string;
    status: RestaurantWithEpisode["status"];
  } | null;
};

type CandidateRow = {
  id: string;
  episode_id: string;
  extracted_name: string;
  extracted_area: string;
  extracted_menu: string;
  matched_place_name: string;
  matched_address: string;
  lat: number;
  lng: number;
  map_url: string;
  confidence: number;
  status: RestaurantCandidate["status"];
  raw_source: string;
  episodes: {
    id: string;
    episode_no: number;
    title: string;
    area: string;
    youtube_url: string;
    published_at: string;
  } | null;
};

export async function getRestaurants(): Promise<RestaurantWithEpisode[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return sampleRestaurants;
  }

  const { data, error } = await supabase
    .from("appearances")
    .select(
      `
        id,
        selected_label,
        note,
        episodes:episode_id (
          id,
          episode_no,
          title,
          area,
          youtube_url,
          published_at
        ),
        restaurants:restaurant_id (
          id,
          name,
          address,
          road_address,
          lat,
          lng,
          category,
          main_menu,
          map_url,
          status
        )
      `,
    )
    .order("id", { ascending: true })
    .returns<AppearanceRow[]>();

  if (error || !data?.length) {
    return sampleRestaurants;
  }

  return data.flatMap((row) => {
    if (!row.restaurants || !row.episodes) {
      return [];
    }

    return {
      id: row.restaurants.id,
      name: row.restaurants.name,
      address: row.restaurants.address,
      roadAddress: row.restaurants.road_address,
      lat: row.restaurants.lat,
      lng: row.restaurants.lng,
      category: row.restaurants.category,
      mainMenu: row.restaurants.main_menu,
      mapUrl: row.restaurants.map_url,
      status: row.restaurants.status,
      episode: {
        id: row.episodes.id,
        episodeNo: row.episodes.episode_no,
        title: row.episodes.title,
        area: row.episodes.area,
        youtubeUrl: row.episodes.youtube_url,
        publishedAt: row.episodes.published_at,
      },
      appearance: {
        id: row.id,
        episodeId: row.episodes.id,
        restaurantId: row.restaurants.id,
        selectedLabel: row.selected_label,
        note: row.note ?? "",
      },
    };
  });
}

export async function getRestaurantCandidates(): Promise<RestaurantCandidate[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return sampleCandidates;
  }

  const { data, error } = await supabase
    .from("restaurant_candidates")
    .select(
      `
        id,
        episode_id,
        extracted_name,
        extracted_area,
        extracted_menu,
        matched_place_name,
        matched_address,
        lat,
        lng,
        map_url,
        confidence,
        status,
        raw_source,
        episodes:episode_id (
          id,
          episode_no,
          title,
          area,
          youtube_url,
          published_at
        )
      `,
    )
    .order("confidence", { ascending: false })
    .returns<CandidateRow[]>();

  if (error || !data?.length) {
    return sampleCandidates;
  }

  return data.flatMap((row) => {
    if (!row.episodes) {
      return [];
    }

    return {
      id: row.id,
      episodeId: row.episode_id,
      extractedName: row.extracted_name,
      extractedArea: row.extracted_area,
      extractedMenu: row.extracted_menu,
      matchedPlaceName: row.matched_place_name,
      matchedAddress: row.matched_address,
      lat: row.lat,
      lng: row.lng,
      mapUrl: row.map_url,
      confidence: row.confidence,
      status: row.status,
      rawSource: row.raw_source,
      episode: {
        id: row.episodes.id,
        episodeNo: row.episodes.episode_no,
        title: row.episodes.title,
        area: row.episodes.area,
        youtubeUrl: row.episodes.youtube_url,
        publishedAt: row.episodes.published_at,
      },
    };
  });
}
