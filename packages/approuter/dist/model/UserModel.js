sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  class UserModel extends JSONModel {
    /**
     * Initializes the user model by calling the user-api.
     * If the user-api is not available, the user is unknown.
     */
    async initialize() {
      const res = await fetch(sap.ui.require.toUrl("com/p36/capui5gptchat/user-api/currentUser"));
      if (res?.ok) {
        const data = await res.json();
        this.setData(data);
      } else {
        this.setProperty("/displayName", "unknown");
      }
    }
    getUser() {
      return this.getData();
    }
  }
  return UserModel;
});