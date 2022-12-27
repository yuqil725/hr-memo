import { Query } from "appwrite";
import { printPromise } from "../../../api_base";
import { ApiCollection } from "./collection";

export class ApiProfileCollection extends ApiCollection {
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

  updateByName(name: string, data: any) {
    let promise = this.queryByName(name);
    promise.then(
      (response: any) => {
        if (response.documents.length !== 1) {
          console.error("Incorrect number of documents", response);
        } else {
          let doc = response.documents[0];
          const documentId = doc["$id"];
          this.updateDocument(documentId, data);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
