import { ApiDatabase } from "./database";

export class ApiCollection extends ApiDatabase {
  collectionId: string;

  constructor(
    apiEndpoint: string,
    projectId: string,
    databaseId: string,
    collectionId: string
  ) {
    super(apiEndpoint, projectId, databaseId);
    this.collectionId = collectionId;
  }

  createDocument(data: any, read: any, write: any) {
    return this.database.createDocument(
      this.databaseId,
      this.collectionId,
      data,
      read,
      write
    );
  }

  listDocument() {
    return this.database.listDocuments(this.databaseId, this.collectionId);
  }

  updateDocument(documentId: any, data: any, read: any, write: any) {
    return this.database.updateDocument(
      this.collectionId,
      documentId,
      data,
      read,
      write
    );
  }

  deleteDocument(documentId: any) {
    return this.database.deleteDocument(this.collectionId, documentId);
  }

  queryDocument(queryList: any) {
    return this.database.listDocuments(
      this.databaseId,
      this.collectionId,
      queryList
    );
  }
}
