import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { TLoginFields, TUserAccountInfo } from "../types";
import FailResponse from "../utils/FailResponse";
import ErrorWithCode from "../errors/ErrorWithCode";

export default class UserController {
  /**
   * POST: /register
   */
  public static async register(request: Request, response: Response) {
    await FailResponse(response, async () => {
      const body = request.body as TUserAccountInfo;
      const { password, ...accountInfo } = body;

      // Hashing password
      const salt = await bcrypt.genSalt(10);
      const _password = await bcrypt.hash(password, salt);

      await prisma.user.create({
        data: {
          ...accountInfo,
          password: _password,
        },
      });

      response.sendStatus(201);
    });
  }

  /**
   * POST: /login
   */
  public static async login(request: Request, response: Response) {
    await FailResponse(response, async () => {
      const ERROR_MESSAGE = "Incorrect credentials";
      const { email, password: reqPassword } = request.body as TLoginFields;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user == null) throw new ErrorWithCode(404, ERROR_MESSAGE);

      const passwordValid = await bcrypt.compare(reqPassword, user.password);
      if (!passwordValid) throw new ErrorWithCode(401, ERROR_MESSAGE);

      const { password, ..._user } = user;
      const token = jwt.sign(_user, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "7d",
      });
      response.json({
        message: "User logged in successfully",
        data: {
          token,
        },
      });
    });
  }
}
