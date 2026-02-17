import BlogList from './BlogList'
import { Images } from '../utils/ImagePost'
import { ImageList } from './ImageList'
import type { IBlogpost } from '../interfaces/IBlogPost'
import type { IImagePost } from '../interfaces/IImagePost'
import { useEffect, useState } from 'react'
import { blogService } from '../services/blogs.service'
export const Home = () => {
    const [showImagePosts, setShowImagePosts] = useState<boolean>(false);
    const [list, setList] = useState<IBlogpost[]>([]);  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);


    // Fetch blogs when component mounts
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);
                const blogs = await blogService.getBlogs();                
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

    const imageList:IImagePost[] = Images;
    return (
      <div className='mt-2'>
        <BlogList list={list}></BlogList>
        <div className="flex justify-center">
          <button
            onClick={() => {
              setShowImagePosts(!showImagePosts);
            }}
            className="border-2 w-fit p-3 mt-1"
          >
            See Image Posts
          </button>
        </div>
        {showImagePosts && <ImageList images={imageList}></ImageList>}
      </div>
    );
}