import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IBlogpost } from "../interfaces/IBlogPost";
import { blogService } from "../services/blogs.service";

export default function BlogPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<IBlogpost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    const fetchBlog = async () => {
      const blogId = Number(id);
      if (!Number.isInteger(blogId) || blogId <= 0) {
        setBlog(null);
        setError("This blog could not be found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const blogs = await blogService.getBlogs();
        if (isCurrent) {
          setBlog(blogs.find((post) => post.id === blogId) ?? null);
        }
      } catch (fetchError) {
        console.error("Failed to fetch blog:", fetchError);
        if (isCurrent) {
          setError("Unable to load this blog. Please try again later.");
        }
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    void fetchBlog();
    return () => {
      isCurrent = false;
    };
  }, [id]);

  if (loading) {
    return <p className="mx-auto mt-8 max-w-3xl px-4 text-white/70">Loading blog...</p>;
  }

  if (error || !blog) {
    return (
      <main className="mx-auto mt-8 max-w-3xl px-4">
        <p className="text-red-400">{error ?? "This blog could not be found."}</p>
        <Link to="/home" className="mt-4 inline-block text-twitter hover:underline">
          Back to blogs
        </Link>
      </main>
    );
  }

  const publishedDate = new Date(blog.publishedAt).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="mx-auto my-8 w-full max-w-3xl px-4">
      <Link to="/home" className="mb-6 inline-block text-sm text-twitter hover:underline">
        &larr; Back to blogs
      </Link>
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50">
        {blog.imageUrl && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${blog.imageUrl}`}
            alt={blog.title}
            className="max-h-[28rem] w-full object-cover"
          />
        )}
        <div className="p-6 sm:p-8">
          <p className="text-sm text-white/60">
            By {blog.user?.username ?? "Unknown author"} <span aria-hidden="true">·</span>{" "}
            <time dateTime={blog.publishedAt}>{publishedDate}</time>
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {blog.title}
          </h1>
          <p className="mt-6 whitespace-pre-wrap text-base leading-8 text-white/85">
            {blog.description}
          </p>
          <p className="mt-8 border-t border-white/10 pt-4 text-sm text-white/50">
            {blog.viewCount} {blog.viewCount === 1 ? "view" : "views"}
          </p>
        </div>
      </article>
    </main>
  );
}
