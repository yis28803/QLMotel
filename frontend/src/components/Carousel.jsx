import { useState } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-auto flex-shrink-0"
          >
            <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center text-white px-4">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill className="text-4xl" />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill className="text-4xl" />
        </button>
      </div>

      <div className="absolute bottom-4 flex justify-center w-full">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full w-4 h-4 cursor-pointer mx-2 ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
