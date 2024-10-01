import { ApiError } from "../../../core/error/ApiError";
import { deleteFile } from "../../../core/middleware/Multer";
import { ApiResponse, SuccessResponse } from "../../../core/response/Response";
import SkillModel from "../model/SkillModel";

interface ICreateSkill {
    name: string;
    type: string;
    image: string;
}

export class SkillService {

    async create(data: ICreateSkill): Promise<ApiResponse> {
        const findSkill = await SkillModel.findOne({ name: data.name });
        if (findSkill) {
            throw new ApiError(400, 'The skill was found and is now available.');
        }
        const category = await SkillModel.create(data);

        return new SuccessResponse({
            statusCode: 201,
            data: category,
            message: 'The type has been successfully added.'
        });
    }

    async get(skillId?: string, type?: string): Promise<ApiResponse> {
        const query = {};
        if (skillId) {
            query['_id'] = skillId;
        }
        if (type) {
            query['type'] = type;
        }
        const skills = await SkillModel.find(query);
        if (skillId && skills.length === 0) {
            throw new ApiError(400, 'The skill was not found.');
        }
        return new SuccessResponse({
            statusCode: 200,
            data: skillId ? skills[0] : skills,
            message: skillId ? 'Skill data has been successfully accessed.' : 'All skill data has been successfully accessed.'
        });
    }

    async update(data: ICreateSkill, skillId: string): Promise<ApiResponse> {
        const findSkill = await SkillModel.findOne({ name: data.name, _id: { $ne: skillId } });

        if (findSkill) {
            throw new ApiError(400, 'The skill name was found and is now available.');
        }

        const skill = await SkillModel.findById(skillId);

        if (!skill) {
            throw new ApiError(400, 'No skill found with the provided details.');
        }
        skill.name = data.name || skill.name;
        skill.type = data.type || skill.type;
        skill.image = data.image || data.image;

        await skill.save();

        return new SuccessResponse({
            statusCode: 200,
            data: skill,
            message: 'Your skill has been updated.'
        });
    }

    async delete(skillId: string): Promise<ApiResponse> {
        const deleteSkill = await SkillModel.findOneAndDelete({ _id: skillId });
        if (!deleteSkill) {
            throw new ApiError(400, 'No skill found with the provided details.');
        }
        return new SuccessResponse({
            statusCode: 200,
            data: deleteSkill,
            message: 'Your skill has been deleted.'
        });
    }
}

export const skillService = new SkillService();