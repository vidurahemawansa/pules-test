import React, { useState, useRef, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { Offer } from "@/app/models/offers";
import BackButton from "@/app/components/back-button/BackButton";
import { FaRegHeart } from "react-icons/fa";
import { Pagination } from "swiper/modules";
import styles from "./FullscreenSwiper.module.scss";

interface FullscreenSwiperProps {
  offer: Offer;
  allOffers: Offer[];
}

const FullscreenSwiper = ({ offer, allOffers }: FullscreenSwiperProps) => {
  const additionalImages = useMemo(
    () => [
      "/cities/1.webp",
      "/cities/2.webp",
      "/cities/3.webp",
      "/cities/4.webp",
      "/cities/5.webp",
    ],
    []
  );

  const staticImg = "/cities/5.webp";

  const [activeIndex, setActiveIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<string>(
    offer.images[0] || additionalImages[0]
  );
  const [remainingThumbnailsCount, setRemainingThumbnailsCount] = useState(0);
  const mainSwiperRef = useRef<SwiperCore | null>(null);

  const mainSlides = allOffers.map((o) => o.images[0] || additionalImages[0]);

  useEffect(() => {
    const offerImages = allOffers[activeIndex]?.images || [];
    setCurrentImage(offerImages[0] || additionalImages[0]);

    setRemainingThumbnailsCount(
      offerImages.length + additionalImages.length - 4
    );
  }, [activeIndex, allOffers, additionalImages]);

  const handleThumbnailClick = (image: string) => {
    setCurrentImage(image);
  };

  const currentOfferImages = [
    ...(allOffers[activeIndex]?.images || []),
    ...additionalImages.slice(
      0,
      Math.max(0, 5 - (allOffers[activeIndex]?.images?.length || 0))
    ),
  ];

  const visibleThumbnails = currentOfferImages.slice(0, 4);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.fixedContent}>
        <BackButton />
        <div className={styles.heartIcon}>
          <FaRegHeart />
        </div>
      </div>
      <Swiper
        modules={[Pagination]}
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className={`${styles.mainFullscreenSwiper} fullscreen-swiper`}
      >
        {mainSlides.map((_, index) => (
          <SwiperSlide
            key={index}
            onClick={(event) => {
              if (mainSwiperRef.current) {
                const slideWidth = event.currentTarget.offsetWidth;
                const clickX = event.nativeEvent.offsetX;

                if (clickX < slideWidth / 2) {
                  mainSwiperRef.current.slidePrev();
                } else {
                  mainSwiperRef.current.slideNext();
                }
              }
            }}
          >
            <div
              className={styles.fullscreenSlide}
              style={{
                backgroundImage: `url(${
                  index === activeIndex ? currentImage : mainSlides[index]
                })`,
              }}
            >
              <div className={styles.overlay}>
                <div className={styles.titleContainer}>
                  <span className={styles.title}>
                    {allOffers[activeIndex]?.title || "No title Offer"}
                  </span>
                </div>
                <div className={styles.bottomContent}>
                  <div className={styles.thumbsContainer}>
                    {visibleThumbnails.map((image, index) => (
                      <div
                        key={index}
                        className={`${styles.thumbnailSlide} ${
                          image === currentImage ? styles.activeThumbnail : ""
                        }`}
                        onClick={() => handleThumbnailClick(image)}
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                      ></div>
                    ))}
                    {remainingThumbnailsCount > 0 && (
                      <div className={styles.moreThumbnails}>
                        +{remainingThumbnailsCount}
                      </div>
                    )}
                  </div>
                  <div className={styles.merchantWrapper}>
                    <div
                      style={{
                        backgroundImage: `url('${
                          allOffers[activeIndex]?.merchant?.image ?? staticImg
                        }')`,
                      }}
                      className={styles.merchantImg}
                    ></div>
                    <span>{allOffers[activeIndex]?.merchant?.name}</span>
                  </div>
                  <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{
                      __html: allOffers[activeIndex]?.description,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullscreenSwiper;
