
export default function Hero(){  
  
    return(
        <div className="border-2 h-screen mt-0.5 p-2 flex items-center">
            <div className="flex flex-col gap-5 p-5">
                <h1 className="font-bold text-3xl font-stretch-50%">Turn ideas into conversations.</h1>
                <h3 className="text-2xl">Post blogs with images, discover inspiring content, 
                and interact through likes and comments. Join now and make your mark!</h3>
                <button className="border-2 w-fit p-3">Create Account</button>
            </div>
            <img className="w-96" src="src/assets/art-pc.svg" alt="NA"/>
        </div>
    )
}