import{ type FunctionComponent } from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

interface LoginFormProps {
    
}
interface Values{
    email:string,
    password:string
}
const LoginForm: FunctionComponent<LoginFormProps> = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    if(!auth){
        return <p className="text-center text-red-500">Auth context is not available. Please ensure you are within an AuthProvider.</p>;
    }
    const {setUser} = auth;
    
    return ( 
        <div className="border-2 h-screen mt-0.5 p-2 flex flex-col items-center justify-center">
        <div className="w-2xs">
        <h1 className="text-bold text-2xl ml-26">Log In</h1>
        <Formik
            initialValues={{
            email: "",
            password: ""
            }}
            enableReinitialize
            validate={(values) => {
            const errors: Partial<Record<keyof Values, string>> = {};
            if (!values.email) errors.email = "Email is required!";
            else if(values.email.length<3)errors.email = "email must be at least 3 characters!";
            if (!values.password) errors.password = "Password is required!";
            return errors;
            }}
            onSubmit={async (values, { setSubmitting}) => {
                       try{
                const baseUrl = import.meta.env.VITE_BACKEND_URL;
                if(!baseUrl){
                    alert("Backend URL is not defined. Please set VITE_BACKEND_URL in your environment variables.");
                    return;
                }

                const res = await api.post("/api/users/signin", values, {withCredentials: true});
                
                const me = await api.get("/api/users/me", {withCredentials: true});
                setUser(me.data);
                console.log("User data after login:", me.data); // Debugging line to check user data after login
                navigate("/home", {replace:true});
            }catch(error){
                if(axios.isAxiosError(error)){
                    const msg = error.response?.data?.message || "An error occurred during login.";
                    alert(msg);
                }else{
                    alert("An unexpected error occurred.");
                }
            }finally{
                setSubmitting(false);
            } 
            }}
        >
            
        {() => (
        <Form className="flex flex-col">
            <label htmlFor="email">Email</label>
            <Field
                name="email"
                type="text"
                className="border p-1 rounded-md"
            />
            <ErrorMessage
                name="email"
                component="p"
                className="text-xs text-red-500"
            />
            <label htmlFor="password">Password</label>
            <Field
                id="password"
                name="password"
                type="password"
                className="border p-1 rounded-md"
            />
            <ErrorMessage
                name="password"
                component="p"
                className="text-xs text-red-500"
            />
            <button type="submit" className="bg-gray-950 text-cyan-50 rounded-md p-1 mt-4 cursor-pointer">Log In</button>
            <p className="ml-6">don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
        </Form>
        )}
        </Formik>
        
    </div>
    </div>);
}
 
export default LoginForm;