import ReactPlayer from "react-player";
import { next, useCurrentLesson } from "../../store/slices/player";
import { useAppDispatch } from "../../store";

export const Video = () => {
  const dispatch = useAppDispatch();

  const { currentLesson } = useCurrentLesson();

  const handleNextPlay = () => {
    dispatch(next());
  };

  if (!currentLesson) return null;

  return (
    <div className="w-ful bg-zinc-950 aspect-video">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        width="100%"
        height="100%"
        controls
        playing
        onEnded={handleNextPlay}
      />
    </div>
  );
};
