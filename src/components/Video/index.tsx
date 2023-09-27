import ReactPlayer from "react-player";
import { next } from "../../store/slices/player";
import { useAppSelector } from "../../store";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../../zustand-store";

export const Video = () => {
  const { currentLesson } = useCurrentLesson();

  const { isLoading, next } = useStore((store) => {
    return {
      isLoading: store.isLoading,
      next: store.next,
    };
  });

  const handleNextPlay = () => {
    next();
  };

  return (
    <div className="w-ful bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          width="100%"
          height="100%"
          controls
          playing
          onEnded={handleNextPlay}
        />
      )}
    </div>
  );
};
