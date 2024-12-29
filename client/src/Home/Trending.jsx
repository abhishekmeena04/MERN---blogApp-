import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 px-4 text-gray-800">
        🌟 Trending Blogs
      </h1>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        customTransition="all 0.5s ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element) => {
            return (
              <div
                key={element._id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 mx-2"
              >
                <Link to={`/blog/${element._id}`} aria-label={`Read ${element.title}`}>
                  <div className="relative">
                    <img
                      src={element.blogImage.url}
                      alt={`Image for ${element.title}`}
                      className="w-full h-56 object-cover rounded-t-lg"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {element.category}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-b-lg h-36 flex flex-col justify-between">
                    <h1
                      className="text-lg font-bold mb-2 truncate"
                      title={element.title}
                    >
                      {element.title}
                    </h1>
                    <div className="flex items-center">
                      <img
                        src={element.adminPhoto}
                        alt={`${element.adminName}'s avatar`}
                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                      />
                      <p className="ml-3 text-gray-600 text-sm font-medium">
                        {element.adminName}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
            No blogs available at the moment. Check back later!
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
