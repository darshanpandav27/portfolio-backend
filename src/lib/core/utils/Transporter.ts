import { createTransport } from 'nodemailer';
import { MAIL_EMAIL, MAIL_PASSWORD } from '../config';

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: MAIL_EMAIL,
        pass: MAIL_PASSWORD,
    },
});

export default transporter;