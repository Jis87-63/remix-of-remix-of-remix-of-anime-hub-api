const ANILIST_API = 'https://graphql.anilist.co';

export interface AiringSchedule {
  id: number;
  airingAt: number;
  episode: number;
  mediaId: number;
  media: {
    id: number;
    title: {
      romaji: string;
      english: string | null;
    };
    coverImage: {
      large: string;
      extraLarge: string;
    };
    bannerImage: string | null;
    format: string;
    episodes: number | null;
    genres: string[];
    averageScore: number | null;
    studios: {
      nodes: Array<{ name: string }>;
    };
  };
}

async function fetchAnilist(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(ANILIST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors[0]?.message || 'Error fetching data');
  }

  return data.data;
}

export async function getRecentlyAired(page = 1, perPage = 20): Promise<{ airingSchedules: AiringSchedule[] }> {
  const now = Math.floor(Date.now() / 1000);
  const yesterday = now - 86400; // 24 hours ago

  const query = `
    query ($page: Int, $perPage: Int, $airingAtGreater: Int, $airingAtLesser: Int) {
      Page(page: $page, perPage: $perPage) {
        airingSchedules(airingAt_greater: $airingAtGreater, airingAt_lesser: $airingAtLesser, sort: TIME_DESC) {
          id
          airingAt
          episode
          mediaId
          media {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
              extraLarge
            }
            bannerImage
            format
            episodes
            genres
            averageScore
            studios(isMain: true) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAnilist(query, { 
    page, 
    perPage, 
    airingAtGreater: yesterday,
    airingAtLesser: now
  });
  return { airingSchedules: data.Page.airingSchedules };
}

export async function getUpcomingEpisodes(page = 1, perPage = 20): Promise<{ airingSchedules: AiringSchedule[] }> {
  const now = Math.floor(Date.now() / 1000);
  const nextWeek = now + (7 * 86400); // 7 days from now

  const query = `
    query ($page: Int, $perPage: Int, $airingAtGreater: Int, $airingAtLesser: Int) {
      Page(page: $page, perPage: $perPage) {
        airingSchedules(airingAt_greater: $airingAtGreater, airingAt_lesser: $airingAtLesser, sort: TIME) {
          id
          airingAt
          episode
          mediaId
          media {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
              extraLarge
            }
            bannerImage
            format
            episodes
            genres
            averageScore
            studios(isMain: true) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAnilist(query, { 
    page, 
    perPage, 
    airingAtGreater: now,
    airingAtLesser: nextWeek
  });
  return { airingSchedules: data.Page.airingSchedules };
}

export function formatAiringTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  
  if (diff < 0) {
    const hours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
    if (hours < 24) {
      return `Há ${hours}h`;
    }
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours < 1) {
    return `Em ${minutes}min`;
  }
  if (hours < 24) {
    return `Em ${hours}h ${minutes}min`;
  }
  const days = Math.floor(hours / 24);
  return `Em ${days}d ${hours % 24}h`;
}
