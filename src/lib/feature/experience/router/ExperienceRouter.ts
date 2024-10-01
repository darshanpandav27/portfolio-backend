import { Router } from "express";
import { Middleware } from "../../../core/middleware/Middleware";
import { experienceController } from "../controller/ExperienceController";
import { createExperience } from "../validation/ExperienceValidator";

const router = Router();

router.post("/",
    Middleware.bodyValidation(createExperience),
    experienceController.create,
);
router.get("/", experienceController.get);
router.get("/:experienceId", experienceController.get);
router.patch("/:experienceId",
    Middleware.bodyValidation(createExperience),
    experienceController.update,
);
router.delete("/:experienceId", experienceController.delete);

export default router;