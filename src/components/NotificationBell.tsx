import { Bell, BellOff, BellRing } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export function NotificationBell() {
  const {
    isSupported,
    permission,
    isSubscribed,
    requestPermission,
    unsubscribe,
    sendTestNotification,
  } = usePushNotifications();

  if (!isSupported) {
    return null;
  }

  const isEnabled = permission === "granted" && isSubscribed;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9"
        >
          <AnimatePresence mode="wait">
            {isEnabled ? (
              <motion.div
                key="bell-ring"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <BellRing className="h-5 w-5 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="bell"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <Bell className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {isEnabled && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {isEnabled ? (
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BellRing className="h-5 w-5 text-primary" />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <BellOff className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            <div>
              <h4 className="font-medium text-foreground">
                {isEnabled ? "Notificações ativas" : "Notificações desativadas"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {isEnabled 
                  ? "Você receberá alertas de novos episódios" 
                  : "Ative para receber alertas"}
              </p>
            </div>
          </div>

          {permission === "denied" ? (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">
                Notificações bloqueadas. Altere nas configurações do navegador.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {isEnabled ? (
                <>
                  <Button
                    variant="outline"
                    onClick={sendTestNotification}
                    className="w-full"
                  >
                    Enviar notificação de teste
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={unsubscribe}
                    className="w-full text-muted-foreground hover:text-destructive"
                  >
                    Desativar notificações
                  </Button>
                </>
              ) : (
                <Button
                  onClick={requestPermission}
                  className="w-full"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Ativar notificações
                </Button>
              )}
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Receba alertas quando novos episódios forem lançados, mesmo com o site fechado.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
