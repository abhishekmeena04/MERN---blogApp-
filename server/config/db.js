import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`connected to mongoDB ${con.connection.host}`);
  } catch (error) {
    console.log(`mongoDB connection error - ${error}`);
  }
};

export default connectDB;
