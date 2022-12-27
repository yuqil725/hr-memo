import { ApiBucket } from "./bucket";

export class ApiProfileBucket extends ApiBucket {
  constructor(apiEndpoint: string, projectId: string, bucketId: string) {
    super(apiEndpoint, projectId, bucketId);
  }
}
