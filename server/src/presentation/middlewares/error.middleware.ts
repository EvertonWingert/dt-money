import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../../core/errors/not-found.error';

export function errorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!(error instanceof Error)) {
    return response.status(500).json({
      message: 'An error occurred',
    });
  }

  if (error instanceof NotFoundError) {
    return response.status(404).json({
      message: error.message,
    });
  }
}
