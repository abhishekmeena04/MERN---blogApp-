import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    blogImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
      minlength: [20, "Should contain atleast 200 character's"],
    },
    adminName: {
      type: String,
    },
    adminPhoto: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
