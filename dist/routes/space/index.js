"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const captureError_1 = require("~/lib/captureError");
const controller_1 = require("./controller");
exports.router = (0, express_1.Router)();
//CRUD routes
exports.router.get("/", (0, captureError_1.ce)(controller_1.handleGetAllSpaces));
exports.router.get("/:id", (0, captureError_1.ce)(controller_1.handleGetSpaceById));
exports.router.post("/", (0, captureError_1.ce)(controller_1.handleCreateSpace));
exports.router.patch("/:id", (0, captureError_1.ce)(controller_1.handleUpdateSpaceById));
exports.router.delete("/:id", (0, captureError_1.ce)(controller_1.handleDeleteSpace));
exports.default = exports.router;
//# sourceMappingURL=index.js.map