import { Request, Response } from "express";
import { Developers, DevelopersRead } from "../interfaces";
import developerService from "../services/developer.service";

const createDeveloper = async (req: Request, res: Response): Promise<Response> => {
    const developer: Developers = await developerService.createDeveloper(req.body);

    return res.status(201).json(developer);
};

const readDeveloper = async (req: Request, res: Response): Promise<Response> => {
    const developers: DevelopersRead = await developerService.readDeveloper();

    return res.status(200).json(developers);
};

const retrieveDeveloper = async (req: Request, res: Response): Promise<Response> => {
    const developer: Developers = await developerService.retrieveDeveloper(req.params.id);

    return res.status(200).json(developer);
};

const updateDeveloper = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const developer: Developers = await developerService.updateDeveloper(id, body);

    return res.status(200).json(developer);
};

const deleteDeveloper = async (req: Request, res: Response): Promise<Response> => {
    await developerService.deleteDeveloper(req.params.id);

    return res.status(204).json();
};

export default { createDeveloper, readDeveloper, retrieveDeveloper, updateDeveloper, deleteDeveloper };