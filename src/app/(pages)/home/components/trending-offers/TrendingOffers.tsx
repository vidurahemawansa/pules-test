"use client";
import React, { useEffect, useState } from "react";
import { useOffersContext } from "@/app/context/OfferContext";
import { useOffers } from "@/app/hooks/UseOffers";
import { Offer } from "@/app/models/offers";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./TrendingOffers.module.scss";
import { Pagination, EffectCards } from "swiper/modules";
import Button from "@/app/components/button/Button";
import { FaChevronRight, FaRegStar } from "react-icons/fa";
import Loader from "@/app/components/loader/loader";

const TrendingOffers = () => {
  const { offers, loading, error } = useOffers();
  const [latestOffers, setLatestOffers] = useState<Offer[]>([]);
  const { setOffers } = useOffersContext();

  useEffect(() => {
    if (offers && offers.length > 0) {
      setOffers(offers);
      getLatestOffers(offers);
    }
  }, [offers, setOffers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getLatestOffers = (allOffers: Offer[]) => {
    const offersWithImages = allOffers.filter(
      (offer) => offer.images && offer.images.length > 0
    );

    const sortedOffers = offersWithImages.sort(
      (a, b) =>
        new Date(b.validFrom).getTime() - new Date(a.validFrom).getTime()
    );
    const latestThree = sortedOffers.slice(0, 3);
    setLatestOffers(latestThree);
  };

  return (
    <section className={styles.trendingContainer}>
      <div className="header">
        <h3>Trending Offer</h3>
      </div>
      <div className={styles.latestOfferWrapper}>
        <Swiper
          modules={[Pagination, EffectCards]}
          slidesPerView={1}
          spaceBetween={10}
          centeredSlides={true}
          loop={true}
          grabCursor={true}
          effect="cards"
          pagination={{ clickable: true }}
          className="trending-slider"
        >
          {latestOffers.map((offer, index) => (
            <SwiperSlide key={index}>
              <div
                key={offer.id}
                className={styles.sliderItem}
                style={{
                  backgroundImage: `url('${offer.images[0]}')`,
                }}
              >
                <div className={styles.overlay}></div>
                <div className={styles.textContents}>
                  <span className={styles.timezone}>
                    {offer.timezone.split("/")[1]}
                  </span>
                  <h4>{offer.title}</h4>
                  <div className={styles.reviews}>
                    <div className={styles.starWrapper}>
                      <FaRegStar />
                      <span>5.0</span>
                    </div>
                    <span>120 reviews</span>
                  </div>
                  <Button buttonType="hasIcon" icon={<FaChevronRight />}>
                    See more
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {loading && <Loader />}
    </section>
  );
};

export default TrendingOffers;
