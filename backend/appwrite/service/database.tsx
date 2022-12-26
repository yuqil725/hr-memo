import { ApiBase } from "../api_base";

export class ApiDatabase extends ApiBase {
  databaseId: string;

  constructor(apiEndpoint: string, projectId: string, databaseId: string) {
    super(apiEndpoint, projectId);
    this.databaseId = databaseId;
  }
}
