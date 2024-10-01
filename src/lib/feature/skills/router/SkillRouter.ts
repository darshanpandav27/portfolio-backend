import { Router } from "express";
import { Middleware } from "../../../core/middleware/Middleware";
import { imageUploader } from "../../../core/middleware/Multer";
import { skillController } from "../controller/SkillController";
import { createSkill } from "../validation/SkillValidator";

const router = Router();

router.post("/",
    imageUploader.single("image"),
    Middleware.bodyValidation(createSkill),
    skillController.create
);
router.get("/", skillController.get);
router.get("/:skillId", skillController.get);
router.patch("/:skillId",
    imageUploader.single("image"),
    Middleware.bodyValidation(createSkill),
    skillController.update
);
router.delete("/:skillId", skillController.delete);

export default router;