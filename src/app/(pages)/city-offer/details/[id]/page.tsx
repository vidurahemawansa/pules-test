"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useOffers } from "@/app/hooks/UseOffers";
import { Offer } from "@/app/models/offers";
import Loader from "@/app/components/loader/loader";
import FullscreenSwiper from "../../landing/components/fullscreen-swiper/FullscreenSwiper";
import styles from "./details.module.scss";

const OfferDetails = () => {
  const { offers, loading, error } = useOffers();
  const { id } = useParams();
  const [offerDetails, setOfferDetails] = useState<Offer | null>(null);

  useEffect(() => {
    if (offers && offers.length > 0) {
      const foundOffer = offers.find((offer) => offer.id === Number(id));
      setOfferDetails(foundOffer || null);
    }
  }, [id, offers]);

  if (!id) return <p>Loading...</p>;

  return (
    <section className={styles.offerDetailContainer}>
      {offerDetails && (
        <FullscreenSwiper offer={offerDetails} allOffers={offers || []} />
      )}
      {loading && <Loader />}
      {error && <div>Error: {error}</div>}
    </section>
  );
};

export default OfferDetails;
