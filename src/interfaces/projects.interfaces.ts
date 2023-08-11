import { QueryResult } from "pg";

type Projects = {
    id: number,
    name: string,
    description: string | null | undefined,
    repository: string,
    startDate: Date,
    endDate: Date | null | undefined,
    developerId: number | null | undefined
};


type ProjectsResult = QueryResult<Projects>;
type ProjectsCreate = Omit<Projects, "id">;
type ProjectsUpdate = Partial<ProjectsCreate>

export { Projects, ProjectsResult, ProjectsCreate, ProjectsUpdate };
