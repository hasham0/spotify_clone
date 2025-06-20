import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMusicStore } from "@/store/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

type NewSongTS = {
  title: string;
  artist: string;
  album: string;
  duration: string | number;
};
type SongFilesTS = {
  audioFile: File | null;
  imageFile: File | null;
};

const AddSongDialog = ({}: Props) => {
  const { albums, addSong } = useMusicStore();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newSong, setNewSong] = useState<NewSongTS>({
    title: "",
    artist: "",
    album: "",
    duration: 0,
  });
  const [files, setFiles] = useState<SongFilesTS>({
    audioFile: null,
    imageFile: null,
  });
  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!files.audioFile || !files.imageFile) {
        return toast.error("Please upload both audio and image files");
      }
      const formData = new FormData();
      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration.toString());
      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }
      formData.append("audioFile", files.audioFile);
      formData.append("imageFile", files.imageFile);
      await addSong(formData);
      setNewSong({
        album: "",
        artist: "",
        duration: 0,
        title: "",
      });

      setFiles({
        audioFile: null,
        imageFile: null,
      });
      toast.success("Song added successfully");
    } catch (error) {
      const err = error as unknown as { message: string };
      toast.error("Failed to add song: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
          <Plus className="mr-2 size-4" />
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[600vh] overflow-auto border-zinc-700 bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Add a New Song</DialogTitle>
          <DialogDescription>
            Add a new song in your music library
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFiles((pre) => ({ ...pre, audioFile: e.target.files![0] }))
            }
          />
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            hidden
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFiles((pre) => ({ ...pre, imageFile: e.target.files![0] }))
            }
          />
          {/* <!-- image upload area --> */}
          <div
            className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 p-6"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.imageFile ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Image selected:
                  </div>
                  <div className="text-xs text-zinc-400">
                    {files.imageFile.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-2 inline-block rounded-full bg-zinc-800 p-3">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="mb-2 text-sm text-zinc-400">
                    Upload artwork
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>
          {/* <!-- audio upload area --> */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioInputRef.current?.click()}
                className="w-full"
              >
                {files.audioFile
                  ? files.audioFile.name.slice(0, 20)
                  : "Choose Audio File"}
              </Button>
            </div>
          </div>

          {/* <!-- song details fields --> */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={newSong.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              value={newSong.artist}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (seconds)</label>
            <Input
              type="number"
              min={0}
              value={newSong.duration}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewSong({
                  ...newSong,
                  duration: e.target.value || 0,
                })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Album (Optional)</label>
            <Select
              value={newSong.album}
              onValueChange={(value: string) =>
                setNewSong({ ...newSong, album: value })
              }
            >
              <SelectTrigger className="w-full border-zinc-700 bg-zinc-800">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent className="border-zinc-700 bg-zinc-800">
                <SelectItem value="none">No Album (Single)</SelectItem>
                {albums.albums.map((album) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setSongDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="text-white"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Add Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
