import { VideoPlayer } from "@/components/VideoPlayer";

interface TrailerPlayerProps {
  trailerId: string;
  site: string;
  thumbnail: string;
  animeTitle: string;
}

export function TrailerPlayer({ trailerId, site, thumbnail, animeTitle }: TrailerPlayerProps) {
  const embedSite = site === "youtube" ? "youtube" : site === "dailymotion" ? "dailymotion" : undefined;
  
  if (!embedSite) return null;

  return (
    <VideoPlayer
      title={`Trailer de ${animeTitle}`}
      embedId={trailerId}
      embedSite={embedSite}
      thumbnail={thumbnail || (site === "youtube" ? `https://img.youtube.com/vi/${trailerId}/maxresdefault.jpg` : undefined)}
      showThumbnail={true}
    />
  );
}
