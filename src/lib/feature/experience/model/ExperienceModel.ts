import { model, Schema } from "mongoose";

interface IExperience {
    title: string;
    address: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    isNow: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>({
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        default: null
    },
    isNow: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);



const ExperienceModel = model('experiences', experienceSchema);

export default ExperienceModel;