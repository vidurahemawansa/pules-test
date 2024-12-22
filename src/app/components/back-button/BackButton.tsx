"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import styles from "./BackButton.module.scss";

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <span onClick={handleBack} className={`nav-icon ${styles.navIcon}`}>
      <FaChevronLeft />
    </span>
  );
};

export default BackButton;
