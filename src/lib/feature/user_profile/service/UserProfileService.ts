import { ApiError } from "../../../core/error/ApiError";
import { ApiResponse, SuccessResponse } from "../../../core/response/Response";
import UserProfileModel, { IExplore } from "../model/UserProfileModel";

interface ICreateUserProfile {
    name: string;
    designation: string;
    instagramLink: string;
    gitLink: string;
    linkedInLink: string;
    description: string;
    aboutMe: string;
    explore: IExplore[];
    email: string;
    phoneNo: string;
}

export class UserProfileService {
    async post(data: ICreateUserProfile): Promise<ApiResponse> {

        let findUser = await UserProfileModel.findOne();
        if (!findUser) {
            findUser = new UserProfileModel(data);
            await findUser.save();
            return new SuccessResponse({
                statusCode: 201,
                message: "User profile created successfully",
                data: findUser
            });
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