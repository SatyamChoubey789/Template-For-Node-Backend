import dotenv from "dotenv";
import {app} from "./app.js";
import ConnectDB from "./DB/index.js";
import { pinoLogger, winstonLogger } from "./utils/logger.js";


dotenv.config({
    path: './.env',
    debug: true,
});

const PORT = process.env.PORT || 8000;

ConnectDB();

app.listen(PORT, () => {
    pinoLogger.info("Starting");
    winstonLogger.info(`Server is running on port ${PORT}`);
});