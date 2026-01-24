import BlogList from './BlogList'
import { blogsList} from '../utils/Blogs'
import { Images } from '../utils/ImagePost'
import { ImageList } from './ImageList'
import type { IBlogpost } from '../interfaces/IBlogPost'
import type { IImagePost } from '../interfaces/IImagePost'
import { useState } from 'react'
export const Home = () => {
    const [showImagePosts, setShowImagePosts] = useState<boolean>(false);
    const list:IBlogpost[] = blogsList;
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