import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import {notFound} from "next/navigation";



async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const BlogPage = async () => {
  const posts = await getData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to my Blog</h1>
      <p className={styles.description}>
        Here you can find articles on various topics.
      </p>
      
      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className={styles.post}>
            <div className={styles.postImageContainer}>
              <Image
                src="/fontana1.jpg"
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={styles.postImage}
              />
            </div>
            <div className={styles.postContent}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postBody}>{post.body}</p>
              <span className={styles.readMore}>Read More</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;