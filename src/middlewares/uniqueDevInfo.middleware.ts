import { NextFunction, Request, Response } from "express";
import { DeveloperInfoResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

const uniqueDevInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const query: string = `
        SELECT * FROM "developerInfos"
        WHERE "developerId" = $1;
    `;

    const queryResult: DeveloperInfoResult = await client.query(query, [req.params.id]);

    if (queryResult.rowCount) {
        throw new AppError("Developer infos already exists.", 409)
    }

    return next();
}

export { uniqueDevInfo };