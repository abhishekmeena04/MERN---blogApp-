import mongoose from "mongoose";
// import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // remove duplicate
      // validate: [validator.isEmail, "Please enter a valid email.!"],
    },
    phone: {
      type: Number,
      unique: true,
      required: true, // 0 means user - 1 means admin
    },
    photo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    education: {
      type: String,
      required: true, // 0 means user - 1 means admin
    },
    role: {
      type: String,
      required: true, // 0 means user - 1 means admin
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    token: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
