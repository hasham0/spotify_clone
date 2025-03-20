import axiosInstance from "@/lib/axios";
import { AlbumTS, SongTS, StatisticsTS } from "@/types";
import { create } from "zustand";
import toast from "react-hot-toast";

interface MusicStoreStateTS {
  albums: {
    isAlbumsLoading: boolean;
    albums: AlbumTS[];
  };
  songs: {
    isSongsLoading: boolean;
    songs: SongTS[];
  };
  currentAlbum: {
    isCurrentAlbumLoading: boolean;
    currentAlbum: null | AlbumTS;
  };
  madeForYourSongs: {
    isMadeForYourSongsLoading: boolean;
    madeForYourSongs: SongTS[];
  };
  featuredSongs: {
    isFeaturedSongsLoading: boolean;
    featuredSongs: SongTS[];
  };
  trendingSongs: {
    isTrendingSongsLoading: boolean;
    trendingSongs: any[];
  };
  statistics: {
    isStatisticsLoading: boolean;
    statistics: StatisticsTS;
  };

  error: null | string;
  fetchAllSongs: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStatistics: () => Promise<void>;
  addSong: (song: FormData) => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}

const useMusicStore = create<MusicStoreStateTS>()((set) => ({
  albums: {
    albums: [],
    isAlbumsLoading: false,
  },
  songs: {
    songs: [],
    isSongsLoading: false,
  },
  currentAlbum: {
    currentAlbum: null,
    isCurrentAlbumLoading: false,
  },
  madeForYourSongs: {
    madeForYourSongs: [],
    isMadeForYourSongsLoading: false,
  },
  featuredSongs: {
    featuredSongs: [],
    isFeaturedSongsLoading: false,
  },
  trendingSongs: {
    trendingSongs: [],
    isTrendingSongsLoading: false,
  },
  statistics: {
    isStatisticsLoading: false,
    statistics: {
      totalAlbums: 0,
      totalSongs: 0,
      totalUsers: 0,
      totalArtists: 0,
    },
  },

  error: null,
  fetchAllSongs: async () => {
    set((state) => ({
      songs: { ...state.songs, isSongsLoading: true },
      error: null,
    }));
    try {
      const response = await axiosInstance.get("/api/songs/");
      set((state) => ({
        songs: { ...state.songs, songs: response.data.songs },
      }));
    } catch (error) {
      console.error("🚀 ~ fetchAllSongs: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set((state) => ({
        songs: { ...state.songs, isSongsLoading: false },
      }));
    }
  },
  fetchStatistics: async () => {
    set((state) => ({
      statistics: { ...state.statistics, isStatisticsLoading: true },
      error: null,
    }));
    try {
      const response = await axiosInstance.get("/api/statistics/");
      const { totalAlbums, totalSongs, totalUsers, totalArtists } =
        response.data;
      set((state) => ({
        statistics: {
          ...state.statistics,
          statistics: {
            totalAlbums,
            totalSongs,
            totalUsers,
            totalArtists,
          },
        },
      }));
    } catch (error) {
      console.error("🚀 ~ fetchAllSongs: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set((state) => ({
        statistics: { ...state.statistics, isStatisticsLoading: false },
      }));
    }
  },
  fetchAlbums: async () => {
    set((state) => ({
      albums: { ...state.albums, isAlbumsLoading: true },
      error: null,
    }));
    try {
      const response = await axiosInstance.get("/api/albums/");
      set((state) => ({
        albums: { ...state.albums, albums: response.data.albums },
      }));
    } catch (error) {
      console.error("🚀 ~ fetchAlbum: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set((state) => ({
        albums: { ...state.albums, isAlbumsLoading: false },
      }));
    }
  },
  fetchAlbumById: async (id) => {
    set((state) => ({
      currentAlbum: {
        ...state.currentAlbum,
        currentAlbum: null,
        isCurrentAlbumLoading: true,
      },
    }));
    try {
      const response = await axiosInstance.get(`/api/albums/${id}`);
      set((state) => ({
        currentAlbum: {
          ...state.currentAlbum,
          currentAlbum: response.data.album,
        },
      }));
    } catch (error) {
      console.error("🚀 ~ fetchAlbumById: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set((state) => ({
        currentAlbum: {
          ...state.currentAlbum,
          isCurrentAlbumLoading: false,
        },
      }));
    }
  },
  fetchMadeForYouSongs: async () => {
    set((state) => ({
      madeForYourSongs: {
        ...state.madeForYourSongs,
        madeForYourSongs: [],
        isMadeForYourSongsLoading: true,
      },
    }));
    try {
      const response = await axiosInstance.get(`/api/songs/forYouSongs`);
      set((state) => ({
        madeForYourSongs: {
          ...state.madeForYourSongs,
          madeForYourSongs: response.data.songs,
        },
      }));
    } catch (error) {
      console.error("🚀 ~ fetchMadeForYouSongs: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set((state) => ({
        madeForYourSongs: {
          ...state.madeForYourSongs,
          isMadeForYourSongsLoading: false,
        },
      }));
    }
  },
  fetchFeaturedSongs: async () => {
    set((state) => ({
      ...state.featuredSongs,
      featuredSongs: {
        featuredSongs: [],
        isFeaturedSongsLoading: true,
      },
    }));
    try {
      const response = await axiosInstance.get(`/api/songs/featuredSongs`);
      set((state) => ({
        featuredSongs: {
          ...state.featuredSongs,
          featuredSongs: response.data.songs,
        },
      }));
    } catch (error) {
      console.error("🚀 ~ fetchFeaturedSongs: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set((state) => ({
        featuredSongs: {
          ...state.featuredSongs,
          isFeaturedSongsLoading: false,
        },
      }));
    }
  },
  fetchTrendingSongs: async () => {
    set((state) => ({
      ...state.trendingSongs,
      trendingSongs: {
        trendingSongs: [],
        isTrendingSongsLoading: false,
      },
    }));
    try {
      const response = await axiosInstance.get(`/api/songs/trendingSongs`);
      set((state) => ({
        trendingSongs: {
          ...state.trendingSongs,
          trendingSongs: response.data.songs,
        },
      }));
    } catch (error) {
      console.error("🚀 ~ fetchTrendingSongs: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set((state) => ({
        trendingSongs: {
          ...state.trendingSongs,
          isTrendingSongsLoading: false,
        },
      }));
    }
  },

  addSong: async (song) => {
    set((state) => ({
      songs: { ...state.songs, isSongsLoading: true },
      error: null,
    }));
    try {
      const response = await axiosInstance.post("/api/admin/addSong", song, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        songs: { ...state.songs, songs: [...state.songs.songs, response.data] },
      }));
      toast.success("Song added successfully");
    } catch (error) {
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set((state) => ({
        songs: { ...state.songs, isSongsLoading: false },
      }));
    }
  },
  deleteSong: async (id) => {
    set((state) => ({
      songs: { ...state.songs, isSongsLoading: true },
      error: null,
    }));
    try {
      await axiosInstance.delete(`/api/admin/deleteSong/${id}`);
      set((state) => ({
        songs: {
          ...state.songs,
          songs: state.songs.songs.filter((song) => song._id !== id),
        },
      }));
      toast.success("Song deleted successfully");
    } catch (error) {
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set((state) => ({
        songs: { ...state.songs, isSongsLoading: false },
      }));
    }
  },
  deleteAlbum: async (id) => {
    set((state) => ({
      albums: {
        ...state.albums,
        isAlbumsLoading: true,
      },
      songs: {
        ...state.songs,
        isSongsLoading: true,
      },
      error: null,
    }));
    try {
      await axiosInstance.delete(`/api/admin/deleteAlbum/${id}`);
      set((state) => ({
        albums: {
          ...state.albums,
          albums: state.albums.albums.filter((album) => album._id !== id),
        },
        songs: {
          ...state.songs,
          songs: state.songs.songs.map((song) =>
            song.albumId === id ? { ...song, albumId: null } : song,
          ),
        },
      }));
      toast.success("Album deleted successfully");
    } catch (error) {
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set((state) => ({
        albums: { ...state.albums, isAlbumsLoading: false },
        songs: { ...state.songs, isSongsLoading: false },
      }));
    }
  },
}));

export { useMusicStore };
