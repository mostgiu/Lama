import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/people.jpg"
          alt="lamamia"
          className={styles.img}
          fill={true}
        />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Digital Story Teller</h1>
          <h2 className={styles.imgDesc}>Hand Crafting award winning digital experience</h2>
        </div>

      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who Are We?</h1>
             <p className={styles.desc}>
            We are a team of passionate digital designers and developers dedicated to creating stunning online experiences. With over a decade of combined experience, we specialize in crafting beautiful, functional websites and applications that help businesses stand out in the digital world. Our mission is to transform your ideas into digital reality with innovation, creativity, and excellence.
            <br />
            <br />
            We believe in the power of great design paired with robust technology. Our team works closely with clients to understand their vision and deliver solutions that exceed expectations. We take pride in building long-term relationships and being trusted partners in your digital journey.
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>What We Do?</h1>
          <p className={styles.desc}>
            We specialize in delivering comprehensive digital solutions tailored to your business needs. From strategic planning to final execution, we handle every aspect of your project with professionalism and creativity.
            <br />
            <br /> - Creative Illustrations
            <br />
            <br /> - Dynamic Websites
            <br />
            <br /> - Fast and Handy
            <br />
            <br /> - Mobile Apps
          </p>
      <Button url="/contact" text="Contact"/>
        </div>
      </div>
    </div>
  );
}
