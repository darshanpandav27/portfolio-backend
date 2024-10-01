import { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { ErrorResponse } from "../response/Response";

export const limiter = rateLimit({
    max: 200,
    message: "You have sent too many requests in a short period of time. Please wait and try again later.",
    handler: (_: Request, res: Response) => {
        res.json(new ErrorResponse({
            statusCode: 429,
            message: 'You have sent too many requests in a short period of time. Please wait and try again later.'
        }));
    }
});