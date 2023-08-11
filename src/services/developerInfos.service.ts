import format from "pg-format";
import { DeveloperInfos, DeveloperInfoCreate, DeveloperInfoResult } from "../interfaces/developerInfos.interfaces";
import { client } from "../database";

const createDeveloperInfos = async (payload: DeveloperInfoCreate): Promise<DeveloperInfos> => {
    const queryString: string = format(
        `
            INSERT INTO "developerInfos"
            (%I)
            VALUES 
            (%L)
            RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: DeveloperInfoResult = await client.query(queryString);

    return queryResult.rows[0];
}

export default { createDeveloperInfos };