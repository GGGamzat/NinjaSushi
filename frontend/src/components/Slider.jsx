// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";

// // Стили
// import "swiper/css";
// import "swiper/css/pagination";


// const Slider = () => {
//     return (
//         <>
//         <div className="w-full h-screen bg-black text-white">
//             <Swiper
//                 modules={[Pagination, Autoplay]}
//                 pagination={{ clickable: true }}
//                 autoplay={{
//                 delay: 2500, // задержка между слайдами (мс)
//                 disableOnInteraction: false, // не останавливать при ручном свайпе
//                 }}
//                 loop={true} // бесконечный цикл
//                 className="mySwiper w-full h-full"
//             >
//                 <SwiperSlide>Slide 1</SwiperSlide>
//                 <SwiperSlide>Slide 2</SwiperSlide>
//                 <SwiperSlide>Slide 3</SwiperSlide>
//                 <SwiperSlide>Slide 4</SwiperSlide>
//                 <SwiperSlide>Slide 5</SwiperSlide>
//                 <SwiperSlide>Slide 6</SwiperSlide>
//                 <SwiperSlide>Slide 7</SwiperSlide>
//                 <SwiperSlide>Slide 8</SwiperSlide>
//                 <SwiperSlide>Slide 9</SwiperSlide>
//             </Swiper>
//         </div>
//         </>
//     );
// }

// export default Slider;



"use client"; // В Next.js 13+ для компонентов на клиенте

import { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.css"; // стили будем отдельным файлом

const Slider = ({ slides, autoPlay = true, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (autoPlay) {
      timeoutRef.current = setTimeout(nextSlide, interval);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [current, autoPlay, interval]);

  return (
    <div className={styles.slider}>
      <div
        className={styles.sliderWrapper}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <img src={slide} alt={`slide-${index}`} />
          </div>
        ))}
      </div>

      {/* Точки */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              current === index ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
