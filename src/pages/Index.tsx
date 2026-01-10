import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AnimeSection } from "@/components/AnimeSection";
import { Footer } from "@/components/Footer";
import { useTrendingAnime, usePopularAnime, useSeasonAnime, getCurrentSeason } from "@/hooks/useAnime";

const Index = () => {
  const { data: trendingData, isLoading: trendingLoading } = useTrendingAnime(1, 6);
  const { data: popularData, isLoading: popularLoading } = usePopularAnime(1, 6);
  
  const { season, year } = getCurrentSeason();
  const { data: seasonData, isLoading: seasonLoading } = useSeasonAnime(season, year, 1, 6);

  const seasonLabels: Record<string, string> = {
    WINTER: 'Inverno',
    SPRING: 'Primavera',
    SUMMER: 'Verão',
    FALL: 'Outono',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      <AnimeSection
        title="Em Alta"
        animes={trendingData?.media || []}
        isLoading={trendingLoading}
        viewAllLink="/browse?sort=trending"
      />
      
      <AnimeSection
        title={`Temporada ${seasonLabels[season]} ${year}`}
        animes={seasonData?.media || []}
        isLoading={seasonLoading}
        viewAllLink={`/browse?season=${season}&year=${year}`}
      />
      
      <AnimeSection
        title="Mais Populares"
        animes={popularData?.media || []}
        isLoading={popularLoading}
        viewAllLink="/browse?sort=popular"
      />
      
      <Footer />
    </div>
  );
};

export default Index;
