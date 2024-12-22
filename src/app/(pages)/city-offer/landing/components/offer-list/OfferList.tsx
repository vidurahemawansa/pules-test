import React, { useEffect, useState } from "react";
import { useOffersContext } from "@/app/context/OfferContext";
import { useOffers } from "@/app/hooks/UseOffers";
import { Offer } from "@/app/models/offers";
import { FaTag } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import OfferItems from "../offer-items/OfferItems";
import Loader from "@/app/components/loader/loader";
import styles from "./OfferList.module.scss";

const OfferList = () => {
  const { offers, loading, error } = useOffers();
  const { setOffers } = useOffersContext();
  const [timezones, setTimezones] = useState<string[]>([]);
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);

  useEffect(() => {
    if (offers && offers.length > 0) {
      setOffers(offers);
      const uniqueTimezones = Array.from(
        new Set(offers.map((offer: Offer) => offer.timezone))
      );
      setTimezones(uniqueTimezones);
    }
  }, [offers, setOffers]);

  const handleTagClick = (timezone: string) => {
    setSelectedTimezones((prevSelected) =>
      prevSelected.includes(timezone)
        ? prevSelected.filter((tz) => tz !== timezone)
        : [...prevSelected, timezone]
    );
  };

  const filteredOffers =
    selectedTimezones.length > 0
      ? offers?.filter((offer: Offer) =>
          selectedTimezones.includes(offer.timezone)
        )
      : offers;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className={styles.offersSectionContainer}>
      <div className="header">
        <h3>Explore Tokyo&apos;s best category</h3>
      </div>
      <div className={styles.filterWrapper}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={8}
          freeMode={true}
          className="offer-slider"
        >
          {timezones.map((timezone, index) => (
            <SwiperSlide key={index}>
              <button
                onClick={() => handleTagClick(timezone)}
                className={`${styles.tagBtn} ${
                  selectedTimezones.includes(timezone) ? styles.selected : ""
                }`}
              >
                <span className={styles.icon}>
                  <FaTag />
                </span>
                <span className={styles.zoneText}>
                  {timezone.split("/")[1]}
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {filteredOffers && filteredOffers.length > 0 && (
        <OfferItems offers={filteredOffers} />
      )}

      {loading && <Loader />}
    </section>
  );
};

export default OfferList;
