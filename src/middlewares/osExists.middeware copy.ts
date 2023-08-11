import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const osExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { preferredOS } = req.body;

    if (preferredOS !== "Windows" && preferredOS !== "macOS" && preferredOS !== "Linux") {
        throw new AppError("Invalid OS option.", 400);
    }

    return next();
}

export { osExists };