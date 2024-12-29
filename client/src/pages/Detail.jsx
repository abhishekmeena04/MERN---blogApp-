import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setblogs] = useState({});
  console.log(blogs);

  useEffect(() => {
    const fetchblogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        setblogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblogs();
  }, [id]);

  return (
    <div className="bg-gray-50 py-8">
      {blogs && (
        <section className="container mx-auto px-4 md:px-8">
          <div className="text-blue-600 uppercase text-xs font-semibold tracking-wide mb-4">
            {blogs?.category}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            {blogs?.title}
          </h1>
          <div className="flex items-center mb-6">
            <img
              src={blogs?.adminPhoto}
              alt="author_avatar"
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <p className="text-lg font-medium text-gray-800">{blogs?.adminName}</p>
          </div>

          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0">
            {blogs?.blogImage && (
              <img
                src={blogs?.blogImage?.url}
                alt="mainblogsImg"
                className="md:w-1/2 w-full h-[400px] md:h-[500px] rounded-lg shadow-lg cursor-pointer border transition-transform transform hover:scale-105 duration-300 ease-in-out"
              />
            )}
            <div className="md:w-1/2 w-full md:pl-6">
              <p className="text-lg text-gray-700 mb-6">{blogs?.about}</p>
              {/* Add more content here if needed */}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Detail;
