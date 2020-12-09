import { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send("Invalid Credentials");
};

export { requireAuth };
