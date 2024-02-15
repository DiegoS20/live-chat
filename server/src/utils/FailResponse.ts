import { Response } from "express";

export default async function FailResponse(
  response: Response,
  codeToExecute: () => void | Promise<void>
) {
  try {
    await codeToExecute();
  } catch (error: any) {
    response
      .json({
        message: error.message,
      })
      .status(error.statusCode || 500);
  }
}
