import { Router, Request, Response } from "express";

import { requireAuth } from "../middlewares";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
  // Req Session
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
    <a href="/protected"> Protected Route </a>
      <h1>You are logged in</h1>
      <a href="/logout">Logout</a>
    </div>
    
    `);
  } else {
    res.send(`
    <div>
      <h1>You are not logged in</h1>
      <a href="/login">Login</a>
    </div>
  `);
  }
});

router.get("/login", (req: Request, res: Response) => {
  res.send(`
  <form method="POST">
    <div>
      <label>Email</label>
      <input name="email"/>
    </div>
    <div>
      <label>Password</label>
      <input type="password" name="password"/>
    </div>
    <button>Submit</button>
  </form>
  `);
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (
    email &&
    password &&
    email === "admin@example.com" &&
    password === "12345"
  ) {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("Invalid credentials");
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send(`
  <div>
    <h1> Welcome to protected route, Admin!</h1>
  </div>
  `);
});

export { router };
