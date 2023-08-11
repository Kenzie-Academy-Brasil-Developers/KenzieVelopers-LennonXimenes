import format from "pg-format";
import { client } from "../database";
import { Projects, ProjectsCreate, ProjectsResult, ProjectsUpdate } from "../interfaces";


const createProject = async (payload: ProjectsCreate): Promise<Projects> => {
    console.log(payload);
    const queryString: string = format(
        `
            INSERT INTO "projects"
            (%I)
            VALUES 
            (%L)
            RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: ProjectsResult = await client.query(queryString);

    return queryResult.rows[0];
}

const retrieveProject = async (projectId: string): Promise<Projects> => {
    const queryString: string = `
        SELECT
            "p"."id" AS "projectId",
            "p"."name" AS "projectName",
            "p"."description" AS "projectDescription",
            "p"."repository" AS "projectRepository",
            "p"."startDate" AS "projectStartDate",
            "p"."endDate" AS "projectEndDate",
            "d"."name" AS "projectDeveloperName"
        FROM "projects" AS "p"
        LEFT JOIN "developers" AS "d"
        ON "d"."id" = "p"."developerId"
        WHERE "p"."id" = $1;
    `;
    const queryResult: ProjectsResult = await client.query(queryString, [projectId])

    return queryResult.rows[0];
}

const updateProject = async (projectId: string, payload: ProjectsUpdate): Promise<Projects> => {
    const queryString: string = format(
        `
            UPDATE "projects" 
            SET (%I) = ROW(%L) 
            WHERE "id" = $1 RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: ProjectsResult = await client.query(queryString, [projectId]);

    return queryResult.rows[0];
}

export default { createProject, retrieveProject, updateProject };