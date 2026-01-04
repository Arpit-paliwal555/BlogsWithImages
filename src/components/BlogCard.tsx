import type { FunctionComponent } from "react";
import type { IBlogpost } from "../interfaces/IBlogPost";

 
const BlogCard: FunctionComponent<IBlogpost> = (props:IBlogpost) => {
    const {title, description, publishedAt} = props;
    return (<div>
        <h1>{title}</h1>
        <p>{description}</p>
        <div>
            <p>{publishedAt}</p>
        </div>
    </div>  );
}
 
export default BlogCard;