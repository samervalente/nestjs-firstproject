export class NotFoundError extends Error {
  constructor(message: string) {
    super(JSON.stringify({ message, statusCode: 404 }));
  }
}
