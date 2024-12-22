"use client";
import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  buttonType: "primary" | "disabled" | "hasIcon";
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  buttonType,
  onClick,
  children,
  icon,
}) => {
  const getClassNames = () => {
    switch (buttonType) {
      case "primary":
        return styles.primary;
      case "disabled":
        return styles.disabled;
      case "hasIcon":
        return styles.hasIcon;
      default:
        return "";
    }
  };

  return (
    <button
      className={`${styles.button} ${getClassNames()}`}
      onClick={onClick}
      disabled={buttonType === "disabled"}
    >
      {children}
      {buttonType === "hasIcon" && icon && (
        <span className="nav-icon">{icon}</span>
      )}
    </button>
  );
};

export default Button;
