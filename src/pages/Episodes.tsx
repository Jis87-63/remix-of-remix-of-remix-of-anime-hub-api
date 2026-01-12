import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoPlayer } from "@/components/VideoPlayer";
import { 
  Play, 
  Clock, 
  Calendar, 
  Star, 
  Tv, 
  ChevronRight,
  Sparkles,
  Timer,
  RefreshCw
} from "lucide-react";
import { useRecentlyAired, useUpcomingEpisodes } from "@/hooks/useEpisodes";
import { formatAiringTime, AiringSchedule } from "@/lib/anilist-episodes";

function EpisodeCard({ schedule }: { schedule: AiringSchedule }) {
  const { media, episode, airingAt } = schedule;
  const title = media.title.english || media.title.romaji;
  const studio = media.studios.nodes[0]?.name || "Desconhecido";
  const isPast = airingAt * 1000 < Date.now();

  // Generate sample streaming sources (in real app, these would come from an API)
  const streamingSources = isPast ? [
    { provider: "Crunchyroll", url: `https://crunchyroll.com/watch/${media.id}`, quality: "1080p" },
    { provider: "Funimation", url: `https://funimation.com/shows/${media.id}`, quality: "1080p" },
    { provider: "Netflix", url: `https://netflix.com/title/${media.id}`, quality: "4K" },
  ] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
    >
      <div className="flex gap-4 p-4">
        {/* Cover Image */}
        <Link to={`/anime/${media.id}`} className="relative shrink-0 w-24 h-32 rounded-lg overflow-hidden">
          <img
            src={media.coverImage.large}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <Badge variant="secondary" className="text-xs bg-primary/90 text-primary-foreground">
              EP {episode}
            </Badge>
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <Link to={`/anime/${media.id}`}>
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {studio}
            </p>
            <div className="flex items-center gap-3 mt-2">
              {media.averageScore && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span>{media.averageScore}%</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Tv className="h-3 w-3" />
                <span>{media.format}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className={`flex items-center gap-1.5 text-sm ${isPast ? 'text-green-500' : 'text-primary'}`}>
              {isPast ? (
                <Clock className="h-4 w-4" />
              ) : (
                <Timer className="h-4 w-4" />
              )}
              <span className="font-medium">{formatAiringTime(airingAt)}</span>
            </div>
            {isPast ? (
              <VideoPlayer
                title={`${title} - Episódio ${episode}`}
                thumbnail={media.coverImage.large}
                streamingUrls={streamingSources}
                showThumbnail={false}
              >
                <Button size="sm" variant="default" className="gap-1 text-xs">
                  <Play className="h-3 w-3" />
                  Assistir
                </Button>
              </VideoPlayer>
            ) : (
              <Link to={`/anime/${media.id}`}>
                <Button size="sm" variant="ghost" className="gap-1 text-xs">
                  Ver detalhes
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EpisodeCardSkeleton() {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
      <Skeleton className="w-24 h-32 rounded-lg shrink-0" />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
          <Skeleton className="h-3 w-1/3 mt-2" />
        </div>
        <div className="flex items-center justify-between mt-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function Episodes() {
  const [activeTab, setActiveTab] = useState("recent");
  const { data: recentData, isLoading: recentLoading, refetch: refetchRecent } = useRecentlyAired(1, 30);
  const { data: upcomingData, isLoading: upcomingLoading, refetch: refetchUpcoming } = useUpcomingEpisodes(1, 30);

  const handleRefresh = () => {
    if (activeTab === "recent") {
      refetchRecent();
    } else {
      refetchUpcoming();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Episódios em tempo real</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="text-foreground">Novos </span>
              <span className="text-gradient">Episódios</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Acompanhe os episódios recém-lançados e os próximos a estrear da temporada.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="recent" className="gap-2">
                  <Play className="h-4 w-4" />
                  Recém Lançados
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Em Breve
                </TabsTrigger>
              </TabsList>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </Button>
            </div>

            <TabsContent value="recent" className="mt-0">
              {recentLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <EpisodeCardSkeleton key={i} />
                  ))}
                </div>
              ) : recentData?.airingSchedules && recentData.airingSchedules.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentData.airingSchedules.map((schedule) => (
                    <EpisodeCard key={schedule.id} schedule={schedule} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhum episódio recente
                  </h3>
                  <p className="text-muted-foreground">
                    Não há episódios lançados nas últimas 24 horas.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              {upcomingLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <EpisodeCardSkeleton key={i} />
                  ))}
                </div>
              ) : upcomingData?.airingSchedules && upcomingData.airingSchedules.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingData.airingSchedules.map((schedule) => (
                    <EpisodeCard key={schedule.id} schedule={schedule} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhum episódio próximo
                  </h3>
                  <p className="text-muted-foreground">
                    Não há episódios programados para os próximos 7 dias.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
