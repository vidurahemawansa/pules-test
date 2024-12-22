"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CityList.module.scss";
import Link from "next/link";
import "swiper/css";

const CityList = () => {
  const cities = [
    { src: "/cities/1.webp", name: "Hokkaido" },
    { src: "/cities/2.webp", name: "Tokyo" },
    { src: "/cities/3.webp", name: "Osaka" },
    { src: "/cities/4.webp", name: "Kyoto" },
    { src: "/cities/5.webp", name: "Fukuoka" },
    { src: "/cities/3.webp", name: "Colombo" },
    { src: "/cities/1.webp", name: "Rome" },
    { src: "/cities/2.webp", name: "Paris" },
  ];
  return (
    <div className={styles.cityContainer}>
      <div className="header">
        <h3>Discover you city!</h3>
        <Link href="">View All</Link>
      </div>
      <Swiper
        slidesPerView={4.5}
        spaceBetween={24}
        loop={true}
        loopAdditionalSlides={8}
        breakpoints={{
          320: { slidesPerView: 3.5 },
          640: { slidesPerView: 4.5 },
          768: { slidesPerView: 8 },
          992: { slidesPerView: 10 },
        }}
        slidesOffsetAfter={-10}
      >
        {cities.map((city, index) => (
          <SwiperSlide key={index}>
            <div className={styles.itemOuterContainer}>
              <div className={styles.itemWrapper}>
                <Link
                  className={styles.sliderItem}
                  style={{
                    backgroundImage: `url('${city.src}')`,
                  }}
                  href={{
                    pathname: "/city-offer/landing",
                    query: { city: JSON.stringify(city) },
                  }}
                ></Link>
              </div>
              <span>{city.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CityList;
