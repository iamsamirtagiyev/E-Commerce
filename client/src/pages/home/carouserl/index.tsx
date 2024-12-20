import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";

interface SlideProps {
  slides: any[];
}

const Carousel: React.FC<SlideProps> = ({ slides }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="flex items-center justify-center acpect-video">
      <Slider {...settings} className="w-full h-full">
        {slides?.map((slide, key) => (
          <div key={key} className="w-full h-full p-5 acpect-video flex items-center justify-center">
            <img src={slide} alt="slide" className="rounded-md w-full h-full object-cover object-center" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
