"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdateSpaceById = exports.handleGetSpaceById = exports.handleGetAllSpaces = exports.handleDeleteSpace = exports.handleCreateSpace = void 0;
const prisma_1 = __importDefault(require("~/lib/prisma"));
const schema_1 = require("./schema");
const handleCreateSpace = async (req, res) => {
    const { error } = schema_1.schema.validate(req.body);
    if (!error) {
        const { title, content, pdfUrl, category, subCategory, previewImage } = req.body;
        const newSpaceObject = {
            title,
            content,
            pdfUrl,
            category,
            subCategory,
            previewImage,
        };
        const space = await prisma_1.default.space.create({
            data: newSpaceObject,
        });
        return res.json({ data: space });
    }
    return res.status(500).json({ data: error.details[0].message });
};
exports.handleCreateSpace = handleCreateSpace;
const handleDeleteSpace = async (req, res) => {
    const spaceId = Number(req.params.id);
    if (!spaceId)
        return res.status(400).json({ data: "Invalid ID" });
    const space = await prisma_1.default.space.findUnique({
        where: { id: spaceId },
    });
    if (!space)
        return res.status(404).json({ data: "Space Not Found" });
    await prisma_1.default.space.delete({
        where: {
            id: spaceId,
        },
    });
    return res.status(200).json({ data: "Successfully Deleted!" });
};
exports.handleDeleteSpace = handleDeleteSpace;
const handleGetAllSpaces = async (req, res) => {
    const skip = Number(req.query.skip) || 0;
    const take = Number(req.query.take) || 10;
    const spaces = await prisma_1.default.space.findMany({
        skip: skip,
        take: take,
    });
    return res.json({ data: spaces });
};
exports.handleGetAllSpaces = handleGetAllSpaces;
const handleGetSpaceById = async (req, res) => {
    const spaceId = Number(req.params.id);
    if (isNaN(spaceId))
        return res.status(400).json({ data: "Invalid Id" });
    const space = await prisma_1.default.space.findUnique({
        where: { id: spaceId },
    });
    if (!space)
        return res.status(404).json({ data: "Space not found" });
    return res.json({ data: space });
};
exports.handleGetSpaceById = handleGetSpaceById;
const handleUpdateSpaceById = async (req, res) => {
    const spaceId = Number(req.params.id);
    const allowedUpdateFields = [
        "title",
        "content",
        "pdfUrl",
        "category",
        "subCategory",
        "previewImage",
    ];
    const updates = Object.keys(req.body);
    const updateObject = {};
    for (const update of updates) {
        if (!allowedUpdateFields.includes(update))
            return res.status(400).json({ data: "Invalid Arguments" });
        if ([""].includes(update)) {
            const entityConnection = {
                connect: { id: req.body[update] },
            };
            const elem = await prisma_1.default[update].findUnique({
                where: { id: req.body[update] },
            });
            if (!elem)
                return res.status(400).json({ data: `${update} not found` });
            updateObject[update] = entityConnection;
        }
        else
            updateObject[update] = req.body[update];
    }
    const spaceToBeUpdated = await prisma_1.default.space.findUnique({
        where: { id: spaceId },
    });
    if (!spaceToBeUpdated)
        return res.status(404).json({ data: "Space Not Found" });
    updateObject.updatedAt = new Date();
    const space = await prisma_1.default.space.update({
        where: {
            id: spaceId,
        },
        data: updateObject,
    });
    return res.json({ data: space });
};
exports.handleUpdateSpaceById = handleUpdateSpaceById;
//# sourceMappingURL=controller.js.map