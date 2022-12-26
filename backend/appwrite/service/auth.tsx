import { Models } from "appwrite";
import { ApiBase, printPromise } from "../api_base";

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

  createSessionIfNoLogin(email: any, password: any) {
    let sessions: Models.Session[] = printPromise(this.listSession());

    if (!sessions) {
      this.createSession(email, password);
    }
  }
}
