import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { next, useCurrentLesson } from "../../store/slices/player";

export const Video = () => {
  const dispatch = useDispatch();

  const { currentLesson } = useCurrentLesson();

  const handleNextPlay = () => {
    dispatch(next());
  };

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
