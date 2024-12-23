"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import BackButton from "@/app/components/back-button/BackButton";
import Cards from "@/app/components/cards/Cards";
import OfferList from "./components/offer-list/OfferList";
import styles from "./CityOfferLanding.module.scss";

const CityOfferLandingContent = () => {
  interface CityParam {
    src: string;
    name: string;
  }

  const searchParams = useSearchParams();
  const [city, setCity] = useState<CityParam | null>(null);

  useEffect(() => {
    const cityParam = searchParams.get("city");
    if (cityParam) {
      const parsedCity = JSON.parse(cityParam);
      setCity(parsedCity); // city details from previous page to display on banner
    }
  }, [searchParams]);

  return (
    <section className={styles.cityOfferLanding}>
      <div className={styles.mainImageContainer}>
        {city && (
          <Image
            className={styles.featuredImg}
            src={city?.src}
            alt={city?.name}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            priority
          />
        )}
        <div className={styles.titleWrapper}>
          <div className={styles.innerWrapper}>
            <div className={styles.backBtnWrapper}>
              <BackButton />
            </div>
            {city && <span className={styles.cityName}>{city?.name}</span>}
          </div>
        </div>

        <div className={styles.coverOverlay}></div>
        <div className={styles.imgBottomOverlay}>
          <div className={styles.imgInnerWrapper}>
            <div className={styles.greyIcon}></div>
          </div>
        </div>
      </div>
      <main className={styles.mainContent}>
        <div className={styles.cardContainer}>
          <Cards
            title="Special Offers!"
            imageUrl="/cards/offer-card2.png"
            link="/"
          />
          <Image
            className={styles.pagination}
            src="/icons/dots.svg"
            alt="dots"
            width={40}
            height={8}
          />
        </div>
        <div className={styles.offerListContainer}>
          <OfferList />
        </div>
      </main>
    </section>
  );
};

const CityOfferLanding = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CityOfferLandingContent />
    </Suspense>
  );
};

export default CityOfferLanding;
