import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
interface LandingPageProps {}

const LandingPage: FunctionComponent<LandingPageProps> = () => {
  const navigate = useNavigate();
  const goToSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="bg-linear-to-b from-[#8d8daa] via-[#dfdfde] to-[#f7f5f2] h-screen mt-0.5 p-4 items-center ">
      <div className="flex items-center gap-5">
        <h1 className="dancing-script text-4xl">Blog and Images</h1>
        <div className="flex items-center gap-5 mt-1">
          <h3 className="px-3 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer">About</h3>
          <h3 className="px-3 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer">Contact Us</h3>
        </div>
      </div>
      <div className="flex mt-10">
        <div className="flex flex-col justify-center gap-5 p-5 text-center items-center">
          <h1 className="text-3xl font-stretch-50%">
            Turn ideas into conversations.
          </h1>
          <h3 className="text-2xl">
            Post blogs with images, discover inspiring content, and interact
            through likes and comments. Join now and make your mark!
          </h3>
          <button
            className="border-2 rounded-sm w-1/3 p-3 cursor-pointer"
            onClick={goToSignup}
          >
            Create Account
          </button>
        </div>
        <img
          className="max-w-xl"
          src="src/assets/blog-post-amico.svg"
          alt="NA"
        />
      </div>
    </div>
  );
};

export default LandingPage;
