"use client";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

function getYouTubeVideoId(url: string) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

const VideoInmueble = ({ url }: { url: string }) => {
  const IdVideo = getYouTubeVideoId(url);
  return (
    <>
      {IdVideo && (
        <div className="w-full rounded-main overflow-hidden">
          <LiteYouTubeEmbed id={IdVideo} title="Video inmueble" />
        </div>
      )}
    </>
  );
};

export default VideoInmueble;