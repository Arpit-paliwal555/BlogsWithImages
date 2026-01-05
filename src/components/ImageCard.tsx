import type { FunctionComponent } from "react";
import type { IImagePost } from "../interfaces/IImagePost";
 
const ImageCard: FunctionComponent<IImagePost> = (prop:IImagePost) => {
    const {imageUrl, caption, comments, publishedAt} = prop;
    const date = new Date(publishedAt);
    return ( <div className="border-2 mt-1 mb-1 p-2">
        <img src={imageUrl} alt="" />
        <p>{caption}</p>
        <div>
            {comments.map((comment)=>(
                <p>{comment}</p>
            ))}
        </div>
        <div>
            <p>{date.toDateString()}</p>
        </div>
    </div>  );
}
 
export default ImageCard;