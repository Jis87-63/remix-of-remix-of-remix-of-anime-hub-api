import { useState } from "react";
import { Heart, Check, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  useWatchlistItem, 
  useAddToWatchlist, 
  useUpdateWatchlistStatus, 
  useRemoveFromWatchlist,
  WatchlistStatus 
} from "@/hooks/useWatchlist";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WatchlistButtonProps {
  animeId: number;
  animeTitle: string;
  animeCoverImage?: string;
  variant?: "default" | "compact";
}

const statusLabels: Record<WatchlistStatus, string> = {
  want_to_watch: "Quero assistir",
  watching: "Assistindo",
  completed: "Completo",
  dropped: "Abandonado",
};

export function WatchlistButton({ 
  animeId, 
  animeTitle, 
  animeCoverImage,
  variant = "default" 
}: WatchlistButtonProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: watchlistItem, isLoading: isChecking } = useWatchlistItem(animeId);
  const addToWatchlist = useAddToWatchlist();
  const updateStatus = useUpdateWatchlistStatus();
  const removeFromWatchlist = useRemoveFromWatchlist();
  
  const [isOpen, setIsOpen] = useState(false);

  const isInWatchlist = !!watchlistItem;
  const isLoading = addToWatchlist.isPending || updateStatus.isPending || removeFromWatchlist.isPending;

  const handleAdd = async (status: WatchlistStatus = "want_to_watch") => {
    if (!user) {
      toast({
        title: "Faça login",
        description: "Você precisa estar logado para adicionar à watchlist.",
      });
      navigate("/auth");
      return;
    }

    try {
      await addToWatchlist.mutateAsync({
        animeId,
        animeTitle,
        animeCoverImage,
        status,
      });
      toast({
        title: "Adicionado!",
        description: `"${animeTitle}" foi adicionado à sua watchlist.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível adicionar à watchlist.",
      });
    }
    setIsOpen(false);
  };

  const handleUpdateStatus = async (status: WatchlistStatus) => {
    try {
      await updateStatus.mutateAsync({ animeId, status });
      toast({
        title: "Status atualizado!",
        description: `Marcado como "${statusLabels[status]}"`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o status.",
      });
    }
    setIsOpen(false);
  };

  const handleRemove = async () => {
    try {
      await removeFromWatchlist.mutateAsync(animeId);
      toast({
        title: "Removido!",
        description: `"${animeTitle}" foi removido da watchlist.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível remover da watchlist.",
      });
    }
    setIsOpen(false);
  };

  if (isChecking) {
    return (
      <Button variant="outline" size={variant === "compact" ? "sm" : "default"} disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (!isInWatchlist) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size={variant === "compact" ? "sm" : "default"}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Heart className="h-4 w-4" />
                {variant === "default" && "Adicionar"}
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {(Object.keys(statusLabels) as WatchlistStatus[]).map((status) => (
            <DropdownMenuItem key={status} onClick={() => handleAdd(status)}>
              {statusLabels[status]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="secondary" 
          size={variant === "compact" ? "sm" : "default"}
          className="gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Check className="h-4 w-4 text-green-500" />
              {variant === "default" && statusLabels[watchlistItem.status]}
              <ChevronDown className="h-3 w-3" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(statusLabels) as WatchlistStatus[]).map((status) => (
          <DropdownMenuItem 
            key={status} 
            onClick={() => handleUpdateStatus(status)}
            className={watchlistItem.status === status ? "bg-secondary" : ""}
          >
            {statusLabels[status]}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleRemove}
          className="text-destructive focus:text-destructive"
        >
          Remover da lista
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
