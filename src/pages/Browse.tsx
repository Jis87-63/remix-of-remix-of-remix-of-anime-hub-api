import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrendingAnime, usePopularAnime, useSearchAnime, useAnimeByGenre } from "@/hooks/useAnime";

const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", 
  "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life",
  "Sports", "Supernatural", "Thriller"
];

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialGenre = searchParams.get("genre") || "";
  const sort = searchParams.get("sort") || "trending";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [showFilters, setShowFilters] = useState(false);

  const { data: trendingData, isLoading: trendingLoading } = useTrendingAnime(1, 24);
  const { data: popularData, isLoading: popularLoading } = usePopularAnime(1, 24);
  const { data: searchData, isLoading: searchLoading } = useSearchAnime(searchQuery, 1, 24);
  const { data: genreData, isLoading: genreLoading } = useAnimeByGenre(selectedGenre, 1, 24);

  const { animes, isLoading, title } = useMemo(() => {
    if (searchQuery) {
      return {
        animes: searchData?.media || [],
        isLoading: searchLoading,
        title: `Resultados para "${searchQuery}"`,
      };
    }
    if (selectedGenre) {
      return {
        animes: genreData?.media || [],
        isLoading: genreLoading,
        title: `Gênero: ${selectedGenre}`,
      };
    }
    if (sort === "popular") {
      return {
        animes: popularData?.media || [],
        isLoading: popularLoading,
        title: "Mais Populares",
      };
    }
    return {
      animes: trendingData?.media || [],
      isLoading: trendingLoading,
      title: "Em Alta",
    };
  }, [searchQuery, selectedGenre, sort, searchData, genreData, trendingData, popularData, searchLoading, genreLoading, trendingLoading, popularLoading]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedGenre("");
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleGenreSelect = (genre: string) => {
    setSearchQuery("");
    setSelectedGenre(genre);
    setSearchParams({ genre });
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar anime..."
                className="w-full h-9 pl-9 pr-4 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />
            </form>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-1" />
                Filtros
              </Button>
              
              {(searchQuery || selectedGenre) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-1" />
                  Limpar
                </Button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="mb-6 p-4 bg-card rounded-md border border-border">
              <p className="text-sm font-medium text-foreground mb-3">Gêneros</p>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreSelect(genre)}
                    className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                      selectedGenre === genre
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}

          <h1 className="text-xl font-semibold text-foreground mb-4">{title}</h1>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[3/4] rounded-md mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              ))}
            </div>
          ) : animes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {animes.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum resultado encontrado</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Browse;
