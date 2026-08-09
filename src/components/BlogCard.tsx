import type { FunctionComponent } from "react";
import type { IBlogpost } from "../interfaces/IBlogPost";


 
const BlogCard: FunctionComponent<IBlogpost> = (props:IBlogpost) => {
    const {title, description, publishedAt} = props;
    const {imageUrl} = props;
    const {user} = props;
    const date = new Date(publishedAt);
    const prettyDate = date.toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

    return (
        
<article
      className={[
        // Container: borderless, subtle divider, smooth hover bg
        "w-full px-4 py-3",
        "transition-colors duration-200",
        "hover:bg-slate-800/40", // for dark themes; change to slate-100 for light
        "border-b border-white/10 last:border-b-0", // like Twitter list divider
        "rounded-none", // tweets aren't cardy; remove big rounding
      ].join(" ")}
    >
      {/* Header row: avatar, name/handle, timestamp */}
      <header className="flex items-start gap-3">
        {/* Avatar (fallback to first letter if no avatar) */}
        <div className="h-10 w-10 shrink-0 rounded-full bg-white/10 overflow-hidden grid place-items-center text-sm font-semibold">
            <span className="uppercase">{user?.username?.[0] ?? "U"}</span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + handle + dot + time */}
          <div className="flex items-center gap-1 text-sm">
            <span className="font-semibold truncate">{user?.username}</span>
            <span className="text-white/40">·</span>
            <time className="text-white/60">{prettyDate}</time>
          </div>

          {/* Title as link‑like accent */}
          <h2 className="mt-1 text-base font-semibold leading-tight">
            <span className="text-twitter hover:underline decoration-twitter">
              {title}
            </span>
          </h2>

          {/* Body/description — tweet text style */}
          <p className="mt-1 text-[15px] leading-6 text-white/90">
            {description}
          </p>

          {/* Media (optional) */}
          {imageUrl && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${imageUrl}`}
                alt={title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Footer: lightweight meta/actions row (optional) */}
          <div className="mt-3 flex items-center gap-4 text-sm text-white/60">
            <a
              href="#"
              className="hover:text-twitter transition-colors underline decoration-transparent hover:decoration-twitter underline-offset-4"
              aria-label="Read more"
            >
              Read more
            </a>
            <span className="text-white/30">·</span>
            <span className="truncate">By {user?.username}</span>
          </div>
        </div>
      </header>
    </article>

    );
}
 
export default BlogCard;