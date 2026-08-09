import { useState, type FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
interface NavbarProps {

}
const baseLink =
    "px-3 py-1 rounded hover:bg-white/10 transition-colors";
const activeLink =
    "text-white font-semibold underline underline-offset-4 decoration-[#1DA1F2]";

const Navbar: FunctionComponent<NavbarProps> = () => {
    const [open, setOpen] = useState(false);
    return (
        <nav className="flex w-full items-center justify-between p-4 border-b bg-white shadow dark:bg-black/80">
            <div className="flex items-center gap-2">
                <img className="w-10 h-10" src="/src/assets/blog-white.svg" alt="Logo" />
                <h1 className="dancing-script text-2xl text-zinc-800 dark:text-white">Blog &amp; Images</h1>
            </div>

            {/* Hamburger (mobile) */}
            <button
                className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                {/* Icon: three lines */}
                <svg className={`h-6 w-6 ${open ? "hidden" : "block"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Icon: X */}
                <svg className={`h-6 w-6 ${open ? "block" : "hidden"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
            </button>

            {/* Desktop links */}
            <div className="hidden sm:flex sm:items-center sm:gap-4">
                <NavLink
                    to="/home"
                    end
                    className={({ isActive }) =>
                        `${baseLink} ${isActive ? activeLink : "text-zinc-600 dark:text-zinc-300"}`
                    }
                    aria-label="Home"
                >
                    Home
                </NavLink>

                <NavLink
                    to="/my-blogs"
                    className={({ isActive }) =>
                        `${baseLink} ${isActive ? activeLink : "text-zinc-600 dark:text-zinc-300"}`
                    }
                    aria-label="My Blogs"
                >
                    My Blogs
                </NavLink>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `${baseLink} ${isActive ? activeLink : "text-zinc-600 dark:text-zinc-300"}`
                    }
                    aria-label="Options"
                >
                    Options
                </NavLink>

                <NavLink
                    to="/publish"
                    className="inline-flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Publish"
                >
                    Publish
                    <svg
                        className="size-4 opacity-80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M12 4v16"></path>
                        <path d="M4 12h16"></path>
                    </svg>
                </NavLink>
            </div>

            {/* Mobile dropdown (collapsible) */}
            <div
                className={`sm:hidden absolute left-0 right-0 top-[64px] z-40 border-t bg-white/95 backdrop-blur dark:bg-black/80 shadow
        transition-[max-height,opacity] duration-300 overflow-hidden 
        ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="flex flex-col p-3">
                    <NavLink
                        to="/home"
                        end
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `rounded-md px-3 py-2 ${isActive ? activeLink : "text-zinc-700 dark:text-zinc-200"}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/my-blogs"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `rounded-md px-3 py-2 ${isActive ? activeLink : "text-zinc-700 dark:text-zinc-200"}`
                        }
                    >
                        My Blogs
                    </NavLink>
                    <NavLink
                        to="/options"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `rounded-md px-3 py-2 ${isActive ? activeLink : "text-zinc-700 dark:text-zinc-200"}`
                        }
                    >
                        Options
                    </NavLink>
                    <NavLink
                        to="/publish"
                        onClick={() => setOpen(false)}
                        className="mt-2 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                        Publish
                        <svg
                            className="size-4 opacity-80"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 4v16"></path>
                            <path d="M4 12h16"></path>
                        </svg>
                    </NavLink>
                </div>
            </div>
        </nav>

    )
}
export default Navbar;