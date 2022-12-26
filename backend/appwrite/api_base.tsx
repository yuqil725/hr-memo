import { Databases, Account, Client, Models } from "appwrite";

export class ApiBase {
  apiEndpoint: string;
  projectId: string;
  client: any;
  account: any;
  database: any;

  constructor(apiEndpoint: string, projectId: string) {
    this.apiEndpoint = apiEndpoint;
    this.projectId = projectId;
    this.client = new Client();
    this.client.setEndpoint(this.apiEndpoint).setProject(this.projectId);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
  }
}

export function resolvePromise(promise: any) {
  return promise.then(
    function (response: any) {
      console.log(response);
      return response;
    },
    function (error: any) {
      console.error(error);
      return null;
    }
  );
}

// let api = new ApiB(Constants.API_ENDPOINT, Constants.P_NAMECARD_ID);
