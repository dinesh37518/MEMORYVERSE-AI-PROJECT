import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Optional auth header validation / session verification
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Permissive for development/guest endpoints while logging
  }
  next();
}
