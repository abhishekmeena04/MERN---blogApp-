import React from "react";
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="border-t py-10 bg-gray-900 text-gray-300">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* Categories Section */}
          <div className="text-center sm:text-start">
            <h2 className="text-lg font-semibold mb-4 text-white hover:text-blue-500 transition-all duration-300">
              Categories
            </h2>
            <ul className="space-y-2">
              {["Technology", "Lifestyle", "Travel", "Food", "Health"].map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div className="text-center sm:text-start">
            <h2 className="text-lg font-semibold mb-4 text-white hover:text-blue-500 transition-all duration-300">
              Resources
            </h2>
            <ul className="space-y-2">
              {["About Us", "Contact Us", "Privacy Policy", "Terms of Service"].map((resource) => (
                <li key={resource}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200"
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags Section */}
          <div className="text-center sm:text-start">
            <h2 className="text-lg font-semibold mb-4 text-white hover:text-blue-500 transition-all duration-300">
              Popular Tags
            </h2>
            <ul className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {["React", "JavaScript", "CSS", "Node.js", "Travel", "Health"].map((tag) => (
                <li key={tag}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 px-2 py-1 border border-gray-400 rounded-full transition duration-200"
                  >
                    #{tag}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected Section */}
          <div className="text-center sm:text-start">
            <h2 className="text-lg font-semibold mb-4 text-white hover:text-blue-500 transition-all duration-300">
              Stay Connected
            </h2>
            <p className="text-gray-400 mb-4">
              Follow us on social media for the latest updates!
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              {[
                { icon: <FaGithub />, link: "#" },
                { icon: <FaFacebook />, link: "#" },
                { icon: <BsTwitter />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110 duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-6 bg-gray-800">
        <div className="text-xl font-semibold mb-4 md:mb-0 text-center">
          Blog<span className="text-blue-500 font-bold">Sphere</span>
        </div>
        <div className="text-gray-400 text-sm text-center md:text-left">
          <p>&copy; 2024 BlogSphere. All rights reserved.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-6">
          {[
            { icon: <FaGithub />, link: "#" },
            { icon: <FaFacebook />, link: "#" },
            { icon: <BsTwitter />, link: "#" },
            { icon: <FaInstagram />, link: "#" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110 duration-200"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Footer;
