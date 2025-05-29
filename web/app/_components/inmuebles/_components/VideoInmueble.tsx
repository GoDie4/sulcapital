'use client'
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export const VideoInmueble = () => {
  return (
    <div className="w-full rounded-main overflow-hidden">
      <LiteYouTubeEmbed
        id="PLrRlajJyoU" 
        title="Video de YouTube"
      />
    </div>
  );
};
