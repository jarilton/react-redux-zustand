import ReactPlayer from "react-player";

export const Video = () => {
  return (
    <div className="w-ful bg-zinc-950 aspect-video">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=g8OnjZ_lyDI"
        width="100%"
        height="100%"
        controls
        playing
      />
    </div>
  );
};
