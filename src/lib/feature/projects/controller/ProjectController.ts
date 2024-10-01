import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../core/error/ApiError";
import { projectService } from "../service/ProjectService";

class ProjectController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await projectService.create(req.body);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await projectService.get(req.params?.projectId);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await projectService.update(req.body, req.params?.projectId);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await projectService.delete(req.params?.projectId);
            res.status(200).json(response);
        } catch (e) {
            return next(e);
        }
    }
}

export const projectController = new ProjectController();