import { Loader } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
type Props = {
  children: ReactNode;
};

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] =
      `Bearer ${token.toString()}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default function AuthProvider({ children }: Props) {
  const { getToken, userId } = useAuth();
  const { initializeSocket, disconnectSocket } = useChatStore();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          checkAdminStatus();
          if (userId) {
            initializeSocket(userId);
          }
        }
      } catch (error) {
        updateApiToken(null);
        console.error("🚀 ~ initAuth ~ error:", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
    return () => {
      disconnectSocket();
    };
  }, [getToken, userId, checkAdminStatus, initializeSocket, disconnectSocket]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="size-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return <>{children}</>;
}
