import { useNavigate } from "react-router-dom"
export default function Hero(){  
    const navigate = useNavigate();
    const goToSignup=()=>{
        navigate('/signup');
    }
    return(
        <div className="border-2 h-screen mt-0.5 p-4 flex items-center ">
            <div className="flex flex-col gap-5 p-5 text-center items-center">
                <h1 className="font-bold text-3xl font-stretch-50%">Turn ideas into conversations.</h1>
                <h3 className="text-2xl ">Post blogs with images, discover inspiring content, 
                and interact through likes and comments. Join now and make your mark!</h3>
                <button className="border-2 rounded-sm w-1/3 p-3 cursor-pointer"
                    onClick={goToSignup}>Create Account</button>
            </div>
            <img className="max-w-xl" src="src/assets/blog-post-amico.svg" alt="NA"/>
        </div>
    )
}