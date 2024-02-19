import { Response } from "express";
import ErrorWithCode from "../errors/ErrorWithCode";

export default async function FailResponse(
  response: Response,
  codeToExecute: () => void | Promise<void>
) {
  try {
    await codeToExecute();
  } catch (error: any) {
    response
      .status(error instanceof ErrorWithCode ? error.statusCode : 500)
      .json({
        message: error.message,
      });
  }
}
