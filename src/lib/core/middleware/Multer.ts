import { Request } from 'express';
import fs from 'fs';
import multer, { diskStorage } from 'multer';
import { ApiError } from '../error/ApiError';

type GenerateFileName = (file: Express.Multer.File) => string;

export function uploader(
    folderPath: string,
    fileName: GenerateFileName,
    mimetype: string[],
    mimeTypeErrorMsg: string
): multer.Multer {
    const fileFilter = (_req: Request, file: Express.Multer.File, callback: any) => {
        if (mimetype.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new ApiError(400, mimeTypeErrorMsg), false);
        }
    }
    const storage = diskStorage({
        destination(_req, _file, callback) {
            const path = folderPath;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }
            callback(null, path);
        },
        filename(_req, file, callback) {
            const fileNameGenerated = fileName(file);
            callback(null, fileNameGenerated);
        },
    });
    return multer({ storage, fileFilter });
}

export const imageFolderPath = "./public";
export const imageGenerateFileName: GenerateFileName = (file) => {
    return `${Date.now()}-${file.originalname}`;
};
export const imageMimetype = ["image/jpg", "image/jpeg", "image/png"];
export const imageMimetypeErrorMsg = "Image uploaded is not of type jpg/jpeg or png";

export const cvFolderPath = "./public/cv";
export const cvGenerateFileName: GenerateFileName = (_) => {
    return 'CV.pdf';
};
export const cvMimetype = ["application/pdf"];
export const cvMimetypeErrorMsg = "CV uploaded is not of type pdf";

export const imageUploader = uploader(imageFolderPath, imageGenerateFileName, imageMimetype, imageMimetypeErrorMsg);
export const cvUploader = uploader(cvFolderPath, cvGenerateFileName, cvMimetype, cvMimetypeErrorMsg);

export function deleteFile(files?: string | string[]) {
    if (!files) return;
    if (Array.isArray(files)) {
        for (const file of files) {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        }
        return;
    }
    if (fs.existsSync(files)) {
        fs.unlinkSync(files);
    }
}