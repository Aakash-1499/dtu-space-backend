import { Prisma } from ".prisma/client";
import { Request, Response } from "express";
import prisma from "~/lib/prisma";
import { schema } from "./schema";

export const handleCreateSpace = async (req: Request, res: Response) => {
  const { error } = schema.validate(req.body);
  if (!error) {
    const { title, content, pdfUrl, category, subCategory, previewImage } =
      req.body;

    const newSpaceObject = {
      title,
      content,
      pdfUrl,
      category,
      subCategory,
      previewImage,
    };
    const space = await prisma.space.create({
      data: newSpaceObject,
    });
    return res.json({ data: space });
  }
  return res.status(500).json({ data: error.details[0].message });
};

export const handleDeleteSpace = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const spaceId = Number(req.params.id);
  if (!spaceId) return res.status(400).json({ data: "Invalid ID" });

  const space = await prisma.space.findUnique({
    where: { id: spaceId },
  });

  if (!space) return res.status(404).json({ data: "Space Not Found" });

  await prisma.space.delete({
    where: {
      id: spaceId,
    },
  });

  return res.status(200).json({ data: "Successfully Deleted!" });
};

export const handleGetAllSpaces = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) || 0;
  const take = Number(req.query.take) || 10;

  const spaces = await prisma.space.findMany({
    skip: skip,
    take: take,
  });

  return res.json({ data: spaces });
};

export const handleGetSpaceById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const spaceId = Number(req.params.id);
  if (isNaN(spaceId)) return res.status(400).json({ data: "Invalid Id" });

  const space = await prisma.space.findUnique({
    where: { id: spaceId },
  });
  if (!space) return res.status(404).json({ data: "Space not found" });
  return res.json({ data: space });
};

export const handleUpdateSpaceById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const spaceId = Number(req.params.id);
  const allowedUpdateFields: Array<keyof Prisma.spaceUpdateInput> = [
    "title",
    "content",
    "pdfUrl",
    "category",
    "subCategory",
    "previewImage",
  ];

  const updates = Object.keys(req.body);

  const updateObject: Prisma.spaceUpdateInput = {};

  for (const update of updates) {
    if (!allowedUpdateFields.includes(update as keyof Prisma.spaceUpdateInput))
      return res.status(400).json({ data: "Invalid Arguments" });

    if ([""].includes(update)) {
      const entityConnection = {
        connect: { id: req.body[update] },
      };
      const elem = await prisma[update].findUnique({
        where: { id: req.body[update] },
      });
      if (!elem) return res.status(400).json({ data: `${update} not found` });
      updateObject[update] = entityConnection;
    } else updateObject[update] = req.body[update];
  }

  const spaceToBeUpdated = await prisma.space.findUnique({
    where: { id: spaceId },
  });
  if (!spaceToBeUpdated)
    return res.status(404).json({ data: "Space Not Found" });

  updateObject.updatedAt = new Date();
  const space = await prisma.space.update({
    where: {
      id: spaceId,
    },
    data: updateObject,
  });

  return res.json({ data: space });
};
