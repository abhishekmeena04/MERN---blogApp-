import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setBlogImage(data?.blogImage.url);
      } catch (error) {
        toast.error("Error fetching blog data!");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog updated successfully!");
      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto my-12 p-6">
      <section className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105">
        <h3 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Update Your Blog
        </h3>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="mb-4">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Category
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Blog Main Title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Blog Image
            </label>
            <div className="relative">
              <img
                src={
                  blogImagePreview
                    ? blogImagePreview
                    : blogImage
                    ? blogImage
                    : "/imgPL.webp"
                }
                alt="Blog"
                className="w-full h-48 object-cover mb-4 rounded-md transition-transform transform hover:scale-105"
              />
              <input
                type="file"
                className="w-full p-3 border border-gray-300 rounded-md absolute bottom-0 left-0 opacity-0 cursor-pointer"
                onChange={changePhotoHandler}
              />
            </div>
          </div>

          <div className="mb-4">
            <textarea
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Something about your blog (at least 200 characters)"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Update Blog
          </button>
        </form>
      </section>
    </div>
  );
}

export default UpdateBlog;
