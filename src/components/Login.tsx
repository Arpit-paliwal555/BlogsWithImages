import { useState, type FunctionComponent } from "react";
interface LoginFormProps {
    
}
 
const LoginForm: FunctionComponent<LoginFormProps> = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const changePassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }
    const changeUsername = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value)
    }
    return ( 
        <div className="border-2 h-screen mt-0.5 p-2 flex flex-col items-center justify-center">
        <div className="w-2xs">
        <h1 className="text-bold text-2xl ml-26">Log In</h1>
        <form action="submit" className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                value={username}
                onChange={changeUsername}
                className="border p-1 rounded-md"
            />
            <label htmlFor="password">Password</label>
            <input
                type="text"
                value={password}
                onChange={changePassword}
                className="border p-1 rounded-md"
            />
            <button type="submit" className="bg-gray-950 text-cyan-50 rounded-md p-1 mt-4">Log In</button>
            <p className="ml-6">don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
        </form>
    </div>
    </div>);
}
 
export default LoginForm;