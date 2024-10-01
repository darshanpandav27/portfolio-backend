import { model, Schema } from "mongoose";

interface IExplore {
    title: string;
    description: string;
}

interface IUserProfile {
    name: string;
    designation: string;
    instagramLink: string;
    gitLink: string;
    linkedInLink: string;
    cv: string;
    description: string;
    aboutMe: string;
    explore: IExplore[];
    email: string;
    phoneNo: string;
    createdAt: Date;
    updatedAt: Date;
}

const userProfileSchema = new Schema<IUserProfile>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true,
    },
    instagramLink: {
        type: String,
        required: true
    },
    gitLink: {
        type: String,
        required: true
    },
    linkedInLink: {
        type: String,
        required: true
    },
    cv: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    aboutMe: {
        type: String,
        required: true
    },
    explore: {
        type: Array<IExplore>(),
        default: [],
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);



const UserProfileModel = model('user-profile', userProfileSchema);

export default UserProfileModel;