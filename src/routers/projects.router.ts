import { Router } from "express";
import { projectsController } from "../controllers";
import { developerExists, developerProjectExists, osExists, projectsExists, uniqueEmail } from "../middlewares";


const projectRouter: Router = Router();

projectRouter.post("", uniqueEmail, developerProjectExists, projectsController.createProjects);

projectRouter.use("/:develeporId", uniqueEmail);

projectRouter.get("/:develeporId", uniqueEmail, projectsExists, projectsController.retrieveProjects);
projectRouter.patch("/:develeporId", uniqueEmail, projectsExists, developerProjectExists, projectsController.updateProjects);


export default projectRouter;