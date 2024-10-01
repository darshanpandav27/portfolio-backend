import { NextFunction, Request, RequestHandler, Response } from "express";
import { Schema } from "joi";
import { ApiError } from "../error/ApiError";
import { Log } from "../utils/Log";

export class Middleware {
    static errorMiddlware(err: any, _req: Request, res: Response, _next: NextFunction) {
        if (err instanceof ApiError) {
            res.status(200).json({ statusCode: err.statusCode, success: false, message: err.message });
        } else {
            Log.e(err);
            const errorText = 'An unexpected error occurred on the server. Please try again later or contact support if the problem persists.';
            res.status(200).json({ statusCode: 500, success: false, message: errorText });
        }
    }

    static bodyValidation(data: Schema): RequestHandler {
        return (req: Request, _: Response, next: NextFunction) => {
            const regex = new RegExp('\"', 'g');
            const { error } = data.validate(req.body);
            if (error) {
                return next(new ApiError(400, error.details[0].message.replace(regex, '')));
            }
            next();
        }
    }

    static paramsValidation(data: Schema): RequestHandler {
        return (req: Request, _: Response, next: NextFunction) => {
            const regex = new RegExp('\"', 'g');
            const { error } = data.validate(req.params);
            if (error) {
                return next(new ApiError(400, error.details[0].message.replace(regex, '')));
            }
            next();
        }
    }
}