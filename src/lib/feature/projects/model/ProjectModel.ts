import { model, Schema } from "mongoose";

interface IProject {
    title: string;
    description: string;
    image: string;
    technology: string[];
    gitHubLink?: string;
    liveLink?: string;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    technology: {
        type: [String],
        required: true,
        default: []
    },
    gitHubLink: {
        type: String,
        default: null,
    },
    liveLink: {
        type: String,
        default: null,
    },
},
    { timestamps: true }
);



const ProjectModel = model('projects', projectSchema);

export default ProjectModel;