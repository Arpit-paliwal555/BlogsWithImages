
import { Formik, useFormik, type FormikHelpers } from "formik";
import type { FunctionComponent } from "react";
import { api } from "../services/api";

type CreateBlogProps = {};
interface Values{
    title:string,
    description:string
}
const CreateBlog: FunctionComponent<CreateBlogProps> = () => {
  const formik = useFormik<Values>({
    initialValues: {title:"", description:""},
    validate:(values)=>{
      const errors:Partial<Record<keyof Values, string>> = {};

      if(!values.title){
        errors.title = "Title is Required!";
      }else if(!values.description){
        errors.description = "Description is Required!"
      }
      return errors
    },
    onSubmit: async(values, {setSubmitting}:FormikHelpers<Values>)=>{
        try{
          const baseUrl = import.meta.env.VITE_BACKEND_URL;
          if(!baseUrl){
            alert("Backend URL is not defined. Please set VITE_BACKEND_URL in your environment variables.");
            return;
          }
          // Make API call to publish the blog post
          const res = await api.post("/api/blogs", values, {withCredentials: true});
          alert("Blog published successfully!");
          formik.resetForm();
        }catch(error){
          alert("An error occurred while publishing the blog.");
        }finally{
          setSubmitting(false);
        }
      
    }
  })
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form action='submit' onSubmit={formik.handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-200  backdrop-blur shadow-xl ring-1 ring-black/5 dark:ring-white/5
                   p-6 sm:p-8 space-y-6 transition-shadow"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="dancing-script text-3xl sm:text-4xl font-semibold tracking-tight ">
            Publish New Blog
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Share your thoughts with the world 🌍
          </p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium "
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g., 7 Lessons from Side Projects"
            className="w-full rounded-xl border 
                       px-3.5 py-2.5 
                       shadow-sm focus:outline-none focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500
                       dark:focus:ring-cyan-400/20 dark:focus:border-cyan-400 transition"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-xs text-red-500">{formik.errors.title}</p>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Keep it concise and descriptive.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium "
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={6}
            placeholder="Write your story..."
            className="w-full resize-y rounded-xl border 
                       px-3.5 py-3 
                       shadow-sm focus:outline-none focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500
                       dark:focus:ring-cyan-400/20 dark:focus:border-cyan-400 transition"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-xs text-red-500">{formik.errors.description}</p>
          )}
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Markdown supported (optional).
            </p>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Min. 100 characters
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700
                       bg-transparent px-4 py-2.5
                       hover:bg-slate-50 active:scale-[0.99]
                       transition-colors"
          >
            Save draft
          </button>

          <button
            type="submit"
            className="group flex-1 inline-flex items-center justify-center gap-2 rounded-xl
                       bg-slate-500 text-white
                       px-4 py-2.5 font-medium shadow-sm hover:shadow-md
                       hover:bg-slate-800
                       active:scale-[0.99] transition
                       focus-visible:outline-none focus-visible:ring-4
                       focus-visible:ring-cyan-500/30"
          >
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
              <path d="M22 2L11 13"></path>
              <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
            Publish
          </button>
        </div>

        {/* Subtle footer note */}
        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
          By publishing, you agree to our community guidelines.
        </p>
      </form>
    </div>
  );
};

export default CreateBlog;
``
