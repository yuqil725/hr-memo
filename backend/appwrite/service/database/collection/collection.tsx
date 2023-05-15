import { ID, Query } from "appwrite";
import { ApiDatabase } from "../database";

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

  createDocument(data: any) {
    return this.database.createDocument(
      this.databaseId,
      this.collectionId,
      ID.unique(),
      data
    );
  }

  listDocument(page = 0) {
    return this.database.listDocuments(this.databaseId, this.collectionId, [
      Query.limit(100),
      Query.offset(100 * page),
    ]);
  }

  updateDocument(documentId: string, data: any) {
    console.log(
      "collection.tsx: Updating %s to %s",
      JSON.stringify(data),
      documentId
    );
    return this.database.updateDocument(
      this.databaseId,
      this.collectionId,
      documentId,
      data
    );
  }

  deleteDocument(documentId: any) {
    return this.database.deleteDocument(
      this.databaseId,
      this.collectionId,
      documentId
    );
  }

  queryDocument(queryList: any) {
    return this.database.listDocuments(
      this.databaseId,
      this.collectionId,
      queryList
    );
  }

  queryByDocumentId(documentId: string) {
    return this.queryDocument([Query.equal("$id", documentId)]);
  }
}
