"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./darkMode.module.css";
const DarkModeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Replace with your actual mode state or context value

  return (
    <div className={styles.Container} onClick={toggleTheme}>
      <div className={styles.icon}>🌙</div>
      <div className={styles.icon}>☀️</div>
      <div
        className={styles.ball}
        suppressHydrationWarning
        style={{
          transform: theme === "dark" ? "translateX(18px)" : "translateX(0)",
        }}
      ></div>
    </div>
  );
};

export default DarkModeToggle;
