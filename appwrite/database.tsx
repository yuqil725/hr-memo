import { Databases } from "appwrite";
import { ApiBase } from "../../api_base";

export class ApiDatabase extends ApiBase {
  databaseId: string;
  database: any;

  constructor(apiEndpoint: string, projectId: string, databaseId: string) {
    super(apiEndpoint, projectId);
    this.databaseId = databaseId;
    this.database = new Databases(this.client);
  }
}
