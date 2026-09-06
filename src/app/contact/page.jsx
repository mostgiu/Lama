import React from "react"
import styles from "./page.module.css"
import Image from "next/image"
import Button from "@/components/Button/Button"

export const metadata = {
  title: "Contact",
  description: "This is the Contact Page",
};

export default function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lets Keep In Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>

          <Image fill={true} sizes="(max-width: 768px) 100vw, 50vw" src="/contact.png" alt="" className={styles.img} />



        </div>
          <form className={styles.form}>
            <input type="text" id="name" name="name" placeholder="Name" className={styles.input} />
            <input type="email" id="email" name="email" placeholder="Email" className={styles.input} />
            <textarea id="message" name="message" placeholder="Message" className={styles.textarea}></textarea>
      <Button url="" text="Send Message"/>
          </form>
      </div>
    </div>
  )
}
