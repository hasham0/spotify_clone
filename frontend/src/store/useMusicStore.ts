import axiosInstance from "@/lib/axios";
import { AlbumTS, SongTS } from "@/types";
import { create } from "zustand";

interface MusicStoreStateTS {
  albums: AlbumTS[];
  songs: SongTS[];
  isLoading: boolean;
  error: null | string;
  currentAlbum: null | AlbumTS;
  madeForYourSongs: SongTS[];
  featuredSongs: SongTS[];
  trendingSongs: SongTS[];
  fetchAlbum: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}

const useMusicStore = create<MusicStoreStateTS>()((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  currentAlbum: null,
  error: null,
  madeForYourSongs: [],
  featuredSongs: [],
  trendingSongs: [],
  fetchAlbum: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/albums/");
      set({ albums: response.data.albums });
    } catch (error) {
      console.error("🚀 ~ fetchAlbum: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAlbumById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/albums/${id}`);
      set({ currentAlbum: response.data.albums });
    } catch (error) {
      console.error("🚀 ~ fetchAlbumById: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/songs/forYouSongs`);
      set({ madeForYourSongs: response.data.songs });
    } catch (error) {
      console.error("🚀 ~ fetchMadeForYouSongs: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/songs/featuredSongs`);
      set({ featuredSongs: response.data.songs });
    } catch (error) {
      console.error("🚀 ~ fetchFeaturedSongs: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/songs/trendingSongs`);
      set({ trendingSongs: response.data.songs });
    } catch (error) {
      console.error("🚀 ~ fetchTrendingSongs: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export { useMusicStore };
