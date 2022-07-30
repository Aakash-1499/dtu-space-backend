"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const space_1 = __importDefault(require("./space"));
const router = (0, express_1.Router)();
router.use("/space", space_1.default);
router.get("/", (req, res) => {
    res.send("hello world");
});
exports.default = router;
//# sourceMappingURL=index.js.map