import { Query } from "appwrite";
import { resolvePromise } from "../../api_base";
import { ApiCollection } from "../collection";

export class ApiPofile extends ApiCollection {
  constructor(
    apiEndpoint: string,
    projectId: string,
    databaseId: string,
    collectionId: string
  ) {
    super(apiEndpoint, projectId, databaseId, collectionId);
  }

  queryByName(name: string) {
    return this.queryDocument([Query.equal("Name", name)]);
  }
}
