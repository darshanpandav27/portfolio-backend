import { NextFunction, Request, Response } from "express";
import { experienceService } from "../service/ExperienceService";

class ExperienceController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await experienceService.create(req.body);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await experienceService.get(req.params?.experienceId);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await experienceService.update(req.body, req.params?.experienceId);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await experienceService.delete(req.params?.experienceId);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }
}

export const experienceController = new ExperienceController();