import { create } from "zustand";
import { UserTS } from "@/types";
import axiosInstance from "@/lib/axios";

interface ChatStoreStateTS {
  users: UserTS[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: null | string;
}

const useChatStore = create<ChatStoreStateTS>()((set) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get("/api/users/");
      set({ users: response.data.users });
    } catch (error) {
      console.log("🚀 ~ fetchUsers: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export { useChatStore };
