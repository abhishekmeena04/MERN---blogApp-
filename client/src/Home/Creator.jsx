import axios from "axios";
import React, { useEffect, useState } from "react";

const Creator = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/users/admins",
          { withCredentials: true }
        );
        setAdmins(data.admins);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto px-8 my-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Popular Creators
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {admins && admins.length > 0 ? (
          admins.slice(0, 8).map((creator) => (
            <div
              key={creator._id}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={creator.photo?.url}
                alt={creator.name}
                className="w-28 h-28 md:w-36 md:h-36 object-cover border-4 border-yellow-500 rounded-full shadow-sm"
                loading="lazy"
              />
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {creator.name}
                </p>
                <p className="text-sm text-gray-500 capitalize">{creator.role}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-gray-500">No creators found. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Creator;
