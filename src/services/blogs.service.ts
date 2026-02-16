import type { IBlogpost } from "../interfaces/IBlogPost";
import { api } from "./api"

export const blogService = {
    getBlogs: async (): Promise<IBlogpost[]> => {
        try{
            const res = await api.get("/api/blogs/");
            return res.data;
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
