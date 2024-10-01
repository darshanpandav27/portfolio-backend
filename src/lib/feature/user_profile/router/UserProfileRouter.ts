import { Router } from "express";
import { userProfileController } from "../controller/UserProfileController";
import { Middleware } from "../../../core/middleware/Middleware";
import { userProfileValidation } from "../validation/UserProfileValidation";

const router = Router();

router.post('/', Middleware.bodyValidation(userProfileValidation), userProfileController.post);
router.get('/', userProfileController.get);

export default router;