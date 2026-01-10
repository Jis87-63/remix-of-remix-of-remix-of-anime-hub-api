import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Media } from "@/lib/anilist";
import { getStatusLabel } from "@/lib/anilist";

interface AnimeCardProps {
  anime: Media;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  const title = anime.title.english || anime.title.romaji;
  const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;

  return (
    <Link to={`/anime/${anime.id}`} className="group block">
      <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-secondary mb-2">
        <img
          src={anime.coverImage.large}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {score && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-background/90 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-medium text-foreground">{score}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
        {anime.episodes && <span>{anime.episodes} eps</span>}
        {anime.episodes && <span>•</span>}
        <span>{getStatusLabel(anime.status)}</span>
      </div>
    </Link>
  );
};
