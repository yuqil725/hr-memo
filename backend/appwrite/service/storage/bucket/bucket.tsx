import { ID } from "appwrite";
import { Platform } from "react-native";
import { Constants } from "../../../../../Constants";
import { UrlToObject } from "../../../../../utils/cameraUtil";
import { ApiStorage } from "../storage";

export class ApiBucket extends ApiStorage {
  bucketId: string;

  constructor(apiEndpoint: string, projectId: string, bucketId: string) {
    super(apiEndpoint, projectId);
    this.bucketId = bucketId;
  }

  createFile(filePath: string, fileName: string, file?: File) {
    if (file) {
      return this.storage.createFile(this.bucketId, ID.unique(), file);
    } else if (Platform.OS === "ios") {
      // do something for ios
      return this.createFileFromIos(filePath, fileName);
    } else if (Platform.OS === "android") {
      console.error("Haven't supported android");
      // other thing for android
    } else if (Platform.OS === "web") {
      // it's on web!
      return this.createFileFromWeb(filePath, fileName);
    } else {
      // you probably won't end up here unless you support another platform!
    }
  }

  createFileURL() {
    return `${Constants.API_ENDPOINT}/storage/buckets/${this.bucketId}/files/`;
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

  sendXmlHttpRequest(data: any) {
    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
          return;
        }
        console.log("xhr.status", xhr);

        if (xhr.status === 201) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject("Request Failed");
        }
      };

      xhr.open(
        "POST",
        `${Constants.API_ENDPOINT}/storage/buckets/${this.bucketId}/files/`
      );
      xhr.withCredentials = true;
      // xhr.setRequestHeader("content-type", "multipart/form-data");
      xhr.setRequestHeader("X-Appwrite-Project", this.projectId);
      xhr.setRequestHeader("X-Appwrite-Response-Format", "0.15.0");
      xhr.setRequestHeader("x-sdk-version", "appwrite:web:9.0.1");
      xhr.send(data);
    });
  }

  createFileFromWeb = async (imagePath: string, fileName: string) => {
    const fileId = ID.unique();
    return this.storage.createFile(
      this.bucketId,
      fileId,
      await UrlToObject(imagePath, fileName)
    );
  };

  createFileFromIos = async (imagePath: string, fileName: string) => {
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(imagePath);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("fileId", "unique()");
    formData.append("file", {
      uri: imagePath,
      name: fileName,
      type,
    } as any);

    console.log("formData", formData);
    return this.sendXmlHttpRequest(formData);
  };
}
