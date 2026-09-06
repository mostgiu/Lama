import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import {notFound} from 'next/navigation'

async function getData(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getData(id);

  return {
    title: data.title,
    description: data.body,
  };
}

const BlogPost = async ({ params }) => {
  const { id } = await params;
  const data = await getData(id);

  return (
    <article className={styles.container}>
      <Link href="/blog" className={styles.backLink}>
        ← Back to Blog
      </Link>
      <span className={styles.badge}>Post #{id}</span>
      <h1 className={styles.title}>{data.title}</h1>
      <div className={styles.postContent}>
        <p className={styles.postBody}>{data.body}</p>
      </div>
    </article>
  );
};

export default BlogPost;
