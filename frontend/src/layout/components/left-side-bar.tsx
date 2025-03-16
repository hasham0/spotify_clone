import PlaylistSkeleton from "@/components/skeletons/playlist-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/store/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {};

const LeftSideBar = ({}: Props) => {
  const { albums, fetchAlbum, isLoading } = useMusicStore();

  useEffect(() => {
    fetchAlbum();
  }, []);

  return (
    <div className="flex h-full flex-col gap-2">
      {/* <!-- navigation section --> */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              }),
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <SignedIn>
            <Link
              to="/chat"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                }),
              )}
            >
              <MessageCircleIcon className="mr-2 size-5" />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* <!-- library section --> */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center px-2 text-white">
            <Library className="mr-2 size-5" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              <>
                {albums.map((album) => (
                  <Link
                    key={album._id}
                    to={`/albums/${album._id}`}
                    className="group flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-zinc-800"
                  >
                    <img
                      src={album.imageUrl}
                      alt="playlist image"
                      className="size-12 flex-shrink-0 rounded-md object-cover"
                    />
                    <div className="hidden min-w-0 flex-1 md:block">
                      <p className="truncate font-medium">{album.title}</p>
                      <p className="truncate text-sm text-zinc-400">
                        Album . {album.artist}
                      </p>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSideBar;
