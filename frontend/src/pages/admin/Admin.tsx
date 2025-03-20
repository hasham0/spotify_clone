import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStatistics from "./components/dashboard-statistics";
import { Music } from "lucide-react";
import SongsTabContent from "./components/songs-tab-content";
import AlbumsTabContent from "./components/albums-tab-content";
import { useEffect } from "react";
import { useMusicStore } from "@/store/useMusicStore";

type Props = {};

export default function Admin({}: Props) {
  const {
    statistics,
    fetchAllSongs,
    fetchStatistics,
    fetchAlbums,
    deleteAlbum,
    deleteSong,
    addSong,
  } = useMusicStore();
  useEffect(() => {
    const fetchValues = async () => {
      await fetchStatistics();
      await fetchAlbums();
      await fetchAllSongs();
    };
    fetchValues();
  }, [
    fetchAlbums,
    fetchAllSongs,
    fetchStatistics,
    deleteAlbum,
    deleteSong,
    addSong,
  ]);
  return (
    <div>
      <DashboardStatistics statistics={statistics.statistics} />
      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="bg-zinc-800/50 p-1">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
