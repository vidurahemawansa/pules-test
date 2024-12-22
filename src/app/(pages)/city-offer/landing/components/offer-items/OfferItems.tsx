import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Offer } from "@/app/models/offers";
import OfferCard from "../offer-card/OfferCard";
import styles from "./OfferItems.module.scss";

const OfferItems = ({ offers }: { offers: Offer[] }) => {
  const [displayedOffers, setDisplayedOffers] = useState<Offer[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setDisplayedOffers(offers.slice(0, 8));
    setHasMore(offers.length > 8);

    const scrollableDiv = document.getElementById("scrollableDiv");
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [offers]);

  const fetchMoreData = () => {
    if (displayedOffers.length >= offers.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setDisplayedOffers(
        displayedOffers.concat(
          offers.slice(displayedOffers.length, displayedOffers.length + 8)
        )
      );
    }, 500);
  };

  return (
    <InfiniteScroll
      dataLength={displayedOffers.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<span>...</span>}
      scrollableTarget="scrollableDiv"
      className={styles.infiniteWrapper}
    >
      <div id="scrollableDiv" className={styles.offersWrapper}>
        {displayedOffers.map((offer) => (
          <div key={offer.id} className={styles.cardContainer}>
            <OfferCard offer={offer} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default OfferItems;
