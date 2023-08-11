import { Router } from "express";
import { developerController, developerInfosController } from "../controllers";
import { developerExists, uniqueDevInfo, uniqueEmail } from "../middlewares";

const developerRouter: Router = Router();

developerRouter.post("", uniqueEmail, developerController.createDeveloper);
developerRouter.get("", developerController.readDeveloper);

developerRouter.use("/:id", developerExists);

developerRouter.get("/:id", developerController.retrieveDeveloper);
developerRouter.patch("/:id",uniqueEmail, developerController.updateDeveloper);
developerRouter.delete("/:id", developerController.deleteDeveloper);

developerRouter.post("/:id/infos", developerExists, uniqueDevInfo, developerInfosController.createDeveloperInfos);

export default developerRouter;