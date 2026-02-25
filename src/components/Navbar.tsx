import type { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
interface NavbarProps{

}
const baseLink =
  "px-3 py-1 rounded hover:bg-white/10 transition-colors";
const activeLink =
  "text-white font-semibold underline underline-offset-4";

const Navbar: FunctionComponent<NavbarProps> = ()=>{

    return(
        <nav className="flex justify-between p-4 border-2 bg-linear-to-r from-[#d1d5db] via-[#6b7280] to-[#374151]">
            <div className="flex gap-1 items-center">
                <img className="w-10 h-10" src="src\assets\blog.svg" alt="NA" />
                <h1 className="dancing-script text-2xl">Blog & Images</h1>
            </div>
            <div className="flex gap-2 w-1/3 items-center">
                <NavLink
                    to='/home'
                    end
                    className={({isActive})=>
                    `${baseLink} ${isActive ? activeLink : "text-gray-300"  }`}
                    aria-label="Home">
                    Home
                </NavLink>
                <NavLink
                    to="/my-blogs"
                    className={({ isActive }) =>
                        `${baseLink} ${isActive ? activeLink : "text-white/80"}`
                    }
                    aria-label="My Blogs"
                    >
                    My Blogs
                </NavLink>
                <NavLink
                    to="/options"
                    className={({ isActive }) =>
                        `${baseLink} ${isActive ? activeLink : "text-white/80"}`
                    }
                    aria-label="Options"
                    >
                    Options
                </NavLink>                
                <NavLink
                to="/publish"
                className="border-2 rounded-sm w-1/5 p-2 cursor-pointer text-white/80 inline-flex justify-between items-center"
                >
                Publish
                <svg
                    className="size-4 opacity-80 group-hover:opacity-100"
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
        </nav>
    )
}
export default Navbar;