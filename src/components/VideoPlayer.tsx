import { useState, useRef, ReactNode } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  title: string;
  thumbnail?: string;
  // For embedded videos (YouTube, Dailymotion, etc.)
  embedId?: string;
  embedSite?: "youtube" | "dailymotion" | "vimeo";
  // For direct video URLs
  videoUrl?: string;
  // For external streaming sources
  streamingUrls?: {
    provider: string;
    url: string;
    quality?: string;
  }[];
  autoPlay?: boolean;
  showThumbnail?: boolean;
  // Custom trigger element
  children?: ReactNode;
}

export function VideoPlayer({
  title,
  thumbnail,
  embedId,
  embedSite,
  videoUrl,
  streamingUrls,
  autoPlay = false,
  showThumbnail = true,
  children,
}: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const getEmbedUrl = () => {
    if (!embedId || !embedSite) return null;
    
    switch (embedSite) {
      case "youtube":
        return `https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0&modestbranding=1`;
      case "dailymotion":
        return `https://www.dailymotion.com/embed/video/${embedId}?autoplay=1`;
      case "vimeo":
        return `https://player.vimeo.com/video/${embedId}?autoplay=1`;
      default:
        return null;
    }
  };

  const getThumbnailUrl = () => {
    if (thumbnail) return thumbnail;
    if (embedSite === "youtube" && embedId) {
      return `https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`;
    }
    return null;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const handleFullscreen = () => {
    const container = document.getElementById("video-container");
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const embedUrl = getEmbedUrl();
  const thumbnailUrl = getThumbnailUrl();

  // Render thumbnail preview
  const renderThumbnail = () => (
    <div 
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      onClick={() => setIsOpen(true)}
    >
      <div className="aspect-video bg-secondary">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-secondary to-secondary/50">
            <Play className="h-12 w-12" />
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
        <span className="text-sm font-medium text-white">Assistir</span>
      </div>
    </div>
  );

  // Render embedded player (YouTube, Dailymotion, etc.)
  const renderEmbedPlayer = () => (
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
          src={embedUrl || ""}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );

  // Render native video player
  const renderNativePlayer = () => (
    <div 
      id="video-container"
      className="relative bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-20 h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handlePlayPause}
      />
      
      {/* Custom Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar */}
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleProgressClick}
          className="mb-3"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <div className="flex items-center gap-2 group">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <div className="w-0 group-hover:w-20 overflow-hidden transition-all duration-200">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20"
            onClick={handleFullscreen}
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Render external streaming sources list
  const renderStreamingSources = () => (
    <div className="relative p-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <h3 className="text-lg font-semibold text-white mb-4">Fontes de Streaming</h3>
      <div className="space-y-2">
        {streamingUrls?.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div>
              <span className="font-medium text-foreground">{source.provider}</span>
              {source.quality && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded bg-primary/20 text-primary">
                  {source.quality}
                </span>
              )}
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        ))}
      </div>
    </div>
  );

  // Determine which player to render
  const renderPlayer = () => {
    if (embedUrl) {
      return renderEmbedPlayer();
    } else if (videoUrl) {
      return renderNativePlayer();
    } else if (streamingUrls && streamingUrls.length > 0) {
      return renderStreamingSources();
    }
    return null;
  };

  if (!embedId && !videoUrl && (!streamingUrls || streamingUrls.length === 0)) {
    return children ? <>{children}</> : null;
  }

  // If children provided, use as custom trigger
  if (children) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <span onClick={() => setIsOpen(true)}>{children}</span>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          {renderPlayer()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      {showThumbnail && renderThumbnail()}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          {renderPlayer()}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Simplified component for just trailers
export function EpisodePlayer({
  episodeNumber,
  animeTitle,
  thumbnail,
  streamingUrls,
}: {
  episodeNumber: number;
  animeTitle: string;
  thumbnail?: string;
  streamingUrls?: { provider: string; url: string; quality?: string }[];
}) {
  return (
    <VideoPlayer
      title={`${animeTitle} - Episódio ${episodeNumber}`}
      thumbnail={thumbnail}
      streamingUrls={streamingUrls}
      showThumbnail={true}
    />
  );
}
