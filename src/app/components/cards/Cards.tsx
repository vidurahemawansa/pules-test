"use client";
import React from "react";
import styles from "./Cards.module.scss";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  imageUrl: string;
  link?: string;
}

const Cards: React.FC<CardProps> = ({ title, imageUrl, link = "" }) => (
  <div className={styles.cardsContainer}>
    <div className="header">
      <h3>{title}</h3>
    </div>
    <Link className={styles.cardContent} href={link}>
      <Image src={imageUrl} alt="offer card" layout="fill" />
    </Link>
  </div>
);

export default Cards;
