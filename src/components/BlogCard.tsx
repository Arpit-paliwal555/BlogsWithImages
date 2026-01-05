import type { FunctionComponent } from "react";
import type { IBlogpost } from "../interfaces/IBlogPost";

 
const BlogCard: FunctionComponent<IBlogpost> = (props:IBlogpost) => {
    const {title, description, publishedAt} = props;
    const date = new Date(publishedAt);


    return (
    <div className="border-2 mt-1 mb-1 p-2">
        <h1 className="font-bold">{title}</h1>
        <p>{description}</p>
        <div>
            <p>{date.toDateString()}</p>
        </div>
    </div>  );
}
 
export default BlogCard;