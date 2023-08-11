import { Request, Response } from "express";
import { DeveloperInfoCreate, DeveloperInfos } from "../interfaces/developerInfos.interfaces";
import developerInfosService from "../services/developerInfos.service";


const createDeveloperInfos = async (req: Request, res: Response): Promise<Response> => {
    const payload: DeveloperInfoCreate = {
        ...req.body,
        developerId: req.params.id,
    };

    const developerInfo: DeveloperInfos = await developerInfosService.createDeveloperInfos(payload);

    return res.status(201).json(developerInfo);
};

export default { createDeveloperInfos };