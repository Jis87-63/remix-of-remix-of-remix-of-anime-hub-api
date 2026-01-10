import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const ANILIST_API = 'https://graphql.anilist.co';

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

async function fetchAnilist(query: string, variables: Record<string, unknown> = {}) {
  console.log('Fetching from AniList with variables:', JSON.stringify(variables));
  
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
    console.error('AniList API error:', data.errors);
    throw new Error(data.errors[0]?.message || 'Error fetching data from AniList');
  }

  return data.data;
}

async function getTrendingAnime(page = 1, perPage = 20) {
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
  return { data: data.Page.media, pageInfo: data.Page.pageInfo };
}

async function getPopularAnime(page = 1, perPage = 20) {
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
  return { data: data.Page.media, pageInfo: data.Page.pageInfo };
}

async function getSeasonAnime(season: string, year: number, page = 1, perPage = 20) {
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
  return { data: data.Page.media, pageInfo: data.Page.pageInfo };
}

async function searchAnime(search: string, genre?: string, year?: number, status?: string, page = 1, perPage = 20) {
  const query = `
    ${MEDIA_FRAGMENT}
    query ($page: Int, $perPage: Int, $search: String, $genre: String, $year: Int, $status: MediaStatus) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(type: ANIME, search: $search, genre: $genre, seasonYear: $year, status: $status, isAdult: false) {
          ...MediaFields
        }
      }
    }
  `;
  const variables: Record<string, unknown> = { page, perPage };
  if (search) variables.search = search;
  if (genre) variables.genre = genre;
  if (year) variables.year = year;
  if (status) variables.status = status;
  
  const data = await fetchAnilist(query, variables);
  return { data: data.Page.media, pageInfo: data.Page.pageInfo };
}

async function getAnimeById(id: number) {
  const query = `
    ${MEDIA_FRAGMENT}
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        ...MediaFields
      }
    }
  `;
  const data = await fetchAnilist(query, { id });
  return { data: data.Media };
}

async function getAnimeByGenre(genre: string, page = 1, perPage = 20) {
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
  return { data: data.Page.media, pageInfo: data.Page.pageInfo };
}

async function getAnimeByStudio(studioName: string, page = 1, perPage = 20) {
  const query = `
    ${MEDIA_FRAGMENT}
    query ($page: Int, $perPage: Int, $search: String) {
      Studio(search: $search) {
        name
        media(page: $page, perPage: $perPage, sort: POPULARITY_DESC) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          nodes {
            ...MediaFields
          }
        }
      }
    }
  `;
  const data = await fetchAnilist(query, { page, perPage, search: studioName });
  return { 
    data: data.Studio?.media?.nodes || [], 
    pageInfo: data.Studio?.media?.pageInfo || { total: 0, currentPage: 1, lastPage: 1, hasNextPage: false, perPage },
    studio: data.Studio?.name 
  };
}

// deno-lint-ignore no-explicit-any
async function validateApiKey(apiKey: string, supabase: SupabaseClient<any>) {
  if (!apiKey || !apiKey.startsWith('ak_')) {
    return { valid: false as const, error: 'Invalid API key format' };
  }

  const keyPrefix = apiKey.substring(0, 10);
  
  const { data, error } = await supabase
    .from('api_keys')
    .select('id, is_active, user_id, requests_count')
    .eq('key_prefix', keyPrefix)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    console.log('API key validation failed:', error?.message);
    return { valid: false as const, error: 'Invalid or inactive API key' };
  }

  const keyData = data as { id: string; is_active: boolean; user_id: string; requests_count: number };

  // Update last used and request count
  await supabase
    .from('api_keys')
    .update({ 
      last_used_at: new Date().toISOString(),
      requests_count: (keyData.requests_count || 0) + 1
    })
    .eq('id', keyData.id);

  return { valid: true as const, userId: keyData.user_id };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    // Remove 'anime-api' from path if present
    const apiPath = pathParts[0] === 'anime-api' ? pathParts.slice(1) : pathParts;
    
    console.log('Request path:', url.pathname);
    console.log('API path parts:', apiPath);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Validate API key from Authorization header
    const authHeader = req.headers.get('Authorization');
    const apiKey = authHeader?.replace('Bearer ', '');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'API key required',
          message: 'Please provide your API key in the Authorization header as: Bearer ak_your_api_key'
        }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const validation = await validateApiKey(apiKey, supabase);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse query parameters
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');

    let result;

    // Route handling - expecting paths like /v1/animes/trending
    if (apiPath[0] === 'v1' && apiPath[1] === 'animes') {
      const endpoint = apiPath[2];
      const param = apiPath[3];

      switch (endpoint) {
        case 'trending':
          console.log('Fetching trending anime');
          result = await getTrendingAnime(page, limit);
          break;

        case 'popular':
          console.log('Fetching popular anime');
          result = await getPopularAnime(page, limit);
          break;

        case 'season':
          const season = url.searchParams.get('season') || getCurrentSeason();
          const year = parseInt(url.searchParams.get('year') || new Date().getFullYear().toString());
          console.log(`Fetching season anime: ${season} ${year}`);
          result = await getSeasonAnime(season, year, page, limit);
          break;

        case 'search':
          const q = url.searchParams.get('q') || '';
          const genre = url.searchParams.get('genre') || undefined;
          const searchYear = url.searchParams.get('year') ? parseInt(url.searchParams.get('year')!) : undefined;
          const status = url.searchParams.get('status') || undefined;
          console.log(`Searching anime: ${q}`);
          result = await searchAnime(q, genre, searchYear, status, page, limit);
          break;

        case 'genre':
          if (!param) {
            return new Response(
              JSON.stringify({ error: 'Genre parameter required' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
          console.log(`Fetching anime by genre: ${param}`);
          result = await getAnimeByGenre(decodeURIComponent(param), page, limit);
          break;

        case 'studio':
          if (!param) {
            return new Response(
              JSON.stringify({ error: 'Studio parameter required' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
          console.log(`Fetching anime by studio: ${param}`);
          result = await getAnimeByStudio(decodeURIComponent(param), page, limit);
          break;

        default:
          // Check if endpoint is a number (anime ID)
          const animeId = parseInt(endpoint);
          if (!isNaN(animeId)) {
            console.log(`Fetching anime by ID: ${animeId}`);
            result = await getAnimeById(animeId);
          } else {
            return new Response(
              JSON.stringify({ 
                error: 'Unknown endpoint',
                available_endpoints: [
                  '/v1/animes/trending',
                  '/v1/animes/popular',
                  '/v1/animes/season',
                  '/v1/animes/search',
                  '/v1/animes/genre/:genre',
                  '/v1/animes/studio/:studio',
                  '/v1/animes/:id'
                ]
              }),
              { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
      }
    } else {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid API path',
          message: 'API paths should start with /v1/animes/',
          available_endpoints: [
            '/v1/animes/trending',
            '/v1/animes/popular',
            '/v1/animes/season',
            '/v1/animes/search',
            '/v1/animes/genre/:genre',
            '/v1/animes/studio/:studio',
            '/v1/animes/:id'
          ]
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1;
  if (month >= 1 && month <= 3) return 'WINTER';
  if (month >= 4 && month <= 6) return 'SPRING';
  if (month >= 7 && month <= 9) return 'SUMMER';
  return 'FALL';
}
