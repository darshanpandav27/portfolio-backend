import cors from "cors";
import express from "express";
import morgan from "morgan";
import { PORT } from "./lib/core/config";
import { ApiError } from "./lib/core/error/ApiError";
import { Middleware } from "./lib/core/middleware/Middleware";
import { limiter } from "./lib/core/middleware/RateLimitMiddleware";
import router from "./lib/core/router";
import { Log } from "./lib/core/utils/Log";
import { connectDatabase } from "./lib/database";

function main() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/public", express.static("public"));
    app.use(morgan('dev'));
    app.use(cors());

    connectDatabase();

    app.use(limiter);

    app.use('/api/v1', router);
    app.use('*', (_, __, next) => {
        next(new ApiError(404, 'Path not found. Please check the provided location.'));
    });
    app.use(Middleware.errorMiddlware);

    app.listen(PORT, function () {
        Log.d(`Server is running on port ${PORT}`);
    });

    return app;
}

export const app = main();