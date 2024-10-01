import { NextFunction, Request, Response } from "express";
import { appService } from "../service/AppService";

class AppController {
    async get(_: Request, res: Response, next: NextFunction) {
        try {
            const response = await appService.get();
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async contactUs(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await appService.contactUs(req.body);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }
}

export const appController = new AppController();