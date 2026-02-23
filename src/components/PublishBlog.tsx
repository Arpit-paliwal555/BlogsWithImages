import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";

interface Values {
  title: string;
  description: string;
  imageUrl?: string;
  userId: string | number;
}

export default function CreateBlog() {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <p className="text-red-500 text-center">You must be logged in to publish a blog.</p>;
  }

  const { user } = auth;

  if (!user)
    return <p className="text-red-500 text-center">User info missing, please login again.</p>;

  return (
    <div className="min-h-screen flex  flex-col items-center justify-center p-6">
      <Formik
        initialValues={{
          title: "",
          description: "",
          imageUrl: "",
          userId: user.id,
        }}
        enableReinitialize
        validate={(values) => {
          const errors: Partial<Record<keyof Values, string>> = {};
          if (!values.title) errors.title = "Title is required!";
          if (!values.description) errors.description = "Description is required!";
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("userId", values.userId.toString());
            if (values.imageUrl) {
              formData.append("image", values.imageUrl);
            }
            await api.post("/api/blogs", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            });
            alert("Blog published successfully!");
            resetForm();
          } catch (e) {
            alert("Error publishing blog.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="w-full max-w-md p-6 rounded-xl shadow-lg space-y-6">
            <h1 className="text-2xl font-bold text-center">Publish Blog</h1>
            <div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                    if (file) {
                      setFieldValue("imageUrl", file); // store the file object, not base64
                    }
                }}
                className="hidden"
                ref={useRef<HTMLInputElement | null>(null)}
              />

              <label htmlFor="image-upload" className="border-2 border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer block">
                {values.imageUrl ? (
                  <img src={values.imageUrl} alt="Preview" className="max-h-40 object-contain" />
                ) : (
                  <img src="/src/assets/camera.svg" alt="Upload Image" className="w-12 h-12" />
                )}
              </label>
            </div>
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <Field
                name="title"
                type="text"
                placeholder="Your blog title"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-xs text-red-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                name="description"
                rows={6}
                placeholder="Write your story"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-xs text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Publish
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}