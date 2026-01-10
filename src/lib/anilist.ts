const ANILIST_API = 'https://graphql.anilist.co';

export interface Media {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string | null;
  };
  coverImage: {
    large: string;
    extraLarge: string;
    color: string | null;
  };
  bannerImage: string | null;
  description: string | null;
  episodes: number | null;
  status: string;
  format: string;
  genres: string[];
  averageScore: number | null;
  popularity: number;
  season: string | null;
  seasonYear: number | null;
  startDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  nextAiringEpisode: {
    airingAt: number;
    episode: number;
    timeUntilAiring: number;
  } | null;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  } | null;
  studios: {
    nodes: Array<{ name: string }>;
  };
}

export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
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

const MEDIA_FRAGMENT = `
  fragment MediaFields on Media {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      large
      extraLarge
      color
    }
    bannerImage
    description(asHtml: false)
    episodes
    status
    format
    genres
    averageScore
    popularity
    season
    seasonYear
    startDate {
      year
      month
      day
    }
    nextAiringEpisode {
      airingAt
      episode
      timeUntilAiring
    }
    trailer {
      id
      site
      thumbnail
    }
    studios(isMain: true) {
      nodes {
        name
      }
    }
  }
`;

export async function getTrendingAnime(page = 1, perPage = 20): Promise<{ media: Media[]; pageInfo: PageInfo }> {
  const query = `
    ${MEDIA_FRAGMENT}
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
          ...MediaFields
        }
      }
    }
  `;

  const data = await fetchAnilist(query, { page, perPage });
  return { media: data.Page.media, pageInfo: data.Page.pageInfo };
}

export async function getPopularAnime(page = 1, perPage = 20): Promise<{ media: Media[]; pageInfo: PageInfo }> {
  const query = `
    ${MEDIA_FRAGMENT}
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
          ...MediaFields
        }
      }
    }
  `;

  const data = await fetchAnilist(query, { page, perPage });
  return { media: data.Page.media, pageInfo: data.Page.pageInfo };
}

export async function getSeasonAnime(season: string, year: number, page = 1, perPage = 20): Promise<{ media: Media[]; pageInfo: PageInfo }> {
  const query = `
    ${MEDIA_FRAGMENT}
    query ($page: Int, $perPage: Int, $season: MediaSeason, $year: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(type: ANIME, season: $season, seasonYear: $year, sort: POPULARITY_DESC, isAdult: false) {
          ...MediaFields
        }
      }
    }
  `;

  const data = await fetchAnilist(query, { page, perPage, season, year });
  return { media: data.Page.media, pageInfo: data.Page.pageInfo };
}

export async function searchAnime(search: string, page = 1, perPage = 20): Promise<{ media: Media[]; pageInfo: PageInfo }> {
  const query = `
    ${MEDIA_FRAGMENT}
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(type: ANIME, search: $search, isAdult: false) {
          ...MediaFields
        }
      }
    }
  `;

  const data = await fetchAnilist(query, { page, perPage, search });
  return { media: data.Page.media, pageInfo: data.Page.pageInfo };
}

export async function getAnimeByGenre(genre: string, page = 1, perPage = 20): Promise<{ media: Media[]; pageInfo: PageInfo }> {
  const query = `
    ${MEDIA_FRAGMENT}
    query ($page: Int, $perPage: Int, $genre: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(type: ANIME, genre: $genre, sort: POPULARITY_DESC, isAdult: false) {
          ...MediaFields
        }
      }
    }
  `;

  const data = await fetchAnilist(query, { page, perPage, genre });
  return { media: data.Page.media, pageInfo: data.Page.pageInfo };
}

export async function getAnimeById(id: number): Promise<Media> {
  const query = `
    ${MEDIA_FRAGMENT}
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        ...MediaFields
      }
    }
  `;

  const data = await fetchAnilist(query, { id });
  return data.Media;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    FINISHED: 'Finalizado',
    RELEASING: 'Em exibição',
    NOT_YET_RELEASED: 'Não lançado',
    CANCELLED: 'Cancelado',
    HIATUS: 'Hiato',
  };
  return labels[status] || status;
}

export function getFormatLabel(format: string): string {
  const labels: Record<string, string> = {
    TV: 'TV',
    TV_SHORT: 'TV Curta',
    MOVIE: 'Filme',
    SPECIAL: 'Especial',
    OVA: 'OVA',
    ONA: 'ONA',
    MUSIC: 'Música',
  };
  return labels[format] || format;
}
