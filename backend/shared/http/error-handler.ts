import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../errors/app-error.ts';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  void _next;
  if (error instanceof ZodError) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: error.flatten(),
      },
    });
    return;
  }

  if (
    error instanceof SyntaxError &&
    'status' in error &&
    error.status === 400
  ) {
    res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'Request body is not valid JSON',
      },
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.status).json({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details === undefined ? {} : { details: error.details }),
      },
    });
    return;
  }

  console.error('Unhandled API error:', error);
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Internal server error' },
  });
};
