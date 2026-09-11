export const posts = [
  {
    id: 1,
    title: "Getting Started with the Next.js App Router",
    body: "The App Router changed how we think about routing in Next.js. Instead of a single pages directory, every route now lives in its own folder with a page.js file, giving you layouts, loading states, and error boundaries that are scoped to exactly the part of the tree that needs them. In this post I walk through setting up a fresh project, organizing routes with folders, and sharing UI across pages with nested layouts.",
  },
  {
    id: 2,
    title: "Why I Moved My Portfolio Data to MongoDB",
    body: "My portfolio started as a handful of hardcoded arrays scattered across the codebase. Every time I wanted to add a project or update a bio, I had to touch source files and redeploy. Moving that content into MongoDB let me build a small dashboard for managing posts and projects without ever opening a code editor, and it set the stage for features like search and filtering down the road.",
  },
  {
    id: 3,
    title: "Designing a Clean UI with CSS Modules",
    body: "CSS Modules give you locally scoped class names without reaching for a whole styling framework. On this site, every page ships its own page.module.css file, so styles never leak between components and I can name classes like .container or .title as many times as I want without collisions. This post covers the folder conventions I use and a few tricks for keeping stylesheets easy to navigate as a project grows.",
  },
  {
    id: 4,
    title: "Five Lessons from Building My First Full-Stack App",
    body: "Building a full-stack app end to end taught me more than any tutorial could. I learned to validate data on both the client and server, to keep authentication logic in one place instead of duplicating it across routes, and to treat my database schema as a living document that changes as the product does. Here are the five lessons that stuck with me the most.",
  },
  {
    id: 5,
    title: "Optimizing Images in Next.js for Faster Load Times",
    body: "The built-in Image component handles resizing, lazy loading, and modern formats automatically, but getting the most out of it takes a bit of tuning. I cover setting the right sizes attribute for responsive grids, choosing between fill and fixed dimensions, and how prioritizing above-the-fold images improved my Largest Contentful Paint score.",
  },
  {
    id: 6,
    title: "Building a Custom Admin Dashboard with Next.js and MongoDB",
    body: "Rather than relying on a third-party CMS, I built a lightweight dashboard directly into this site for managing blog posts and portfolio items. It covers protected routes, form handling for creating and editing entries, and connecting server actions straight to MongoDB collections without a separate backend service.",
  },
];
