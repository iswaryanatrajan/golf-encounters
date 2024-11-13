// IntroVideo.tsx

import React, { useState } from 'react';

type IntroVideoProps = {
  videoSrc: string;  
  posterSrc: string; 
};

const IntroVideo: React.FC<IntroVideoProps> = ({ videoSrc, posterSrc }) => {
  const [videoVisible, setVideoVisible] = useState(false);

  return (
    <div className="relative flex justify-center items-center bg-gray-200 p-4 rounded-lg shadow-md">
   
      {!videoVisible && (
        <>
        
          <img
            className="rounded-lg"
            src={posterSrc}
            alt="Introduction"
            onClick={() => setVideoVisible(true)}
          />
          <button
            className="absolute inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
            onClick={() => setVideoVisible(true)}
          >
            <span className="text-white text-6xl">&#9658;</span> 
          </button>
        </>
      )}
      {videoVisible && (
        <iframe
          className="rounded-lg w-full h-[260px]"
          src={videoSrc}
          title="Introduction Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default IntroVideo;
