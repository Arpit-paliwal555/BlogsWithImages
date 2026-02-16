import{ type FunctionComponent } from "react";
import {useFormik, type FormikHelpers} from "formik";
import axios, { type AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface LoginFormProps {
    
}
interface Values{
    email:string,
    password:string
}
const LoginForm: FunctionComponent<LoginFormProps> = () => {
    const navigate = useNavigate();
    const formik = useFormik<Values>({
        initialValues:{email:"", password:""},
        validate:(values)=>{
            const errors:Partial<Record<keyof Values,string>> = {};

            if(!values.email){
                errors.email = "email is Required!"
            }else if(values.email.length<3){
                errors.email = "email must be at least 3 characters!"
            }

            if(!values.password){
                errors.password = "Enter your Password"
            }        
            return errors;
        }, onSubmit: async(values, {setSubmitting}: FormikHelpers<Values>)=>{
            try{
                const baseUrl = import.meta.env.VITE_BACKEND_URL;
                if(!baseUrl){
                    alert("Backend URL is not defined. Please set VITE_BACKEND_URL in your environment variables.");
                    return;
                }

                const res = await api.post("/api/users/signin", values, {withCredentials: true});
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
            
        }})

    return ( 
        <div className="border-2 h-screen mt-0.5 p-2 flex flex-col items-center justify-center">
        <div className="w-2xs">
        <h1 className="text-bold text-2xl ml-26">Log In</h1>
        <form action="submit" onSubmit={formik.handleSubmit} className="flex flex-col">
            <label htmlFor="email">email</label>
            <input
                id="email"
                name="email"
                type="text"
                className="border p-1 rounded-md"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
            <div className="text-red-600 text-sm">{formik.errors.email}</div>
            )}
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                className="border p-1 rounded-md"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
            <div className="text-red-600 text-sm">{formik.errors.password}</div>
            )}
            <button type="submit" className="bg-gray-950 text-cyan-50 rounded-md p-1 mt-4 cursor-pointer">Log In</button>
            <p className="ml-6">don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
        </form>
    </div>
    </div>);
}
 
export default LoginForm;