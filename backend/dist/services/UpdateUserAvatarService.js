"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable camelcase */
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const upload_1 = __importDefault(require("../config/upload"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const User_1 = __importDefault(require("../models/User"));
class UpdateUserAvatarService {
    execute({ user_id, avatarFileName }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = (0, typeorm_1.getRepository)(User_1.default);
            const user = yield usersRepository.findOne(user_id);
            if (!user) {
                throw new AppError_1.default('Only authenticated users can  change avatar.', 401);
            }
            if (user.avatar) {
                // Delete old avatar
                const userAvatarFilePath = path_1.default.join(upload_1.default.directory, user.avatar);
                const userAvatarFileExists = yield fs_1.default.promises.stat(userAvatarFilePath);
                if (userAvatarFileExists) {
                    yield fs_1.default.promises.unlink(userAvatarFilePath);
                }
            }
            user.avatar = avatarFileName;
            yield usersRepository.save(user);
            return user;
        });
    }
}
exports.default = UpdateUserAvatarService;
