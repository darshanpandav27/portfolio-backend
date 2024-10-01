import { Router } from "express";
import appRouter from "../../feature/app/router/AppRouter";
import experienceRouter from "../../feature/experience/router/ExperienceRouter";
import projectRouter from "../../feature/projects/router/ProjectRouter";
import skillRouter from "../../feature/skills/router/SkillRouter";
import userProfileRouter from "../../feature/user_profile/router/UserProfileRouter";

const router = Router();

router.use('/skill', skillRouter);
router.use('/experience', experienceRouter);
router.use('/project', projectRouter);
router.use('/user-profile', userProfileRouter);
router.use('/app', appRouter);

export default router;