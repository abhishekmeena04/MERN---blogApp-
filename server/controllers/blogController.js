import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import { v2 as cloudinary } from "cloudinary";
export const createBlog = async (req, res) => {
  try {
    // 1.1
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }
    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo formate. Only jpg and png are allowed",
      });
    }
    // 1
    const { title, category, about } = req.body;

    // 2
    if (!title || !category || !about) {
      return res.status(400).json({ message: "All fields are required.!" });
    }

    // 7
    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    //4.1
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

    // 4
    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };
    // 5
    const blog = await blogModel.create(blogData);

    res.status(201).json({
      message: "Blog created successfully.!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error.!" });
  }
};

export const deleteBlog = async (req, res) => {
  // 1
  const { id } = req.params;

  // 2
  const blog = await blogModel.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // 3
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully.!" });
};

export const getAllBlogs = async (req, res) => {
  const allBlogs = await blogModel.find();
  res.status(200).json(allBlogs);
};

export const getSingleBlogs = async (req, res) => {
  // 1
  const { id } = req.params;

  // 2
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog Id" });
  }

  // 3
  const blog = await blogModel.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};

export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await blogModel.find({ createdBy });
  res.status(200).json(myBlogs);
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Blog not found.!" });
  }
  const updateBlogs = await blogModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateBlogs) {
    return res.status(404).json({ message: "Blog not found.!" });
  }
  res.status(200).json(updateBlogs);
};
