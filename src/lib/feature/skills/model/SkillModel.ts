import { model, Schema } from "mongoose";
import { LEARNING_TYPE, USING_NOW_TYPE } from "../../../core/config/string";

interface ISkill {
    name: string;
    type: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const skillSchema = new Schema<ISkill>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: [USING_NOW_TYPE, LEARNING_TYPE]
    },
    image: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);



const SkillModel = model('skills', skillSchema);

export default SkillModel;