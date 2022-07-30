"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ce = void 0;
const ce = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (e) {
            next(e);
        }
    };
};
exports.ce = ce;
//# sourceMappingURL=captureError.js.map