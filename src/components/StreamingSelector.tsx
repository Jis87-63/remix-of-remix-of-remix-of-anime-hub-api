import { useState } from "react";
import { ExternalLink, Play, Crown, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  streamingProviders, 
  getStreamingLinksForAnime, 
  getSubscriptionProviders, 
  getFreeProviders 
} from "@/lib/streaming-providers";

interface StreamingSelectorProps {
  animeTitle: string;
  animeId?: number;
  episodeNumber?: number;
  thumbnail?: string;
  children?: React.ReactNode;
}

export function StreamingSelector({ 
  animeTitle, 
  animeId, 
  episodeNumber,
  thumbnail,
  children 
}: StreamingSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const streamingLinks = getStreamingLinksForAnime(animeTitle, animeId);
  const subscriptionProviders = getSubscriptionProviders();
  const freeProviders = getFreeProviders();

  const renderProviderCard = (link: ReturnType<typeof getStreamingLinksForAnime>[0]) => (
    <a
      key={link.providerId}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/30 transition-all group"
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ backgroundColor: `${link.color}20` }}
      >
        {link.logo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{link.provider}</span>
          {link.subscription && (
            <Badge variant="secondary" className="text-xs bg-yellow-500/10 text-yellow-600">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">Qualidade: {link.quality}</span>
        </div>
      </div>
      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </a>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="default" size="sm" className="gap-2">
            <Play className="h-4 w-4" />
            Assistir
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        <DialogTitle className="text-xl font-bold">
          {episodeNumber ? (
            <span>
              Assistir {animeTitle} - EP {episodeNumber}
            </span>
          ) : (
            <span>Assistir {animeTitle}</span>
          )}
        </DialogTitle>
        
        {thumbnail && (
          <div className="relative h-32 -mx-6 -mt-2 mb-4 overflow-hidden">
            <img 
              src={thumbnail} 
              alt={animeTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}

        <Tabs defaultValue="free" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="free" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Gratuitos ({freeProviders.length})
            </TabsTrigger>
            <TabsTrigger value="premium" className="gap-2">
              <Crown className="h-4 w-4" />
              Premium ({subscriptionProviders.length})
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-y-auto">
            <TabsContent value="free" className="mt-0 space-y-2">
              <div className="flex items-center gap-2 mb-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <Globe className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-600">
                  Fontes gratuitas - sem necessidade de assinatura
                </span>
              </div>
              {streamingLinks
                .filter((l) => !l.subscription)
                .map(renderProviderCard)}
            </TabsContent>
            
            <TabsContent value="premium" className="mt-0 space-y-2">
              <div className="flex items-center gap-2 mb-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <Crown className="h-5 w-5 text-yellow-600" />
                <span className="text-sm text-yellow-600">
                  Serviços de streaming com assinatura
                </span>
              </div>
              {streamingLinks
                .filter((l) => l.subscription)
                .map(renderProviderCard)}
            </TabsContent>
          </div>
        </Tabs>

        <div className="pt-4 border-t border-border mt-4">
          <p className="text-xs text-muted-foreground text-center">
            Os links redirecionam para os sites oficiais dos provedores. 
            Alguns conteúdos podem não estar disponíveis em todas as regiões.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
