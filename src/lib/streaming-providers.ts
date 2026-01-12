// Streaming provider configurations
export interface StreamingProvider {
  id: string;
  name: string;
  logo: string;
  color: string;
  baseUrl: string;
  searchUrl: (title: string) => string;
  available: boolean;
  quality: string[];
  subscription: boolean;
  regions?: string[];
}

export const streamingProviders: StreamingProvider[] = [
  {
    id: "crunchyroll",
    name: "Crunchyroll",
    logo: "🍊",
    color: "#F47521",
    baseUrl: "https://www.crunchyroll.com",
    searchUrl: (title) => `https://www.crunchyroll.com/search?q=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p", "480p"],
    subscription: true,
    regions: ["Global"],
  },
  {
    id: "funimation",
    name: "Funimation",
    logo: "🟣",
    color: "#5B0BB5",
    baseUrl: "https://www.funimation.com",
    searchUrl: (title) => `https://www.funimation.com/search/?q=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p"],
    subscription: true,
    regions: ["US", "UK", "AU"],
  },
  {
    id: "netflix",
    name: "Netflix",
    logo: "🔴",
    color: "#E50914",
    baseUrl: "https://www.netflix.com",
    searchUrl: (title) => `https://www.netflix.com/search?q=${encodeURIComponent(title)}`,
    available: true,
    quality: ["4K", "1080p", "720p"],
    subscription: true,
    regions: ["Global"],
  },
  {
    id: "amazon",
    name: "Prime Video",
    logo: "📦",
    color: "#00A8E1",
    baseUrl: "https://www.primevideo.com",
    searchUrl: (title) => `https://www.primevideo.com/search/ref=atv_sr_sug_1?phrase=${encodeURIComponent(title)}`,
    available: true,
    quality: ["4K", "1080p", "720p"],
    subscription: true,
    regions: ["Global"],
  },
  {
    id: "hulu",
    name: "Hulu",
    logo: "💚",
    color: "#1CE783",
    baseUrl: "https://www.hulu.com",
    searchUrl: (title) => `https://www.hulu.com/search?q=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p"],
    subscription: true,
    regions: ["US"],
  },
  {
    id: "hidive",
    name: "HIDIVE",
    logo: "🔵",
    color: "#00BAFF",
    baseUrl: "https://www.hidive.com",
    searchUrl: (title) => `https://www.hidive.com/search?q=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p"],
    subscription: true,
    regions: ["Global"],
  },
  // Free streaming sources
  {
    id: "aniwatch",
    name: "AniWatch",
    logo: "👁️",
    color: "#FF6B6B",
    baseUrl: "https://aniwatch.to",
    searchUrl: (title) => `https://aniwatch.to/search?keyword=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p", "480p"],
    subscription: false,
    regions: ["Global"],
  },
  {
    id: "gogoanime",
    name: "GoGoAnime",
    logo: "🎭",
    color: "#FFD700",
    baseUrl: "https://gogoanime3.co",
    searchUrl: (title) => `https://gogoanime3.co/search.html?keyword=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p", "480p"],
    subscription: false,
    regions: ["Global"],
  },
  {
    id: "9anime",
    name: "9Anime",
    logo: "9️⃣",
    color: "#8E44AD",
    baseUrl: "https://9anime.to",
    searchUrl: (title) => `https://9anime.to/search?keyword=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p", "480p"],
    subscription: false,
    regions: ["Global"],
  },
  {
    id: "zoro",
    name: "Zoro.to",
    logo: "⚔️",
    color: "#F5C518",
    baseUrl: "https://zoro.to",
    searchUrl: (title) => `https://zoro.to/search?keyword=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p", "480p"],
    subscription: false,
    regions: ["Global"],
  },
  {
    id: "animixplay",
    name: "AniMixPlay",
    logo: "🎵",
    color: "#00D9FF",
    baseUrl: "https://animixplay.to",
    searchUrl: (title) => `https://animixplay.to/?q=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p"],
    subscription: false,
    regions: ["Global"],
  },
  // Brazilian/Portuguese sources
  {
    id: "animesonline",
    name: "Animes Online",
    logo: "🇧🇷",
    color: "#009C3B",
    baseUrl: "https://animesonlinecc.to",
    searchUrl: (title) => `https://animesonlinecc.to/?s=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p"],
    subscription: false,
    regions: ["BR", "PT"],
  },
  {
    id: "animeshouse",
    name: "Animes House",
    logo: "🏠",
    color: "#4A90D9",
    baseUrl: "https://animeshouse.net",
    searchUrl: (title) => `https://animeshouse.net/?s=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p"],
    subscription: false,
    regions: ["BR"],
  },
  {
    id: "betteranime",
    name: "Better Anime",
    logo: "✨",
    color: "#FF4081",
    baseUrl: "https://betteranime.net",
    searchUrl: (title) => `https://betteranime.net/pesquisa?titulo=${encodeURIComponent(title)}`,
    available: true,
    quality: ["1080p", "720p"],
    subscription: false,
    regions: ["BR"],
  },
];

export function getStreamingLinksForAnime(animeTitle: string, animeId?: number) {
  return streamingProviders.map((provider) => ({
    provider: provider.name,
    providerId: provider.id,
    url: provider.searchUrl(animeTitle),
    logo: provider.logo,
    color: provider.color,
    quality: provider.quality[0],
    subscription: provider.subscription,
    available: provider.available,
  }));
}

export function getProviderById(id: string): StreamingProvider | undefined {
  return streamingProviders.find((p) => p.id === id);
}

export function getSubscriptionProviders(): StreamingProvider[] {
  return streamingProviders.filter((p) => p.subscription);
}

export function getFreeProviders(): StreamingProvider[] {
  return streamingProviders.filter((p) => !p.subscription);
}

export function getProvidersByRegion(region: string): StreamingProvider[] {
  return streamingProviders.filter(
    (p) => !p.regions || p.regions.includes(region) || p.regions.includes("Global")
  );
}
