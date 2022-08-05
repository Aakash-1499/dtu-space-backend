import Express from "express";
import cors from "cors";
import config from "./config";
import apiRouter from "./routes";

export const app = Express();

app.use(
  cors({
    origin: "*"
  })
);

app.use(Express.json());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send(
    'hello there, see the documentation here: <a href="" target="__blank">Link</a>'
  );
});
export default app;
