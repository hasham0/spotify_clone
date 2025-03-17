import { usePlayerStore } from "@/store/usePlayerStore";
import { useEffect, useRef } from "react";

type Props = {};

const AudioPlayer = ({}: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  // const nextSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // handle pause/play
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  // handle songs end
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [currentSong]);

  // handle song changes
  useEffect(() => {
    if (!(audioRef.current && currentSong && currentSong.audioUrl)) return;
    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChange) {
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
