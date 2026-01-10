import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const VAPID_PUBLIC_KEY = "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U";

interface PushNotificationState {
  isSupported: boolean;
  permission: NotificationPermission | "default";
  isSubscribed: boolean;
}

export function usePushNotifications() {
  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    permission: "default",
    isSubscribed: false,
  });

  useEffect(() => {
    const isSupported = "Notification" in window && "serviceWorker" in navigator && "PushManager" in window;
    
    setState(prev => ({
      ...prev,
      isSupported,
      permission: isSupported ? Notification.permission : "default",
    }));

    if (isSupported) {
      checkSubscription();
    }
  }, []);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setState(prev => ({ ...prev, isSubscribed: !!subscription }));
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported) {
      toast.error("Notificações não são suportadas neste navegador");
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setState(prev => ({ ...prev, permission }));
      
      if (permission === "granted") {
        await subscribeUser();
        toast.success("Notificações ativadas com sucesso!");
        return true;
      } else if (permission === "denied") {
        toast.error("Permissão de notificação negada");
        return false;
      }
      
      return false;
    } catch (error) {
      console.error("Error requesting permission:", error);
      toast.error("Erro ao solicitar permissão");
      return false;
    }
  }, [state.isSupported]);

  const subscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey.buffer as ArrayBuffer,
      });

      // Store subscription in localStorage for now
      localStorage.setItem("pushSubscription", JSON.stringify(subscription));
      setState(prev => ({ ...prev, isSubscribed: true }));
      
      return subscription;
    } catch (error) {
      console.error("Error subscribing to push:", error);
      throw error;
    }
  };

  const unsubscribe = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        localStorage.removeItem("pushSubscription");
        setState(prev => ({ ...prev, isSubscribed: false }));
        toast.success("Notificações desativadas");
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      toast.error("Erro ao desativar notificações");
    }
  }, []);

  const sendTestNotification = useCallback(() => {
    if (state.permission === "granted") {
      new Notification("AniHublist", {
        body: "Notificações configuradas com sucesso! 🎉",
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: "test-notification",
      });
    }
  }, [state.permission]);

  const scheduleEpisodeNotification = useCallback((animeTitle: string, episode: number, timestamp: number) => {
    const notificationData = {
      animeTitle,
      episode,
      timestamp,
      id: `${animeTitle}-ep-${episode}`,
    };

    // Store scheduled notifications
    const scheduled = JSON.parse(localStorage.getItem("scheduledNotifications") || "[]");
    const exists = scheduled.some((n: typeof notificationData) => n.id === notificationData.id);
    
    if (!exists) {
      scheduled.push(notificationData);
      localStorage.setItem("scheduledNotifications", JSON.stringify(scheduled));
    }
  }, []);

  return {
    ...state,
    requestPermission,
    unsubscribe,
    sendTestNotification,
    scheduleEpisodeNotification,
  };
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}
