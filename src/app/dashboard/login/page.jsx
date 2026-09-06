"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

function LoginForm() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;

    try {
      setError(false);
      setLoading(true);

      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(true);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {success && <p className={styles.success}>{success}</p>}
        <input type="text" placeholder="Username" className={styles.input} required />
        <input type="password" placeholder="Password" className={styles.input} required />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className={styles.error}>Invalid username or password.</p>}

        <div className={styles.divider}>or</div>

        <button
          type="button"
          className={styles.googleButton}
          onClick={() => signIn("google")}
        >
          Login with Google
        </button>

        <p className={styles.registerLink}>
          Don&apos;t have an account? <Link href="/dashboard/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className={styles.container}>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
