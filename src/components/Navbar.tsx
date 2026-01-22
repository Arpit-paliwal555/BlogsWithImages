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
                <h1>Blog & Images</h1>
            </div>
            <div className="flex gap-2 items-center">
                <NavLink
                    to='/'
                    end
                    className={({isActive})=>
                    `${baseLink} ${isActive ? activeLink : "text-gray-300"  }`}
                    aria-label="Home">
                    Home
                </NavLink>
                <NavLink
                    to="/account"
                    className={({ isActive }) =>
                        `${baseLink} ${isActive ? activeLink : "text-white/80"}`
                    }
                    aria-label="My Account"
                    >
                    My Account
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
            </div>
        </nav>
    )
}
export default Navbar;