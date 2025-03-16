import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDuration } from "@/lib/services";
import { useMusicStore } from "@/store/useMusicStore";
import { Clock, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

type Props = {};

export default function Album({}: Props) {
  const { fetchAlbumById, currentAlbum } = useMusicStore();
  const { albumId } = useParams<{ albumId: string }>();
  useEffect(() => {
    if (!albumId) return;
    fetchAlbumById(albumId);
  }, [albumId]);

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        <div className="relative min-h-full">
          {/* <!-- bg gradient --> */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900"
            aria-hidden="true"
          />
          {/* <!-- content --> */}
          <div className="relative z-10">
            <div className="flex gap-6 p-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="h-[240px] w-[240px] rounded shadow-xl"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="my-4 text-7xl font-bold">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* <!--  play button --> */}
            <div className="flex items-center gap-6 px-6 pb-4">
              <Button
                // onClick={handlePlayAlbum}
                size="icon"
                className="h-14 w-14 rounded-full bg-green-500 transition-all hover:scale-105 hover:bg-green-400"
              >
                <Play className="size-7 text-black" />
              </Button>
            </div>

            {/* <!-- Table section --> */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* table header */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 border-b border-white/5 px-10 py-2 text-sm text-zinc-400">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              {/* <!-- song list --> */}
              <div className="border-2 border-black px-6">
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs.map((song, index: number) => {
                    return (
                      <div
                        key={song._id}
                        className={`group grid cursor-pointer grid-cols-[16px_4fr_2fr_1fr] gap-4 rounded-md px-4 py-2 text-sm text-zinc-400 hover:bg-white/5`}
                      >
                        <div className="flex items-center justify-center">
                          <span className="group-hover:hidden">
                            {index + 1}
                          </span>
                          <Play className="hidden size-4 group-hover:block" />
                        </div>
                        <div className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10"
                          />

                          <div>
                            <div className={`font-medium text-white`}>
                              {song.title}
                            </div>
                            <div>{song.artist}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {song.createdAt.split("T")[0]}
                        </div>
                        <div className="flex items-center">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
