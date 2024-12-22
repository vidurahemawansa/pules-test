"use client";

import React, { useEffect, useState } from "react";
import { useOffersContext } from "@/app/context/OfferContext";
import { useOffers } from "@/app/hooks/UseOffers";
import { useRouter } from "next/navigation";
import { Offer } from "@/app/models/offers";
import classNames from "classnames";
import styles from "./SpecialOffers.module.scss";
import "@/app/slider.scss";
import Loader from "@/app/components/loader/loader";
import { getClassName } from "@/app/services/utils/sliderHelper";
import { useSwipeable } from "react-swipeable";
import Button from "@/app/components/button/Button";
import { FaChevronRight, FaRegStar } from "react-icons/fa";

const SpecialOffers = () => {
  const { offers, loading, error } = useOffers();
  const [latestOffers, setLatestOffers] = useState<Offer[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setOffers } = useOffersContext();
  const router = useRouter();

  useEffect(() => {
    if (offers && offers.length > 0) {
      setOffers(offers);
      getLatestOffers(offers);
    }
  }, [offers, setOffers]);

  useEffect(() => {
    if (latestOffers.length > 0) {
      setActiveIndex(0);
    }
  }, [latestOffers]);

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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveIndex((prev) => (prev + 1) % latestOffers.length),
    onSwipedRight: () =>
      setActiveIndex(
        (prev) => (prev - 1 + latestOffers.length) % latestOffers.length
      ),
    trackMouse: true,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (latestOffers.length === 0) {
    return null;
  }

  const handleSeeMoreClick = (url: string) => {
    router.push(url);
  };

  return (
    <section className={styles.trendingContainer}>
      <div className="header">
        <h3>Trending Offer</h3>
      </div>
      <div className="custom-slider" {...swipeHandlers}>
        <div className="slider-inner-container">
          {latestOffers.map((offer, index) => (
            <div
              key={offer.id}
              className={classNames(
                "slide-item",
                getClassName(index, activeIndex, latestOffers.length)
              )}
              style={{
                backgroundImage: `url('${offer.images[0]}')`,
              }}
            >
              <div className="overlay"></div>
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
                <Button
                  buttonType="hasIcon"
                  icon={<FaChevronRight />}
                  onClick={() =>
                    handleSeeMoreClick(`/city-offer/details/${offer.id}`)
                  }
                >
                  See more
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-container">
          {latestOffers.map((_, index) => (
            <span
              key={index}
              className={classNames("pagination", {
                ["active"]: index === activeIndex,
              })}
              onClick={() => setActiveIndex(index)}
            ></span>
          ))}
        </div>
      </div>
      {loading && <Loader />}
    </section>
  );
};

export default SpecialOffers;
