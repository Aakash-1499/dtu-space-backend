import { Request, Response, Router } from "express";
import spaceRouter from "./space";

const router = Router();

router.use("/space", spaceRouter);

router.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

export default router;
