import { ID, Storage } from "appwrite";
import { ApiBase } from "../../../api_base";
import { ApiStorage } from "../storage";

export class ApiBucket extends ApiStorage {
  bucketId: string;

  constructor(apiEndpoint: string, projectId: string, bucketId: string) {
    super(apiEndpoint, projectId);
    this.bucketId = bucketId;
  }

  createFile(file: File, fileId?: string) {
    if (!fileId) fileId = ID.unique();
    return this.storage.createFile(this.bucketId, fileId, file);
  }

  getFile(fileId: string) {
    return this.storage.getFile(this.bucketId, fileId);
  }

  getFilePreview(fileId: string, ...args: any) {
    // only support
    // image <= 10MB
    // jpg, png, and gif
    // return file icon image
    // can add addtional arguments to change image property
    return this.storage.getFilePreview(this.bucketId, fileId, ...args);
  }

  deleteFile(fileId: string) {
    return this.storage.deleteFile(this.bucketId, fileId);
  }
}
