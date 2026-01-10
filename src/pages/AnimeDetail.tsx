import { useParams } from "react-router-dom";
import { Calendar, Star, Tv, Clock, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { WatchlistButton } from "@/components/WatchlistButton";
import { CountdownTimer } from "@/components/CountdownTimer";
import { TrailerPlayer } from "@/components/TrailerPlayer";
import { useAnimeById } from "@/hooks/useAnime";
import { getStatusLabel, getFormatLabel } from "@/lib/anilist";

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: anime, isLoading } = useAnimeById(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-14">
          <Skeleton className="h-64 md:h-80 w-full" />
          <div className="container py-8">
            <div className="flex flex-col md:flex-row gap-8">
              <Skeleton className="w-48 md:w-56 aspect-[3/4] rounded-xl shrink-0 mx-auto md:mx-0" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Anime não encontrado
            </h1>
            <p className="text-muted-foreground">
              O anime que você está procurando não existe ou foi removido.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  const title = anime.title.english || anime.title.romaji;
  const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;
  const studio = anime.studios.nodes[0]?.name;

  const cleanDescription = anime.description
    ?.replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\n{3,}/g, '\n\n') || 'Sem descrição disponível.';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Banner Section */}
      <div className="pt-14 relative">
        <div className="h-64 md:h-80 relative overflow-hidden">
          {anime.bannerImage ? (
            <img
              src={anime.bannerImage}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div 
              className="w-full h-full"
              style={{ 
                backgroundColor: anime.coverImage.color || 'hsl(var(--secondary))',
                opacity: 0.3
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>
      </div>

      {/* Content Section */}
      <div className="container relative -mt-48 md:-mt-56 z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-6 md:gap-8"
        >
          {/* Left Column - Cover & Actions */}
          <div className="shrink-0 mx-auto md:mx-0 w-48 md:w-56">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <img
                src={anime.coverImage.extraLarge || anime.coverImage.large}
                alt={title}
                className="w-full aspect-[3/4] object-cover rounded-xl shadow-2xl ring-1 ring-white/10"
              />
              {/* Play overlay - aesthetic only */}
              <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary-foreground ml-1" />
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 space-y-3"
            >
              <WatchlistButton
                animeId={anime.id}
                animeTitle={title}
                animeCoverImage={anime.coverImage.large}
              />
              
              {/* Next Episode Countdown */}
              {anime.nextAiringEpisode && (
                <CountdownTimer
                  targetTimestamp={anime.nextAiringEpisode.airingAt}
                  episode={anime.nextAiringEpisode.episode}
                  animeTitle={title}
                />
              )}
            </motion.div>
          </div>

          {/* Right Column - Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1 pt-4 md:pt-32"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
              {title}
            </h1>
            
            {anime.title.native && (
              <p className="text-base text-muted-foreground mb-4">
                {anime.title.native}
              </p>
            )}

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {score && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold">{score}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Tv className="h-4 w-4" />
                <span>{getFormatLabel(anime.format)}</span>
              </div>

              {anime.episodes && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{anime.episodes} episódios</span>
                </div>
              )}

              {anime.seasonYear && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{anime.season} {anime.seasonYear}</span>
                </div>
              )}
            </div>

            {/* Status & Studio */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                anime.status === 'RELEASING' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-secondary text-muted-foreground'
              }`}>
                {getStatusLabel(anime.status)}
              </span>
              
              {studio && (
                <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                  {studio}
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-8">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 text-muted-foreground rounded-lg transition-colors cursor-default"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Trailer */}
            {anime.trailer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-8"
              >
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  Trailer
                </h2>
                <TrailerPlayer
                  trailerId={anime.trailer.id}
                  site={anime.trailer.site}
                  thumbnail={anime.trailer.thumbnail}
                  animeTitle={title}
                />
              </motion.div>
            )}

            {/* Synopsis */}
            <div className="bg-card/50 rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Sinopse
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {cleanDescription}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AnimeDetail;
