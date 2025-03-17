import Topbar from "@/components/shared/top-bar";
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";
import FeaturedSongsSection from "./components/featured-songs-section";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionSongsGrid from "./components/section-songs-grid";
import { usePlayerStore } from "@/store/usePlayerStore";

type Props = {};

export default function Home({}: Props) {
  const {
    isLoading,
    madeForYourSongs,
    featuredSongs,
    trendingSongs,
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
  } = useMusicStore();

  useEffect(() => {
    const fetchValue = async () => {
      await fetchFeaturedSongs();
      await fetchMadeForYouSongs();
      await fetchTrendingSongs();
    };
    fetchValue();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  const { initilizeQueue } = usePlayerStore();

  useEffect(() => {
    if (
      madeForYourSongs.length > 0 &&
      trendingSongs.length > 0 &&
      featuredSongs.length > 0
    ) {
      initilizeQueue([...featuredSongs, ...trendingSongs, ...madeForYourSongs]);
    }
  }, [initilizeQueue, featuredSongs, madeForYourSongs, trendingSongs]);

  return (
    <div className="overflow-hidden rounded-md">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 sm:p-6">
          <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
            Good Afternoon
          </h1>
          <FeaturedSongsSection />
          <div className="space-y-8">
            <SectionSongsGrid
              title="Made for You"
              songs={madeForYourSongs}
              isLoading={isLoading}
            />
            <SectionSongsGrid
              title="Made for You"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
