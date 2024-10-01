import { config } from "dotenv";

config();

export const PORT: number = parseInt(process.env.PORT || '5000');
export const DB_CONNECT: string = process.env.DB_CONNECT!;
export const MAIL_EMAIL: string = process.env.MAIL_EMAIL!;
export const MAIL_PASSWORD: string = process.env.MAIL_PASSWORD!;
