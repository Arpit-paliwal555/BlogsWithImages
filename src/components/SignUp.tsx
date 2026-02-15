import { type FunctionComponent } from "react";
import { useFormik, type FormikHelpers } from "formik";
import axios, { type AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface SignupFormProps {}

interface Values {
  username: string;
  email: string;
  password: string;
}

const SignupForm: FunctionComponent<SignupFormProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik<Values>({
    initialValues: { username: "", email: "", password: "" },
    validate: (values) => {
      const errors: Partial<Record<keyof Values, string>> = {};

      if (!values.username) {
        errors.username = "Username is required";
      } else if (values.username.length < 3) {
        errors.username = "Username must be at least 3 characters";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }: FormikHelpers<Values>) => {
      // TODO: replace with your API call
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
        const res = await axios.post(`${baseUrl}/api/users/signup`, values);

        navigate("/home", {replace:true});
      } catch (error) {
        if(axios.isAxiosError(error)){
          const msg = error.response?.data?.message || "an axios error occured";
          alert(msg)
        }
      }finally{
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="border-2 h-screen mt-0.5 p-2 flex flex-col items-center justify-center">
      <div className="w-2xs">
        <h1 className="font-bold text-2xl text-center">Sign Up</h1>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 mt-4">
          {/* Username */}
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            className="border p-1 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            autoComplete="username"
          />
          {formik.errors.username && formik.touched.username && (
            <div className="text-red-600 text-sm">{formik.errors.username}</div>
          )}

          {/* Email */}
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="border p-1 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            autoComplete="email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-600 text-sm">{formik.errors.email}</div>
          )}

          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="border p-1 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            autoComplete="new-password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-600 text-sm">{formik.errors.password}</div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-gray-950 text-cyan-50 rounded-md p-1 mt-4 disabled:opacity-60 cursor-pointer"
          >
            {formik.isSubmitting ? "Submitting..." : "Sign Up"}
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
``