export type RestaurantStatus = "open" | "moved" | "closed" | "unknown" | "needs_verification";

export type CandidateStatus = "pending" | "approved" | "rejected";

export type Episode = {
  id: string;
  episodeNo: number;
  title: string;
  area: string;
  youtubeUrl: string;
  publishedAt: string;
};

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  roadAddress: string;
  lat: number;
  lng: number;
  category: string;
  mainMenu: string;
  mapUrl: string;
  status: RestaurantStatus;
};

export type Appearance = {
  id: string;
  episodeId: string;
  restaurantId: string;
  selectedLabel: string;
  note: string;
};

export type RestaurantWithEpisode = Restaurant & {
  episode: Episode;
  appearance: Appearance;
};

export type RestaurantCandidate = {
  id: string;
  episodeId: string;
  extractedName: string;
  extractedArea: string;
  extractedMenu: string;
  matchedPlaceName: string;
  matchedAddress: string;
  lat: number;
  lng: number;
  mapUrl: string;
  confidence: number;
  status: CandidateStatus;
  rawSource: string;
  episode: Episode;
};
