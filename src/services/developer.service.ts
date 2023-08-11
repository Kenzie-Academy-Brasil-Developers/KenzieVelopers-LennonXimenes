import format from "pg-format";
import { Developers, DevelopersCreate, DevelopersRead, DevelopersResult, DevelopersUpdate } from "../interfaces";
import { client } from "../database";

const createDeveloper = async (payload: DevelopersCreate): Promise<Developers> => {
    const queryString: string = format(
        `
            INSERT INTO "developers"
            (%I)
            VALUES 
            (%L)
            RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: DevelopersResult = await client.query(queryString);

    return queryResult.rows[0];
}

const readDeveloper = async (): Promise<DevelopersRead> => {
    const queryString: string = `
            SELECT * FROM "developers";
        `;

    const queryResult: DevelopersResult = await client.query(queryString);

    return queryResult.rows;
}

const retrieveDeveloper = async (developerId: string): Promise<Developers> => {
    const queryString: string = `
        SELECT 
            "d"."id" AS "developerId",
            "d"."name" AS "developerName",
            "d"."email" AS "developerEmail",
            "di"."developerSince" AS "developerInfoDeveloperSince",
            "di"."preferredOS" AS "developerInfoPreferredOS"
        FROM "developers" AS "d"
        LEFT JOIN "developerInfos" AS "di"
        ON "di"."developerId" = "d"."id"
        WHERE "d"."id" = $1;
    `;
    const queryResult: DevelopersResult = await client.query(queryString, [developerId])

    return queryResult.rows[0];
}

const updateDeveloper = async (developerId: string, payload: DevelopersUpdate): Promise<Developers> => {
    const queryString: string = format(
        `
            UPDATE "developers" 
            SET (%I) = ROW(%L) 
            WHERE "id" = $1 RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: DevelopersResult = await client.query(queryString, [developerId]);

    return queryResult.rows[0];
}

const deleteDeveloper = async (developerId: string): Promise<void> => {
    const queryString: string = `
            DELETE FROM "developers" WHERE "id" = $1;
        `;

    const queryResult: DevelopersResult = await client.query(queryString, [developerId]);
}


export default { createDeveloper, readDeveloper, retrieveDeveloper, updateDeveloper, deleteDeveloper };