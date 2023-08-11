import { Request, Response } from "express";
import { Projects } from "../interfaces";
import projectsService from "../services/projects.service";


const createProjects = async (req: Request, res: Response): Promise<Response> => {
    const projects: Projects = await projectsService.createProject(req.body);

    return res.status(201).json(projects);
};

const retrieveProjects = async (req: Request, res: Response): Promise<Response> => {
    const projects: Projects = await projectsService.retrieveProject(req.params.develeporId);

    return res.status(200).json(projects);
};

const updateProjects = async (req: Request, res: Response): Promise<Response> => {
    const { develeporId } = req.params;
    const { body } = req;

    const projects: Projects = await projectsService.updateProject(develeporId, body);

    return res.status(200).json(projects);
};

export default { createProjects, retrieveProjects, updateProjects };