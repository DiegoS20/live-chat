export default class ErrorWithCode extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}
