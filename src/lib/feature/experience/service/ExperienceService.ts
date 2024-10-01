import { ApiError } from "../../../core/error/ApiError";
import { ApiResponse, SuccessResponse } from "../../../core/response/Response";
import ExperienceModel from "../model/ExperienceModel";

interface ICreateExperience {
    title: string;
    address: string;
    description: string;
    startDate: string;
    endDate?: string;
    isNow?: boolean;
}

export class ExperienceService {

    async create(data: ICreateExperience): Promise<ApiResponse> {
        const experience = await ExperienceModel.create({
            title: data.title,
            address: data.address,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            isNow: data.isNow
        });

        return new SuccessResponse({
            statusCode: 201,
            data: experience,
            message: 'The experience has been successfully added.'
        });
    }

    async get(experienceId?: string): Promise<ApiResponse> {
        const query = {};
        if (experienceId) {
            query['_id'] = experienceId;
        }
        const experiences = await ExperienceModel.find(query).sort({ 'startDate': 'asc' });
        if (experienceId && experiences.length === 0) {
            throw new ApiError(400, 'The experience was not found.');
        }
        return new SuccessResponse({
            statusCode: 200,
            data: experienceId ? experiences[0] : experiences,
            message: experienceId ? 'Experience data has been successfully accessed.' : 'All experience data has been successfully accessed.'
        });
    }

    async update(data: ICreateExperience, experienceId: string): Promise<ApiResponse> {
        const experience = await ExperienceModel.findById(experienceId);

        if (!experience) {
            throw new ApiError(400, 'No experience found with the provided details.');
        }

        let updatedExperience = await ExperienceModel.findByIdAndUpdate(experienceId, {
            title: data.title || experience.title,
            address: data.address || experience.address,
            description: data.description || experience.description,
            startDate: data.startDate || experience.startDate,
            endDate: data.endDate || experience.endDate,
            isNow: data.isNow || experience.isNow
        }, { new: true });

        return new SuccessResponse({
            statusCode: 200,
            data: updatedExperience,
            message: 'Your experience has been updated.'
        });
    }

    async delete(experienceId: string): Promise<ApiResponse> {
        const deleteExperience = await ExperienceModel.findOneAndDelete({ _id: experienceId });
        if (!deleteExperience) {
            throw new ApiError(400, 'No experience found with the provided details.');
        }
        return new SuccessResponse({
            statusCode: 200,
            data: deleteExperience,
            message: 'Your experience has been deleted.'
        });
    }
}

export const experienceService = new ExperienceService();