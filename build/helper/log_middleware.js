import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import Logger from "./logger.js";

const stream = {
    // Use the http severity
    write: (message) => Logger.http(message),
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};
// Build the morgan middleware
const logMiddleware = morgan(

":method :url :status :res[content-length] - :response-time ms", 

{ stream, skip });
export default logMiddleware;
