import { Router } from "express";
import { Middleware } from "../../../core/middleware/Middleware";
import { appController } from "../controller/AppController";
import { contactUs } from "../validation/AppValidator";

const router = Router();

router.get('/', appController.get);
router.post('/contact-us', Middleware.bodyValidation(contactUs), appController.contactUs);

export default router;