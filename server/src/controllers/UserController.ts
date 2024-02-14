import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import { TUser } from "../types";

export default class UserController {
  /**
   * POST: /register
   */
  public static async register(request: Request, response: Response) {
    try {
      const body = request.body as TUser;
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
    } catch (error: any) {
      response
        .json({
          message: error.message,
        })
        .status(500);
    }
  }
}
