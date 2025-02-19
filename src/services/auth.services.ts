import { Response } from "express";
import { User } from "../models/user.model";
import { ILoginInput, IRegisterInput } from "../validations/auth";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.utils";
import allMessages from "../utils/allMessages";
import { ApiError } from "../utils/ApiError";
import { statusCodes } from "../utils/statusCodes";

const authServices = {
  register: async (body: IRegisterInput) => {
    const user = await User.findOne({ email: body.email });
    if (user) {
      throw new ApiError(
        statusCodes.BAD_REQUEST,
        allMessages.auth.userAllreadyExist
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = new User({ ...body, password: hashedPassword });
    await newUser.save();
    const { password, ...sendUser } = newUser.toObject();
    return { user: sendUser };
  },

  Login: async (body: ILoginInput, res: Response) => {
    const user = await User.findOne({ email: body.email });
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new ApiError(
        statusCodes.UNAUTHORIZED,
        allMessages.auth.loginFailed
      );
    }
    const token = generateToken({ id: user._id, role: user.role });
    const { password, ...sendUser } = user.toObject();
    return { user: sendUser, token };
  },
};

export default authServices;
