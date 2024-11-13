import React, { useState, useRef, useEffect } from "react";

interface HeroSectionProps {
  videoSrc: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ videoSrc }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);



  const words = ["GOLF ENCOUNTERS "];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150; // Adjust typing speed as needed


  useEffect(() => {
    const type = () => {
      const fullText = words[currentWordIndex];
      let newText = currentText;
      let currentIndex = currentText.length;
  
      if (isDeleting) {
        newText = fullText.substring(0, currentIndex - 1);
      } else {
        newText = fullText.substring(0, currentIndex + 1);
      }
  
      setCurrentText(newText);
  
      if (!isDeleting && newText === fullText) {
        setIsDeleting(true);
      } else if (isDeleting && newText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    };
  
    const typingTimeout = setTimeout(type, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [words, currentWordIndex, currentText, isDeleting, typingSpeed]);
  
  return (
    <div className="mx-4 xl:mx-0 relative h-full xl:h-[72vh] flex justify-center items-center overflow-hidden z-0">
      <video
        className="w-full"
        autoPlay
        muted
        loop
        playsInline
        src={videoSrc}
        data-object-fit="cover"
      ></video>

      <div className="z-20 absolute  text-center">
        <h2 className="text-center text-white">
          ゴルフがもっと楽しくなる
        </h2>
        <h1 className="text-center text-[42px] text-white ">
         <span className="text-[50px]" id="typewriter">{currentText}</span> 
        </h1>  
      
      </div>
    </div>
  );
};

export default HeroSection;
