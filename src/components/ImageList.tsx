import type { IImagePost } from "../interfaces/IImagePost";
import type { FunctionComponent } from "react";
import ImageCard from "./ImageCard";

interface ImageListProps{
    images: IImagePost[]
}
export const ImageList: FunctionComponent<ImageListProps> = (props)=>{
    
    return(
        <div className="flex flex-col items-center">
            <div >
                {props.images.map((imagePost:IImagePost)=>(
                    <ImageCard key={imagePost.id} {...imagePost}></ImageCard>
                ))}
            </div>
        </div>
    )
}