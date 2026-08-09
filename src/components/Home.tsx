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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blogs when component mounts
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogs = await blogService.getBlogs();
                setList(blogs);
                setError(null);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
                setError("Unable to load blogs. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
      }, []);
    const imageList:IImagePost[] = Images;
    return (
      <div className='mt-2'>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <BlogList list={list} />
        )}
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