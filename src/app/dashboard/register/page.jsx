"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Register() {
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      setError(false);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Registration successful
        console.log("Registration successful");
        router.push("/dashboard/login?success=Account has been created successfully");
      } else {
        // Handle registration error
        setError(true);
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(true);
    }

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" className={styles.input} required />
        <input type="email" placeholder="Email" className={styles.input} required />
        <input type="password" placeholder="Password" className={styles.input} required />
        <button type="submit" className={styles.button}>Register</button>
        {error && <p style={{ color: "red" }}>Registration failed. Please try again.</p>}
      </form>
    </div>
  );
}