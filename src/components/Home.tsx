import BlogList from './BlogList'
import { blogsList} from '../utils/Blogs'
import { Images } from '../utils/ImagePost'
import { ImageList } from './ImageList'
import type { IBlogpost } from '../interfaces/IBlogPost'
import type { IImagePost } from '../interfaces/IImagePost'
import { useEffect, useState } from 'react'
import { blogService } from '../services/blogs.service'
export const Home = () => {
    const [showImagePosts, setShowImagePosts] = useState<boolean>(false);
    const [list, setList] = useState<IBlogpost[]>([]);

    // Fetch blogs when component mounts
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogs = await blogService.getBlogs();
                setList(blogs);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            }
        }
        fetchBlogs();
      }, []);
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