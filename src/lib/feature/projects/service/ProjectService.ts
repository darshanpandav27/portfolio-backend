import { ApiError } from "../../../core/error/ApiError";
import { deleteFile } from "../../../core/middleware/Multer";
import { ApiResponse, SuccessResponse } from "../../../core/response/Response";
import ProjectModel from "../model/ProjectModel";

interface ICreateProject {
    title: string;
    description: string;
    image?: string;
    technology: string[];
    gitHubLink?: string;
    liveLink?: string;
}

export class ProjectService {

    async create(data: ICreateProject, image: string): Promise<ApiResponse> {
        const project = await ProjectModel.create({
            title: data.title,
            description: data.description,
            image: image,
            technology: data.technology,
            gitHubLink: data.gitHubLink,
            liveLink: data.liveLink,
        });

        return new SuccessResponse({
            statusCode: 201,
            data: project,
            message: 'The project has been successfully added.'
        });
    }

    async get(projectId?: string): Promise<ApiResponse> {
        const query = {};
        if (projectId) {
            query['_id'] = projectId;
        }
        const projects = await ProjectModel.find(query).sort({ 'updatedAt': 'desc' });
        if (projectId && projects.length === 0) {
            throw new ApiError(400, 'The project was not found.');
        }
        return new SuccessResponse({
            statusCode: 200,
            data: projectId ? projects[0] : projects,
            message: projectId ? 'Project data has been successfully accessed.' : 'All project data has been successfully accessed.'
        });
    }

    async update(data: ICreateProject, projectId: string, image?: string): Promise<ApiResponse> {
        const project = await ProjectModel.findById(projectId);

        if (!project) {
            throw new ApiError(400, 'No project found with the provided details.');
        }

        if (image) {
            deleteFile(project.image);
        }

        let updatedProject = await ProjectModel.findByIdAndUpdate(projectId, {
            title: data.title || project.title,
            description: data.description || project.description,
            image: image || project.image,
            technology: data.technology || project.technology,
            gitHubLink: data.gitHubLink || project.gitHubLink,
            liveLink: data.liveLink || project.liveLink,
        }, { new: true });

        return new SuccessResponse({
            statusCode: 200,
            data: updatedProject,
            message: 'Your project has been updated.'
        });
    }

    async delete(projectId: string): Promise<ApiResponse> {
        const project = await ProjectModel.findOneAndDelete({ _id: projectId });
        if (!project) {
            throw new ApiError(400, 'No project found with the provided details.');
        }
        deleteFile(project.image);
        return new SuccessResponse({
            statusCode: 200,
            data: project,
            message: 'Your project has been deleted.'
        });
    }
}

export const projectService = new ProjectService();