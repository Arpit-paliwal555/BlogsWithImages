import BlogList from './BlogList'
import { Images } from '../utils/ImagePost'
import { ImageList } from './ImageList'
import type { IBlogpost } from '../interfaces/IBlogPost'
import { useEffect, useState } from 'react'
import { blogService } from '../services/blogs.service'
export const Home = () => {
    const [list, setList] = useState<IBlogpost[]>([]);  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);


    // Fetch blogs when component mounts
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);
                const blogs: IBlogpost[] = await blogService.getBlogs();                
                const normalized =
                          Array.isArray(blogs)
                            ? blogs
                            : Array.isArray((blogs as any)?.items)
                            ? (blogs as any).items
                            : [];

                        setList(normalized);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
                setError(error);
                setList([]);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
      }, []);

      
    // Optional: only render BlogList when we know list is an array
    if (loading) return <div className="mt-2">Loading…</div>;
    if (error) return <div className="mt-2 text-red-600">Failed to load blogs.</div>;

    return (
      <div className='mt-2'>
        <BlogList list={list}></BlogList>
      </div>
    );
}