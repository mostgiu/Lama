"use client"
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import styles from "./Navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/darkmode";

const links = [
  { id: 1, title: "Home" ,url: "/"},
  { id: 2, title: "About", url: "/about" },
  { id: 3, title: "Contact", url: "/contact" },
  { id: 4, title: "Dashboard", url: "/dashboard" },  
  { id: 5, title: "Portfolio", url: "/portfolio" },  
  { id: 6, title: "blog", url: "/blog" },  
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (url) =>
    url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(`${url}/`);

  return (
   <div className={styles.container} >
     <Link href="/" className={styles.logo}>
       Lamamia
     </Link>
     <div className={styles.links}>
       <DarkModeToggle/>
       {links.map((link) => (
         <Link
           key={link.id}
           href={link.url}
           className={`${styles.link} ${isActive(link.url) ? styles.active : ""}`}
         >
           {link.title}
         </Link>
       ))}
       <button className={styles.logout} onClick={() => signOut()}>
         logout
         </button>
     </div>
     <button 
       className={styles.mobileMenuButton}
       onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
       aria-label="Toggle menu"
     >
       {isMobileMenuOpen ? '✕' : '☰'}
     </button>
      {isMobileMenuOpen && (
        <div className={`${styles.mobileMenu} ${styles.mobileMenuOpen}`}>
          <DarkModeToggle/>
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className={`${styles.mobileLink} ${isActive(link.url) ? styles.mobileActive : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <button
            className={styles.mobileLogout}
            onClick={() => {
              signOut();
              setIsMobileMenuOpen(false);
            }}
          >
            logout
          </button>
        </div>
      )}
    </div>
  )
}
