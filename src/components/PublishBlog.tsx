import type { FunctionComponent } from "react";

interface CreateBlogProps {
    
}
 
const CreateBlog: FunctionComponent<CreateBlogProps> = () => {
    return ( <div className="flex flex-col p-4 mt-0.5 border-2 h-screen">
        <form>
            <div className="flex justify-between">
                <label htmlFor="title" className="">Title:</label>
                <input type="text" id="title" name="title" required 
                className="border p-1 rounded-md"/>
            </div>
            <div className="flex justify-between">
                <label htmlFor="content">Content:</label>
                <textarea id="content" name="content" required
                className="border p-1 rounded-md"></textarea>
            </div>
            <button type="submit" className="bg-gray-950 text-cyan-50 rounded-md p-1 w-full mt-4">Publish</button>
        </form>
    </div> );
}
 
export default CreateBlog;