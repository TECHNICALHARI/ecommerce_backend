import { Response } from "express";
import { User } from "../models/user.model";
import {
  catchErrors,
  errorResponse,
  successResponse,
} from "../utils/commonResponse";
import { ILoginInput, IRegisterInput } from "../validations/auth";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.utils";
import allMessages from "../utils/allMessages";

const authServices = {
  register: async (body: IRegisterInput, res: Response) => {
    try {
      const user = await User.findOne({ email: body.email });
      if (user) {
        return errorResponse(res, 400, "User already exists");
      }
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const newUser = new User({ ...body, password: hashedPassword });
      await newUser.save();
      const { password, ...sendUser } = newUser.toObject();
      successResponse(res, allMessages.auth.registerSuccess, { user: sendUser });
    } catch (error) {
      return catchErrors(res, error);
    }
  },

  Login: async (body: ILoginInput, res: Response) => {
    try {
      const user = await User.findOne({ email: body.email });
      if (!user || !(await bcrypt.compare(body.password, user.password))) {
        return errorResponse(res, 401, "Invalid Credentials");
      }
      const token = generateToken({ id: user._id, role: user.role });
      const { password, ...sendUser } = user.toObject();
      return { user: sendUser, token };
    } catch (error) {
      return catchErrors(res, error);
    }
  },
};

export default authServices;
