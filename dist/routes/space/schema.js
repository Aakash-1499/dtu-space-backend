"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object().keys({
    title: joi_1.default.string().allow(""),
    content: joi_1.default.string().allow(""),
    pdfUrl: joi_1.default.string().allow(""),
    category: joi_1.default.string().allow(""),
    subCategory: joi_1.default.string().allow(""),
    previewImage: joi_1.default.string().allow(""),
});
//# sourceMappingURL=schema.js.map