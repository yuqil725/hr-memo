import { Storage } from "appwrite";
import { ApiBase } from "../../api_base";

export class ApiStorage extends ApiBase {
  storage: Storage;

  constructor(apiEndpoint: string, projectId: string) {
    super(apiEndpoint, projectId);
    this.storage = new Storage(this.client);
  }
}
