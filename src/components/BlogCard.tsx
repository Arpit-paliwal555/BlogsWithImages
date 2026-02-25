import type { FunctionComponent } from "react";
import type { IBlogpost } from "../interfaces/IBlogPost";


 
const BlogCard: FunctionComponent<IBlogpost> = (props:IBlogpost) => {
    const {title, description, publishedAt} = props;
    const {imageUrl} = props;
    console.log("BlogCard received imageUrl:", imageUrl);
    const {user} = props;
    const date = new Date(publishedAt);
    return (
    <div className="border-2 mt-1 mb-1 p-2 flex flex-col justify-between h-auto w-full rounded-lg 
    hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out">
        {imageUrl && (
            <img src={`${import.meta.env.VITE_BACKEND_URL}${imageUrl}`} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
        )}
        <h1 className="font-bold">{title}</h1>
        <p className="grow">{description}</p>
        <div className="flex justify-between">
            <p className="font-light text-sm">{date.toDateString()}</p>
            <p className="font-light text-sm">By: {user.username}</p>
        </div>
    </div>  );
}
 
export default BlogCard;