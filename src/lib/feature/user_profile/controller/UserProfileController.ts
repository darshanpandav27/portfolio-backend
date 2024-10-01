import { NextFunction, Request, Response } from "express";
import { userProfileService } from "../service/UserProfileService";

class UserProfileController {
    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await userProfileService.post(req.body, req.file?.path);
            return res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await userProfileService.get();
            return res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }
}

export const userProfileController = new UserProfileController();