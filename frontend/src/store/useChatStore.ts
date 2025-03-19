import { io } from "socket.io-client";
import { create } from "zustand";
import { UserTS, MessageTS } from "@/types";
import axiosInstance from "@/lib/axios";

interface ChatStoreStateTS {
  users: UserTS[];
  isLoading: boolean;
  error: null | string;
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: MessageTS[];
  selectedUser: UserTS | null;

  fetchUsers: () => Promise<void>;
  initializeSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, content: string) => void;
  fetchMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: UserTS | null) => void;
}

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
const socket = io(baseURL, {
  autoConnect: false,
  withCredentials: true,
});

const useChatStore = create<ChatStoreStateTS>()((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set<string>(),
  userActivities: new Map<string, string>(),
  messages: [],
  selectedUser: null,

  setSelectedUser: (user: UserTS | null) => {
    set({ selectedUser: user });
  },
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
  initializeSocket: (userId) => {
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();
      socket.emit("user_connected", userId);
      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });
      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });
      socket.on("user_connected", (userId) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });
      socket.on("user_disconnected", (userId) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });
      socket.on("received_message", (message: MessageTS) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });
      socket.on("send_message", (message: MessageTS) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });
      socket.on("update_activity", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });
      set({ isConnected: true });
    }
  },
  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },
  sendMessage: (receiverId, senderId, content) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit("send_message", { receiverId, senderId, content });
  },
  fetchMessages: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/users/messages/${userId}`);
      set({ messages: response.data.messages });
    } catch (error) {
      console.error("🚀 ~ fetchMessages: ~ error:", error);
      const err = error as unknown as { message: string };
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export { useChatStore };
