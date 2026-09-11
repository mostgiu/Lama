"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const username = session.data?.user?.name;

  const { data: posts, error: postsError, isLoading, mutate } = useSWR(
    username ? `/api/posts?username=${username}` : null,
    fetcher,
  );

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status !== "authenticated") {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Welcome to the Dashboard</h1>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Posts</h2>
          {postsError && <p className={styles.error}>Failed to load posts.</p>}
          {isLoading && <p>Loading posts...</p>}
          {!isLoading && posts?.length === 0 && <p>You haven&apos;t created any posts yet.</p>}
          <div className={styles.posts}>
            {posts?.map((post) => (
              <Post key={post._id} post={post} onDeleted={() => mutate()} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Create a Post</h2>
          <NewPostForm username={username} onCreated={() => mutate()} />
        </section>
      </div>
    </div>
  );
};

const Post = ({ post, onDeleted }) => {
  const [imgError, setImgError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${post.title}"? This can't be undone.`)) {
      return;
    }

    try {
      setDeleting(true);
      const res = await fetch(`/api/posts/${post._id}`, { method: "DELETE" });
      if (res.ok) {
        onDeleted();
      } else {
        window.alert("Failed to delete post. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      window.alert("Failed to delete post. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.imgContainer}>
        {imgError ? (
          <div className={styles.imgFallback}>No image</div>
        ) : (
          <img
            src={post.image}
            alt={post.title}
            className={styles.postImage}
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className={styles.postBody}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <p className={styles.postDescription}>{post.description}</p>
      </div>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleDelete}
        disabled={deleting}
        aria-label={`Delete ${post.title}`}
      >
        {deleting ? "..." : "✕"}
      </button>
    </div>
  );
};

const isDirectImageUrl = (url) => /\.(jpe?g|png|gif|webp|avif|svg)(\?.*)?$/i.test(url);

const NewPostForm = ({ username, onCreated }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const image = e.target.image.value;
    const content = e.target.content.value;

    if (!isDirectImageUrl(image)) {
      setError(
        "That doesn't look like a direct image link. Right-click the image itself and choose \"Copy Image Address\", not the page URL.",
      );
      return;
    }

    try {
      setError("");
      setSuccess(false);
      setLoading(true);

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image, content, username }),
      });

      if (res.ok) {
        e.target.reset();
        setSuccess(true);
        onCreated();
      } else {
        setError("Failed to create post. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Title" className={styles.input} required />
      <input name="description" type="text" placeholder="Short description" className={styles.input} required />
      <input name="image" type="url" placeholder="Image URL" className={styles.input} required />
      <textarea name="content" placeholder="Content" className={styles.textarea} rows={5} required />
      <button type="submit" className={styles.button} disabled={loading}>
        {loading && <span className={styles.spinner} />}
        {loading ? "Publishing..." : "Publish Post"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Post created successfully.</p>}
    </form>
  );
};

export default Dashboard;
