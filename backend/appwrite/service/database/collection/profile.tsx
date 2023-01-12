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

  updateByDocumentId(documentId: string, data: any) {
    let promise = this.queryByDocumentId(documentId);
    return promise.then(
      (response: any) => {
        if (response.documents.length !== 1) {
          console.error("Incorrect number of documents", response);
        } else {
          let doc = response.documents[0];
          const documentId = doc["$id"];
          return this.updateDocument(documentId, data);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
