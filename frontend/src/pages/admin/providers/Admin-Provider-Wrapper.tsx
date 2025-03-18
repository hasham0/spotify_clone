import { useAuthStore } from "@/store/useAuthStore";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

type Props = {};

export default function AdminProviderWrapper({}: Props) {
  const { isAdmin, isLoading, error } = useAuthStore();

  if (!isLoading && !isAdmin) {
    return (
      <div>
        <p>{error || "Unauthorized"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black p-8 text-zinc-100">
      <Header />
      <Outlet />
    </div>
  );
}
