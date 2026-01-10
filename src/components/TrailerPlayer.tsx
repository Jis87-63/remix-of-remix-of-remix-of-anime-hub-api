import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface TrailerPlayerProps {
  trailerId: string;
  site: string;
  thumbnail: string;
  animeTitle: string;
}

export function TrailerPlayer({ trailerId, site, thumbnail, animeTitle }: TrailerPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getEmbedUrl = () => {
    if (site === "youtube") {
      return `https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0`;
    }
    if (site === "dailymotion") {
      return `https://www.dailymotion.com/embed/video/${trailerId}?autoplay=1`;
    }
    return null;
  };

  const getThumbnailUrl = () => {
    if (thumbnail) return thumbnail;
    if (site === "youtube") {
      return `https://img.youtube.com/vi/${trailerId}/maxresdefault.jpg`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();
  const thumbnailUrl = getThumbnailUrl();

  if (!embedUrl) return null;

  return (
    <>
      <div 
        className="relative rounded-xl overflow-hidden cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <div className="aspect-video bg-secondary">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={`Trailer de ${animeTitle}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Trailer
            </div>
          )}
        </div>
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/50">
          <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center transform transition-transform group-hover:scale-110">
            <Play className="h-7 w-7 text-primary-foreground ml-1" />
          </div>
        </div>

        {/* Label */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm">
          <span className="text-sm font-medium text-white">Assistir Trailer</span>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
          <DialogTitle className="sr-only">Trailer de {animeTitle}</DialogTitle>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                title={`Trailer de ${animeTitle}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
