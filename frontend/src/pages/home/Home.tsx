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
      madeForYourSongs.madeForYourSongs?.length > 0 &&
      trendingSongs.trendingSongs?.length > 0 &&
      featuredSongs.featuredSongs?.length > 0
    ) {
      initilizeQueue([
        ...featuredSongs.featuredSongs,
        ...trendingSongs.trendingSongs,
        ...madeForYourSongs.madeForYourSongs,
      ]);
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
              songs={madeForYourSongs.madeForYourSongs}
              isLoading={madeForYourSongs.isMadeForYourSongsLoading}
            />
            <SectionSongsGrid
              title="Trending Songs"
              songs={trendingSongs?.trendingSongs}
              isLoading={trendingSongs?.isTrendingSongsLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
