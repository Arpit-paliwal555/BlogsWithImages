import { useContext, useState, type FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
interface NavbarProps {
    landingPage?: boolean;
}
const baseLink =
    "px-3 py-1 rounded hover:bg-white/10 transition-colors";
const activeLink =
    "text-white font-semibold underline underline-offset-4 decoration-[#1DA1F2]";

const Navbar: FunctionComponent<NavbarProps> = ({ landingPage = false }) => {
    const [open, setOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [signOutError, setSignOutError] = useState("");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        setIsSigningOut(true);
        setSignOutError("");
        try {
            await api.post("/api/users/logout", {}, { withCredentials: true });
            auth?.setUser(null);
            setAccountMenuOpen(false);
            navigate("/login", { replace: true });
        } catch {
            setSignOutError("Sign out failed. Please try again.");
        } finally {
            setIsSigningOut(false);
        }
    };

    return (
        <nav className={`relative z-50 flex h-[72px] w-full shrink-0 items-center justify-between border-b p-4 ${landingPage ? "border-white/15 bg-[#1c2028] text-white" : "bg-white shadow dark:bg-black/80"}`}>
            <div className="flex items-center gap-2">
                <img className="w-10 h-10" src="/src/assets/blog-white.svg" alt="Logo" />
                <h1 className={`dancing-script text-2xl ${landingPage ? "text-white" : "text-zinc-800 dark:text-white"}`}>Blog &amp; Images</h1>
            </div>

            {/* Hamburger (mobile) */}
            <button
                className={`sm:hidden inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${landingPage ? "text-white hover:bg-white/10" : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"}`}
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
                        `${baseLink} ${isActive ? activeLink : landingPage ? "text-white/80" : "text-zinc-600 dark:text-zinc-300"}`
                    }
                    aria-label="Home"
                >
                    Home
                </NavLink>

                <NavLink
                    to="/my-blogs"
                    className={({ isActive }) =>
                        `${baseLink} ${isActive ? activeLink : landingPage ? "text-white/80" : "text-zinc-600 dark:text-zinc-300"}`
                    }
                    aria-label="My Blogs"
                >
                    My Blogs
                </NavLink>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `${baseLink} ${isActive ? activeLink : landingPage ? "text-white/80" : "text-zinc-600 dark:text-zinc-300"}`
                    }
                    aria-label="Options"
                >
                    Options
                </NavLink>

                <NavLink
                    to="/publish"
                    className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 transition-colors ${landingPage ? "border-white/30 text-white hover:bg-white/10" : "cursor-pointer text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"}`}
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

            <div className="relative flex items-center gap-2">
                {auth?.isLoading ? (
                    <NavLink
                        to="/login"
                        aria-label="Sign in"
                        title="Sign in"
                        className={`inline-flex items-center justify-center rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${landingPage ? "text-white hover:bg-white/10" : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"}`}
                    >
                        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M10 17l5-5-5-5" />
                            <path d="M15 12H3" />
                            <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                        </svg>
                    </NavLink>
                ) : auth?.user ? (
                    <>
                        <button
                            type="button"
                            aria-label="Account"
                            aria-expanded={accountMenuOpen}
                            aria-controls="account-menu"
                            title="Account"
                            onClick={() => {
                                setAccountMenuOpen((isOpen) => !isOpen);
                                setSignOutError("");
                            }}
                            className={`inline-flex items-center justify-center rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${landingPage ? "text-white hover:bg-white/10" : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"}`}
                        >
                            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M5 21a7 7 0 0 1 14 0" />
                            </svg>
                        </button>
                        {accountMenuOpen && (
                            <div
                                id="account-menu"
                                className={`absolute right-0 top-full z-50 mt-2 min-w-44 rounded-md border p-2 shadow-lg ${landingPage ? "border-white/15 bg-[#1c2028] text-white" : "border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"}`}
                            >
                                <p className="truncate px-2 py-1 text-sm" title={auth.user.name}>{auth.user.name}</p>
                                {signOutError && <p className="px-2 py-1 text-sm text-red-500" role="alert">{signOutError}</p>}
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isSigningOut}
                                    className="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm hover:bg-zinc-100 disabled:opacity-60 dark:hover:bg-zinc-800"
                                >
                                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M10 17l5-5-5-5" />
                                        <path d="M15 12H3" />
                                        <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                                    </svg>
                                    {isSigningOut ? "Signing out..." : "Sign out"}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <NavLink
                        to="/login"
                        aria-label="Sign in"
                        title="Sign in"
                        className={`inline-flex items-center justify-center rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${landingPage ? "text-white hover:bg-white/10" : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"}`}
                    >
                        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M10 17l5-5-5-5" />
                            <path d="M15 12H3" />
                            <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                        </svg>
                    </NavLink>
                )}
            </div>

            {/* Mobile dropdown (collapsible) */}
            <div
                className={`sm:hidden absolute left-0 right-0 top-[72px] z-40 border-t backdrop-blur shadow ${landingPage ? "border-white/15 bg-[#1c2028]/95" : "bg-white/95 dark:bg-black/80"}
        transition-[max-height,opacity] duration-300 overflow-hidden 
        ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="flex flex-col p-3">
                    <NavLink
                        to="/home"
                        end
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `rounded-md px-3 py-2 ${isActive ? activeLink : landingPage ? "text-white/80" : "text-zinc-700 dark:text-zinc-200"}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/my-blogs"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `rounded-md px-3 py-2 ${isActive ? activeLink : landingPage ? "text-white/80" : "text-zinc-700 dark:text-zinc-200"}`
                        }
                    >
                        My Blogs
                    </NavLink>
                    <NavLink
                        to="/options"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `rounded-md px-3 py-2 ${isActive ? activeLink : landingPage ? "text-white/80" : "text-zinc-700 dark:text-zinc-200"}`
                        }
                    >
                        Options
                    </NavLink>
                    <NavLink
                        to="/publish"
                        onClick={() => setOpen(false)}
                        className={`mt-2 inline-flex items-center gap-2 rounded-md border px-3 py-2 ${landingPage ? "border-white/30 text-white hover:bg-white/10" : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"}`}
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