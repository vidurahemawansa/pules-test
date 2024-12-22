import React from "react";
import styles from "./OfferCard.module.scss";
import { Offer } from "@/app/models/offers";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";

const OfferCard = ({ offer }: { offer: Offer }) => {
  const staticImg = "/cities/1.webp";
  return (
    <Link
      href={`/city-offer/details/${offer.id}`}
      className={styles.cardContainer}
    >
      <div
        style={{
          backgroundImage: `url('${offer.images[0] ?? staticImg}')`,
        }}
        className={styles.cardImg}
      >
        <div className={styles.overlay}></div>
        <FaRegHeart className={styles.heartIcon} />
        <div className={styles.merchantWrapper}>
          <div
            style={{
              backgroundImage: `url('${offer.merchant?.image ?? staticImg}')`,
            }}
            className={styles.merchantImg}
          ></div>
          <span>{offer.merchant?.name}</span>
        </div>
      </div>
      <div className={styles.bottomContent}>
        <h3>{offer.title}</h3>
        <div className={styles.tagContainer}>
          <span className={styles.disabled}>Retail</span>
          <span>Exclusive</span>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
