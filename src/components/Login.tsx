import{ type FunctionComponent } from "react";
import {useFormik, type FormikHelpers} from "formik";
import axios, { type AxiosResponse } from "axios";
interface LoginFormProps {
    
}
interface Values{
    username:string,
    password:string
}
const LoginForm: FunctionComponent<LoginFormProps> = () => {
    const formik = useFormik<Values>({
        initialValues:{username:"", password:""},
        validate:(values)=>{
            const errors:Partial<Record<keyof Values,string>> = {};

            if(!values.username){
                errors.username = "Username is Required!"
            }else if(values.username.length<3){
                errors.username = "Username must be at least 3 characters!"
            }

            if(!values.password){
                errors.password = "Enter your Password"
            }        
            return errors;
        }, onSubmit: (values, {setSubmitting}: FormikHelpers<Values>)=>{
            // api call
            axios.post(`${import.meta.env.BACKEND_URL}/signin`, values)
            .then(()=>{
                alert("Login Successful!");});
            
        }})

    return ( 
        <div className="border-2 h-screen mt-0.5 p-2 flex flex-col items-center justify-center">
        <div className="w-2xs">
        <h1 className="text-bold text-2xl ml-26">Log In</h1>
        <form action="submit" onSubmit={formik.handleSubmit} className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                className="border p-1 rounded-md"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
            />
            {formik.errors.username && formik.touched.username && (
            <div className="text-red-600 text-sm">{formik.errors.username}</div>
            )}
            <label htmlFor="password">Password</label>
            <input
                type="password"
                className="border p-1 rounded-md"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
            <div className="text-red-600 text-sm">{formik.errors.password}</div>
            )}
            <button type="submit" className="bg-gray-950 text-cyan-50 rounded-md p-1 mt-4">Log In</button>
            <p className="ml-6">don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
        </form>
    </div>
    </div>);
}
 
export default LoginForm;