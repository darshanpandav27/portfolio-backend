import { Router } from "express";
import { cvUploader } from "../../../core/middleware/Multer";
import { userProfileController } from "../controller/UserProfileController";

const router = Router();

router.post('/', cvUploader.single("cv"), userProfileController.post);
router.get('/', userProfileController.get);

export default router;