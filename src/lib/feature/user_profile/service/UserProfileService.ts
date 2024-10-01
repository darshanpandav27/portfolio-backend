import { ApiError } from "../../../core/error/ApiError";
import { ApiResponse, SuccessResponse } from "../../../core/response/Response";
import UserProfileModel from "../model/UserProfileModel";

export class UserProfileService {
    async post(data: any, cv?: string): Promise<ApiResponse> {

        let findUser = await UserProfileModel.findOne();
        if (!findUser) {
            if (!cv) {
                throw new ApiError(400, "CV is required");
            }
            findUser = new UserProfileModel({
                ...data,
                cv: cv,
            });
            await findUser.save();
            return new SuccessResponse({
                statusCode: 201,
                message: "User profile created successfully",
                data: findUser
            });
        }
        if (cv) {
            data.cv = cv;
        }
        findUser = await UserProfileModel.findOneAndUpdate(
            { _id: findUser._id },
            data,
            { new: true }
        );

        return new SuccessResponse({
            statusCode: 200,
            message: "User profile update successfully",
            data: findUser
        });
    }

    async get(): Promise<ApiResponse> {
        let findUser = await UserProfileModel.findOne();
        if (!findUser) {
            throw new ApiError(400, "No user profile found");
        }
        return new SuccessResponse({
            statusCode: 200,
            message: "User profile accessed successfully",
            data: findUser
        });
    }
}

export const userProfileService = new UserProfileService();