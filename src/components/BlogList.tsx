import type { FunctionComponent } from "react";
import type { IBlogpost } from "../interfaces/IBlogPost";
import BlogCard from "./BlogCard";
import { div } from "framer-motion/client";

interface BlogListProps {
       list: IBlogpost[]
}
 
const BlogList: FunctionComponent<BlogListProps> = (props:BlogListProps) => {
    const {list} = props;
    return (
        <div>
        {list.map((blog:IBlogpost)=>(
                <BlogCard key={blog.id} {...blog}></BlogCard>
        ))}
        </div>
    );
}
 
export default BlogList;