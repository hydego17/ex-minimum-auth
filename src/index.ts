import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import { router } from "./routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["hyde3207Yif8ew8"] }));

app.use(router);

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
