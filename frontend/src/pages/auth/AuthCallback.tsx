import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function AuthCallback({}: Props) {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const sycAttempted = useRef(false);
  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || sycAttempted.current) return;

      try {
        sycAttempted.current = true;
        await axiosInstance.post("/api/auth/auth-callback", {
          id: user?.id,
          firstname: user?.firstName,
          lastname: user?.lastName,
          imageUrl: user?.imageUrl,
        });
      } catch (error) {
        console.error("🚀 ~ syncUser ~ error:", error);
      } finally {
        navigate("/");
      }
    };
    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-black">
      <Card className="w-[90%] max-w-md border-y-zinc-800 bg-zinc-900">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <Loader className="size-8 animate-spin text-emerald-500" />
          <h3 className="text-xl font-bold text-white">Logging you in</h3>
          <p className="text-sm text-zinc-400">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
}
