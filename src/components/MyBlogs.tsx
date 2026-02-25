import { useContext, useEffect, useState, type FunctionComponent } from "react";
import BlogCard from "./BlogCard";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import type { IBlogpost } from "../interfaces/IBlogPost";

export const MyBlogs: FunctionComponent = () => {
    const auth = useContext(AuthContext);
    const [blogs, setBlogs] = useState<IBlogpost[]>([]);
    const { user } = auth || {};
    if (!auth || !user) {
        return <p className="text-red-500 text-center">You must be logged in to view your blogs.</p>;
    }
    console.log("Fetching blogs for userId:", user?.id);
    useEffect(()=>{(async () => {
        try {
            const res = await api.get(`/api/blogs/users/${user?.id}`, { withCredentials: true });
            const list = Array.isArray(res.data) 
                    ? res.data // if backend returns array
                    : Array.isArray(res.data?.blogs) 
                        ? res.data.blogs 
                        : [];

            setBlogs(list);
            console.log("Fetched blogs:", list);
        } catch (error) {
            console.error("Failed to fetch my blogs:", error);
        }
    })()}, []);
    return (
        <div className="mt-2">
            <h1 className="text-2xl font-bold mb-4">My Blogs</h1>
            {blogs.map(blog => (
                <BlogCard key={blog.id} {...blog} />
            ))}
        </div>
    );
} 