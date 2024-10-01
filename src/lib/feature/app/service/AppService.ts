import { readFileSync } from "fs";
import { join } from "path";
import { LEARNING_TYPE, USING_NOW_TYPE } from "../../../core/config/string";
import { ApiResponse, SuccessResponse } from "../../../core/response/Response";
import transporter from "../../../core/utils/Transporter";
import { experienceService } from "../../experience/service/ExperienceService";
import { projectService } from "../../projects/service/ProjectService";
import { skillService } from "../../skills/service/SkillService";
import { userProfileService } from "../../user_profile/service/UserProfileService";

interface IContactUs {
    name: string;
    email: string;
    phoneNo: string;
    message: string;
}

export class AppService {
    async get(): Promise<ApiResponse> {
        const usingTypeSkillPromise = skillService.get(null, USING_NOW_TYPE);
        const learningTypeSkillPromise = skillService.get(null, LEARNING_TYPE);
        const experiences = experienceService.get();
        const projects = projectService.get();
        const userProfile = userProfileService.get();

        const promises = await Promise.all([
            usingTypeSkillPromise,
            learningTypeSkillPromise,
            experiences,
            projects,
            userProfile,
        ]);

        return new SuccessResponse({
            statusCode: 200, data: {
                usingNowSkill: promises[0].data,
                learningSkill: promises[1].data,
                experiences: promises[2].data,
                projects: promises[3].data,
                userProfile: promises[4].data,
            }
        });
    }

    async contactUs(data: IContactUs): Promise<ApiResponse> {
        let filePath = join(__dirname, "../../../../../mails/contact_us.html");
        let htmlData = readFileSync(filePath, "utf-8");
        htmlData = htmlData.replace("{{name}}", data.name);
        htmlData = htmlData.replace("{{email}}", data.email);
        htmlData = htmlData.replace("{{phone}}", data.phoneNo);
        htmlData = htmlData.replace("{{message}}", data.message);
        htmlData = htmlData.replace("{{website}}", "http://localhost:5000/");
        await transporter.sendMail({
            to: data.email,
            subject: "Contact us form",
            html: htmlData,
        });
        return new SuccessResponse({
            statusCode: 200,
            message: 'Thank you for reaching out! Your message has been received, and we will get back to you shortly.'
        });
    }
}

export const appService = new AppService();