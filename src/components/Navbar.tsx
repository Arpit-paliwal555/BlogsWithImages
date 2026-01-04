import type { FunctionComponent } from "react"
interface NavbarProps{

}
const Navbar: FunctionComponent<NavbarProps> = ()=>{
    return(
        <nav className="flex justify-between p-4 border-2">
            <div className="flex gap-1 items-center">
                <img className="w-10 h-10" src="src\assets\blog.svg" alt="NA" />
                <h1>Blog & Images</h1>
            </div>
            <div className="flex gap-2 items-center">
                <a href="">Home</a>
                <a href="">My Account</a>
                <a href="">Options</a>
            </div>
        </nav>
    )
}
export default Navbar;