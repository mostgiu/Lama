import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { posts } from '../data'

function getData(id) {
  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    return notFound();
  }

  return post;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = getData(id);

  return {
    title: data.title,
    description: data.body,
  };
}

const BlogPost = async ({ params }) => {
  const { id } = await params;
  const data = getData(id);

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
