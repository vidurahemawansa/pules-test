import React from "react";
import Header from "@/app/components/header/Header";
import styles from "./Home.module.scss";
import CityList from "./components/city-list/CityList";
//import TrendingOffers from "./components/trending-offers/TrendingOffers";
import Cards from "@/app/components/cards/Cards";
import SpecialOffers from "./components/special-offers/SpecialOffers";

const Home = () => (
  <div className={styles.home}>
    <Header />
    <main className={styles.mainContent}>
      <CityList />

      <div className={styles.contentWrapper}>
        <div className={styles.trendingOfferWrapper}>
          {/* <TrendingOffers /> */}
          <SpecialOffers />
        </div>
        <div className={styles.cardWrapper}>
          <Cards
            title="Add card for special offers"
            imageUrl="/cards/offer-card1.svg"
            link="/"
          />
        </div>
      </div>
    </main>
  </div>
);

export default Home;
