import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXP,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  await userModel.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookie;
