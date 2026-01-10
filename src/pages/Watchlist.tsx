import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Loader2,
  Filter
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useWatchlist, useUpdateWatchlistStatus, useRemoveFromWatchlist, WatchlistStatus } from "@/hooks/useWatchlist";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusConfig: Record<WatchlistStatus, { label: string; icon: typeof Clock; color: string }> = {
  want_to_watch: { label: "Quero assistir", icon: Clock, color: "text-yellow-500" },
  watching: { label: "Assistindo", icon: Eye, color: "text-blue-500" },
  completed: { label: "Completo", icon: CheckCircle2, color: "text-green-500" },
  dropped: { label: "Abandonado", icon: XCircle, color: "text-red-500" },
};

export default function Watchlist() {
  const { data: watchlist, isLoading } = useWatchlist();
  const updateStatus = useUpdateWatchlistStatus();
  const removeFromWatchlist = useRemoveFromWatchlist();
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState<WatchlistStatus | "all">("all");

  const handleUpdateStatus = async (animeId: number, status: WatchlistStatus) => {
    try {
      await updateStatus.mutateAsync({ animeId, status });
      toast({
        title: "Status atualizado!",
        description: `Anime marcado como "${statusConfig[status].label}"`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description: "Tente novamente mais tarde.",
      });
    }
  };

  const handleRemove = async (animeId: number, title: string) => {
    try {
      await removeFromWatchlist.mutateAsync(animeId);
      toast({
        title: "Removido da watchlist",
        description: `"${title}" foi removido.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao remover",
        description: "Tente novamente mais tarde.",
      });
    }
  };

  const filteredWatchlist = watchlist?.filter(item => 
    selectedFilter === "all" || item.status === selectedFilter
  ) || [];

  const counts = {
    all: watchlist?.length || 0,
    want_to_watch: watchlist?.filter(i => i.status === "want_to_watch").length || 0,
    watching: watchlist?.filter(i => i.status === "watching").length || 0,
    completed: watchlist?.filter(i => i.status === "completed").length || 0,
    dropped: watchlist?.filter(i => i.status === "dropped").length || 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Minha Watchlist
              </h1>
            </div>
            <p className="text-muted-foreground">
              Acompanhe os animes que você quer assistir, está assistindo ou já completou.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              Todos ({counts.all})
            </Button>
            {(Object.keys(statusConfig) as WatchlistStatus[]).map((status) => {
              const config = statusConfig[status];
              return (
                <Button
                  key={status}
                  variant={selectedFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(status)}
                  className="gap-1"
                >
                  <config.icon className={`h-3 w-3 ${selectedFilter === status ? "" : config.color}`} />
                  {config.label} ({counts[status]})
                </Button>
              );
            })}
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredWatchlist.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              {filteredWatchlist.map((item, index) => {
                const config = statusConfig[item.status];
                const StatusIcon = config.icon;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group relative"
                  >
                    <Link to={`/anime/${item.anime_id}`} className="block">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary mb-2">
                        {item.anime_cover_image ? (
                          <img
                            src={item.anime_cover_image}
                            alt={item.anime_title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                            No Image
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded bg-background/90 backdrop-blur-sm ${config.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="text-xs font-medium">{config.label}</span>
                        </div>

                        {/* Hover overlay with actions */}
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="secondary" size="sm">
                                <Filter className="h-3 w-3 mr-1" />
                                Status
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {(Object.keys(statusConfig) as WatchlistStatus[]).map((status) => {
                                const cfg = statusConfig[status];
                                return (
                                  <DropdownMenuItem
                                    key={status}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleUpdateStatus(item.anime_id, status);
                                    }}
                                    className={item.status === status ? "bg-secondary" : ""}
                                  >
                                    <cfg.icon className={`h-4 w-4 mr-2 ${cfg.color}`} />
                                    {cfg.label}
                                  </DropdownMenuItem>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemove(item.anime_id, item.anime_title);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                    
                    <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {item.anime_title}
                    </h3>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-24"
            >
              <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {selectedFilter === "all" 
                  ? "Sua watchlist está vazia" 
                  : `Nenhum anime "${statusConfig[selectedFilter as WatchlistStatus].label.toLowerCase()}"`}
              </h2>
              <p className="text-muted-foreground mb-6">
                {selectedFilter === "all"
                  ? "Comece a adicionar animes que você quer assistir!"
                  : "Altere o status de um anime para vê-lo aqui."}
              </p>
              <Button asChild>
                <Link to="/browse">Explorar animes</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
