import { type FunctionComponent } from "react";
import { useFormik, type FormikHelpers } from "formik";
import axios from "axios";
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
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        await axios.post(`${baseUrl}/api/users/signup`, values, {withCredentials: true});

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
  
  // utility
  const hasErr = (name: keyof typeof formik.values) =>
    !!(formik.touched[name] && formik.errors[name]);

  return (
    <div className="border-2 h-screen mt-0.5 p-2 flex flex-col items-center justify-center">
      <div className="w-2xs">
        <h1 className="font-bold text-2xl text-center">Sign Up</h1>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1 mt-4">
          {/* Username */}
          <input
            id="username"
            name="username"
            type="text"
            className="border p-1 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            autoComplete="username"
            placeholder="Username"
            aria-invalid={hasErr("username")}
            aria-describedby="username-error"
          />
          <p id="username-error" className={`text-xs mt-0 h-4 leading-5 transition-colors duration-200 ${hasErr("username") ? "text-red-600" : "text-transparent"}`}
          aria-live="polite">
          {formik.touched.username && formik.errors.username
              ? formik.errors.username: ""}
          </p>

          {/* Email */}
          <input
            id="email"
            name="email"
            type="email"
            className="border p-1 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            autoComplete="email"
            placeholder="Email"
            aria-invalid={hasErr("email")}
            aria-describedby="email-error"
          />
          <p id="email-error" className={`text-xs mt-0 h-4 leading-5 transition-colors duration-200 ${hasErr("email") ? "text-red-600" : "text-transparent"}`}
          aria-live="polite">
          {formik.touched.email && formik.errors.email
              ? formik.errors.email: ""}
          </p>
          {/* Password */}
          <input
            id="password"
            name="password"
            type="password"
            className="border p-1 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            autoComplete="new-password"
            placeholder="Password"
            aria-invalid={hasErr("password")}
            aria-describedby="password-error"
          />
          <p id="password-error" className={`text-xs mt-0 h-4 leading-5 transition-colors duration-200 ${hasErr("password") ? "text-red-600" : "text-transparent"}`}
          aria-live="polite">
          {formik.touched.password && formik.errors.password
              ? formik.errors.password: "placeholder"}
          </p>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-gray-950 text-cyan-50 rounded-md p-1 mt-2 disabled:opacity-60 cursor-pointer"
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