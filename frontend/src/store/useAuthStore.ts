import { create } from "zustand";
import axiosInstance from "@/lib/axios";

interface AuthStoreStateTS {
  isAdmin: boolean;
  isLoading: boolean;
  error: null | string;
  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

const useAuthStore = create<AuthStoreStateTS>()((set) => ({
  isLoading: false,
  error: null,
  isAdmin: false,
  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/admin/checkAdmin");
      set({ isAdmin: response.data.isAdmin });
    } catch (error) {
      console.error("🚀 ~ checkAdminStatus: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => set({ isLoading: false, error: null, isAdmin: false }),
}));

export { useAuthStore };
