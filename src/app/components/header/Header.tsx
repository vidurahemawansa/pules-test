import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png";
import user from "@/app/assets/images/user.png";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logoContainer}>
      <Image src={logo} alt="Pulse logo" />
    </div>
    <div className={styles.userDetails}>
      <div className={styles.text}>
        <h4>Hi, John Doe</h4>
        <span>Welcome</span>
      </div>
      <div className={styles.imgOuter}>
        <div className={styles.userImg}>
          <Image src={user} alt="avatar" />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
