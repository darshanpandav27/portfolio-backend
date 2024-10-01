import { Router } from "express";
import { Middleware } from "../../../core/middleware/Middleware";
import { imageUploader } from "../../../core/middleware/Multer";
import { projectController } from "../controller/ProjectController";
import { createProject } from "../validation/ProjectValidator";

const router = Router();

router.post("/",
    imageUploader.single("image"),
    Middleware.bodyValidation(createProject),
    projectController.create,
);
router.get("/", projectController.get);
router.get("/:projectId", projectController.get);
router.patch("/:projectId",
    imageUploader.single("image"),
    Middleware.bodyValidation(createProject),
    projectController.update,
);
router.delete("/:projectId", projectController.delete);

export default router;