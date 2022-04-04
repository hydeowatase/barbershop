"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const index_1 = __importDefault(require("./routes/index"));
const upload_1 = __importDefault(require("./config/upload"));
const AppError_1 = __importDefault(require("./errors/AppError"));
require("./database");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.directory));
app.use(index_1.default);
app.use((err, request, response, _) => {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: err.message,
    });
});
app.listen(3333, () => {
    console.log('Listen on port 3333');
});
