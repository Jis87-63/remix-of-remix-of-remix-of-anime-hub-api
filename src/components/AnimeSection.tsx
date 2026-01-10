import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimeCard } from "./AnimeCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Media } from "@/lib/anilist";

interface AnimeSectionProps {
  title: string;
  animes: Media[];
  isLoading?: boolean;
  viewAllLink?: string;
}

export const AnimeSection = ({ title, animes, isLoading, viewAllLink }: AnimeSectionProps) => {
  return (
    <section className="py-6">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[3/4] rounded-md mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
