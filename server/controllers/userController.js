import userModel from "../models/userModel.js";
// image upload
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
// jwt
import createTokenAndSaveCookie from "../jwt/AuthToken.js";

export const registerController = async (req, res) => {
  try {
    // Validate photo and data fields
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({ message: "Invalid photo format" });
    }

    const {
      name,
      email,
      password,
      education,
      role = "admin",
      phone,
    } = req.body;
    if (!name || !email || !password || !education || !role || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Cloudinary upload
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ message: "Failed to upload photo." });
    }

    // Password hashing
    const hashPassword = await bcrypt.hash(password, 8);

    // Create user
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
      phone,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });

    // Save user and generate token
    await newUser.save();
    const token = await createTokenAndSaveCookie(newUser._id, res);
    res.status(201).json({ message: "User registered successfully!", token });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await userModel.findOne({ email }).select("+password");
    console.log(user);
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }
    let token = await createTokenAndSaveCookie(user._id, res);
    console.log("Login: ", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
export const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error.!" });
  }
};

export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};

export const getAdmins = async (req, res) => {
  const admins = await userModel.find({ role: "admin" });
  res.status(200).json({ admins });
};
