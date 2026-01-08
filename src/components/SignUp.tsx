import { useState, type FunctionComponent } from "react";
interface SignupFormProps {
    
}
 
const SignupForm: FunctionComponent<SignupFormProps> = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");

    const changeUsername = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value)
    }
    const changePassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }
    const changeName = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value);
    }
    
    return (
     <div className="border-2 h-screen mt-0.5 p-2 flex flex-col items-center justify-center">
        <h1 className="text-bold text-2xl">Sign Up</h1>
        <form action="submit" className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                value={username}
                onChange={changeUsername}
                className="border p-1 rounded-md"
            />
            <label htmlFor="name">Display Name</label>
            <input
                type="text"
                value={name}
                onChange={changeName}
                className="border p-1 rounded-md"
            />
            
            <label htmlFor="password">Password</label>
            <input
                type="text"
                value={password}
                onChange={changePassword}
                className="border p-1 rounded-md"
            />
            <button type="submit" className="bg-gray-950 text-cyan-50 rounded-md p-1 mt-4">Sign Up</button>
        </form>
    </div> );
}
 
export default SignupForm;