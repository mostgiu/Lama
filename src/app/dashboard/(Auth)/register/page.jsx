"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Register() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      setError(false);
      setLoading(true);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        router.push("/dashboard/login?success=Account has been created successfully");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" className={styles.input} required />
        <input type="email" placeholder="Email" className={styles.input} autoComplete="email" required />
        <input type="password" placeholder="Password" className={styles.input} autoComplete="new-password" required />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading && <span className={styles.spinner} />}
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p style={{ color: "red" }}>Registration failed. Please try again.</p>}
      </form>
    </div>
  );
}