import { useState, useEffect } from "react";
import { Clock, Calendar, Bell, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { toast } from "sonner";

interface CountdownTimerProps {
  targetTimestamp: number;
  episode: number;
  animeTitle?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetTimestamp, episode, animeTitle }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const { permission, requestPermission, scheduleEpisodeNotification, isSubscribed } = usePushNotifications();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        setIsExpired(true);
        return null;
      }

      const days = Math.floor(difference / (60 * 60 * 24));
      const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((difference % (60 * 60)) / 60);
      const seconds = difference % 60;

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft === null) {
        clearInterval(timer);
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  const handleNotifyMe = async () => {
    if (permission !== "granted") {
      const granted = await requestPermission();
      if (granted && animeTitle) {
        scheduleEpisodeNotification(animeTitle, episode, targetTimestamp);
        toast.success(`Você será notificado quando o EP ${episode} for lançado!`);
      }
    } else if (animeTitle) {
      scheduleEpisodeNotification(animeTitle, episode, targetTimestamp);
      toast.success(`Você será notificado quando o EP ${episode} for lançado!`);
    }
  };

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-teal-500/20 border border-green-500/30 p-5"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="text-green-400 font-semibold text-lg">
              Episódio {episode} disponível!
            </p>
            <p className="text-green-400/70 text-sm">
              Assista agora mesmo
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!timeLeft) return null;

  const targetDate = new Date(targetTimestamp * 1000);
  const dayName = targetDate.toLocaleDateString("pt-BR", { weekday: "long" });
  const dayNumber = targetDate.getDate();
  const monthName = targetDate.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  const timeStr = targetDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const timeUnits = [
    { value: timeLeft.days, label: "dias", color: "from-violet-500 to-purple-600" },
    { value: timeLeft.hours, label: "hrs", color: "from-blue-500 to-cyan-500" },
    { value: timeLeft.minutes, label: "min", color: "from-primary to-blue-500" },
    { value: timeLeft.seconds, label: "seg", color: "from-pink-500 to-rose-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-secondary/50 border border-border p-5"
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/5 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Próximo episódio</span>
            <p className="font-bold text-foreground">EP {episode}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNotifyMe}
          className="h-8 px-3 text-xs hover:bg-primary/10 hover:text-primary"
        >
          <Bell className="h-3.5 w-3.5 mr-1.5" />
          {isSubscribed ? "Notificar" : "Lembrar"}
        </Button>
      </div>

      {/* Countdown Grid */}
      <div className="relative grid grid-cols-4 gap-2 mb-5">
        <AnimatePresence mode="popLayout">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-sm"
                style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
              />
              <div className="relative flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-secondary/80 border border-border/50 backdrop-blur-sm">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-bold text-foreground tabular-nums leading-none"
                >
                  {unit.value.toString().padStart(2, "0")}
                </motion.span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                  {unit.label}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Date Card */}
      <div className="relative flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50">
        <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-lg font-bold text-primary leading-none">{dayNumber}</span>
          <span className="text-[10px] text-primary/80 uppercase">{monthName}</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground capitalize">{dayName}</p>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">às {timeStr}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
