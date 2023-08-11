import { QueryResult, QueryResultBase } from "pg";

type DeveloperInfos = {
    id: number,
    developerSince: Date | string,
    preferredOS: OS,
    developerId: number
};

type DeveloperInfoResult = QueryResult<DeveloperInfos>;
type DeveloperInfoCreate = Omit<DeveloperInfos, "id">;

enum OS {
    Windows = 'Windows',
    Linux = 'Linux',
    MacOS = 'MacOS',
}

export { DeveloperInfos, DeveloperInfoResult, DeveloperInfoCreate };

