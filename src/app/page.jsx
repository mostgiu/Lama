import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
  <>
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Better Design For Your digital products</h1>
        <p className={styles.description}>
          Discover the world of Lamamia, where innovation meets creativity. Explore our portfolio, 
        </p>
        <div className={styles.buttonContainer}>
          
        </div>
        <button className={styles.button}>Get Started</button>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/hero.png"
          alt="Hero Image"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={styles.img}
        />
      </div>
    </div>

  </>
  );
}
