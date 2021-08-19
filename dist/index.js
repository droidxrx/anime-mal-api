var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAL_API_ANIME = exports.MAL_OAUTH2 = void 0;
const oauth2_1 = __importDefault(require("./oauth2"));
exports.MAL_OAUTH2 = oauth2_1.default;
const anime_1 = __importDefault(require("./api/anime"));
exports.MAL_API_ANIME = anime_1.default;
