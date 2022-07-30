import { Router } from "express";
import { ce } from "~/lib/captureError";
import {
  handleCreateSpace,
  handleDeleteSpace,
  handleGetAllSpaces,
  handleGetSpaceById,
  handleUpdateSpaceById,
} from "./controller";

export const router = Router();

//CRUD routes
router.get("/", ce(handleGetAllSpaces));
router.get("/:id", ce(handleGetSpaceById));
router.post("/", ce(handleCreateSpace));
router.patch("/:id", ce(handleUpdateSpaceById));
router.delete("/:id", ce(handleDeleteSpace));

export default router;
