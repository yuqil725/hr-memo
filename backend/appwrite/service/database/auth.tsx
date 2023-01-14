import { ApiBase } from "../../api_base";

export class ApiAuth extends ApiBase {
  constructor(apiEndpoint: string, projectId: string) {
    super(apiEndpoint, projectId);
  }

  createAccount(email: any, password: any, name: any) {
    return this.account.create("unique()", email, password, name);
  }

  getAccount() {
    return this.account.get();
  }

  createSession(email: any, password: any) {
    return this.account.createEmailSession(email, password);
  }

  listSession() {
    return this.account.listSessions();
  }

  deleteCurrentSession() {
    return this.account.deleteSession("current");
  }

  createSessionIfNoLogin(email: any, password: any, onSuccess?: any) {
    let apiAuth: any = this;
    let promise: any = this.listSession();
    promise.then(
      function (response: any) {
        console.log("Found existing sessions:", response);
        onSuccess && onSuccess();
      },
      function (error: any) {
        console.log("Didn't find session", error);
        apiAuth.createSession(email, password);
      }
    );
  }
}
