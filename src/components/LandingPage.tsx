import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface LandingPageProps {}

const LandingPage: FunctionComponent<LandingPageProps> = () => {
  const navigate = useNavigate();
  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div
      className="
        bg-gradient-to-b from-[#8d8daa] via-[#dfdfde] to-[#f7f5f2]
        text-zinc-900
        min-h-[90vh] sm:min-h-[92vh] md:min-h-screen
        mt-0.5 p-4 md:p-6
      "
    >
      {/* Top bar: brand + quick links */}
      <div
        className="
          flex flex-col gap-3
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <h1 className="dancing-script text-3xl sm:text-4xl">Blog and Images</h1>

        {/* Quick links collapse into a row; on very small screens they stack nicely */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="px-3 py-1.5 rounded hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="button"
          >
            About
          </button>
          <button
            className="px-3 py-1.5 rounded hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="button"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Hero content */}
      <div
        className="
          mt-8 md:mt-12
          flex flex-col-reverse items-center gap-8
          md:flex-row md:items-center md:justify-between
          max-w-6xl mx-auto
        "
      >
        {/* Left: Text + CTA */}
        <div
          className="
            flex flex-col items-center text-center gap-5
            md:items-start md:text-left
            px-2 sm:px-3 md:px-0
            md:max-w-xl
          "
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
            Turn ideas into conversations.
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-zinc-700/90">
            Post blogs with images, discover inspiring content, and interact
            through likes and comments. Join now and make your mark!
          </p>

          <div className="w-full md:w-auto">
            <button
              className="
                w-full md:w-auto
                border-2 border-zinc-700/40 rounded-md
                px-6 py-3
                text-zinc-900 hover:bg-white/60
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              onClick={goToSignup}
              aria-label="Create account"
              type="button"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="
              w-full max-w-[520px]
              sm:max-w-[560px]
              md:max-w-[480px]
              lg:max-w-[560px]
              h-auto object-contain
            "
            src="/src/assets/blog-post-amico.svg"
            alt="Illustration of creating and sharing blog posts"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;