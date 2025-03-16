import axiosInstance from "@/lib/axios";
import { AlbumTS, SongTS } from "@/types";
import { create } from "zustand";

interface MusicStoreState {
  albums: AlbumTS[];
  songs: SongTS[];
  isLoading: boolean;
  error: null | string;
  fetchAlbum: () => Promise<void>;
}

const useMusicStore = create<MusicStoreState>()((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbum: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/albums/");
      set({ albums: response.data.albums, isLoading: false });
    } catch (error) {
      console.error("🚀 ~ fetchAlbum: ~ error:", error);
    }
  },
}));

export { useMusicStore };
