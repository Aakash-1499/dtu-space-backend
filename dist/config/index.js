"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.config = {
    PORT: process.env.PORT || 5000,
};
exports.default = exports.config;
//# sourceMappingURL=index.js.map