import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../core/error/ApiError";
import { skillService } from "../service/SkillService";

class SkillController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const image = (req as any).file?.path;
            if (!image) {
                throw new ApiError(400, 'Skill image is required');
            }
            const response = await skillService.create(req.body, image);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await skillService.get(req.params?.skillId);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await skillService.update(req.body, req.params?.skillId, (req as any).file?.path);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await skillService.delete(req.params?.skillId);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }
}

export const skillController = new SkillController();