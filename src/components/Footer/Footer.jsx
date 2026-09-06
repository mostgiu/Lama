import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
export default function Footer() {
  return (
    <div className={styles.container}>

      <div>2026 lamamia. All rights reserved.</div>
      <div className={styles.social}>


    <Image src="/1.png" width={30} height={30} className={styles.icon} alt="Facebook"/>
    <Image src="/2.png" width={30} height={30} className={styles.icon} alt="Facebook"/>
    <Image src="/3.png" width={30} height={30} className={styles.icon} alt="Facebook"/>
    <Image src="/4.png" width={30} height={30} className={styles.icon} alt="Facebook"/>

      


    </div>
    </div>
    
   
    
  )
}
