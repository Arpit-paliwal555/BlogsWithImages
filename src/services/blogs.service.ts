import type { IBlogpost } from "../interfaces/IBlogPost";
import { api } from "./api"

const normalizeBlogs = (response: unknown): IBlogpost[] => {
    if (Array.isArray(response)) {
        return response as IBlogpost[];
    }

    if (response && typeof response === "object") {
        const payload = response as Record<string, unknown>;
        if (Array.isArray(payload.items)) {
            return payload.items as IBlogpost[];
        }
        if (Array.isArray(payload.blogs)) {
            return payload.blogs as IBlogpost[];
        }
    }

    throw new TypeError("Unexpected response format while fetching blogs.");
};

export const blogService = {
    getBlogs: async (): Promise<IBlogpost[]> => {
        try{
            const res = await api.get("/api/blogs/");
            return normalizeBlogs(res.data);
        }catch(error){
            console.error("Error fetching blogs:", error);
            throw error;
        }
    },
    createBlog: async (blogData: {title: string; content: string; imageUrl?: string}) => {
        try{
            const res = await api.post("/api/blogs", blogData);
            return res.data;
        }catch(error){
            console.error("Error creating blog:", error);
            throw error;
        }
    },
    deleteBlog: async (blogId: string) => {
        try{
            const res = await api.delete(`/api/blogs/${blogId}`);
            return res.data;
        }catch(error){
            console.error("Error deleting blog:", error);
            throw error;
        }
    }
}
