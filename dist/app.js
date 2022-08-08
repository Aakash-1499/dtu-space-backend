"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.use("/api", routes_1.default);
exports.app.get("/", (req, res) => {
    res.send('hello there, see the documentation here: <a href="" target="__blank">Link</a>');
});
exports.default = exports.app;
//# sourceMappingURL=app.js.map