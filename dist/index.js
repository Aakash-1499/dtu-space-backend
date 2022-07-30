"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("source-map-support/register");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
app_1.default.listen(config_1.default.PORT, () => {
    console.log(`Server started on http://localhost:${config_1.default.PORT}/`);
});
//# sourceMappingURL=index.js.map