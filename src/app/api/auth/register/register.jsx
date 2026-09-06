"use client"

import React from "react";
import styles from "./register.module.css";


const Register = () => {
const [error, setError] = useState(false);
const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                router.push("/dashboard/login?success=Account has been created successfully");
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            setError(true);
            console.error("An error occurred:", error);
        }

        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
    };  
  return (
    <div className={styles.register}>
      <h1>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" className={styles.input} required />
        <input type="email" placeholder="Email" className={styles.input} required />
        <input type="password" placeholder="Password" className={styles.input} required />
        <button type="submit" className={styles.button}>Register</button>
      </form>
      {error && <p style={{ color: "red" }}>Registration failed. Please try again.</p>  }
      <Link href="/dashboard/login" className={styles.link}>
        Already have an account? Login
      </Link>
    </div>
  );
};

export default Register;    