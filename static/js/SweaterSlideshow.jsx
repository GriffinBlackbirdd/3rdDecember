import React, { useState, useEffect } from "react";

const SnowflakeAnimation = () => {
  const snowflakes = Array(50)
    .fill(null)
    .map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-fall"
          style={{
            left: flake.left,
            animation: `fall ${flake.animationDuration} linear infinite`,
            animationDelay: flake.animationDelay,
            opacity: flake.opacity,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

const SweaterSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Replace these with your actual sweater doodle URLs
  const sweaterImages = [
    "/Users/eagle/Documents/sweater/static/images/s1.jpg",
    "/Users/eagle/Documents/sweater/static/images/s2.avif",
    "/Users/eagle/Documents/sweater/static/images/s3.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sweaterImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      <style>
        {`
          @keyframes fall {
            from { transform: translateY(-5vh); }
            to { transform: translateY(105vh); }
          }
          .animate-fall {
            animation: fall 3s linear infinite;
          }
        `}
      </style>

      <SnowflakeAnimation />

      <h1
        className="text-4xl mb-8 font-bold"
        style={{ fontFamily: "Comic Sans MS, cursive" }}
      >
        Here is your sweater
      </h1>

      <div className="relative w-80 h-96 border-2 border-black rounded-lg p-4 bg-white">
        <div className="relative w-full h-full">
          {sweaterImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Sweater design ${index + 1}`}
              className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                filter: "grayscale(100%)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {sweaterImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border border-black ${
              index === currentIndex ? "bg-black" : "bg-white"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SweaterSlideshow;
