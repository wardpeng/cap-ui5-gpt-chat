sap.ui.define(["sap/m/BusyDialog", "sap/m/MessageBox"], function (BusyDialog, MessageBox) {
  class ChatService {
    static getInstance() {
      this.instance ??= new ChatService();
      return this.instance;
    }
    constructor() {}
    setModel(model) {
      this.model = model;
    }

    /**
     * Creates a single entity in the OData service by using the ODataListBinding.
     *
     * @param entity {T}
     * @param binding {sap.ui.model.odata.v4.ODataListBinding}
     * @param skipRefresh {boolean}
     * @param atEnd {boolean}
     * @returns {Promise<T>}
     */
    createEntity(entity, binding, skipRefresh = false, atEnd = false) {
      return new Promise((resolve, reject) => {
        const context = binding.create(entity, skipRefresh, atEnd);
        context.created().then(() => {
          resolve(context.getObject());
        }, reject);
        this.model.submitBatch(this.model.getUpdateGroupId());
      });
    }

    /**
     * Deletes a single entity in the OData service by using the ODataContextBinding.
     *
     * @param context {sap.ui.model.odata.v4.Context}
     * @returns {Promise<void>}
     */
    deleteEntity(context) {
      return new Promise((resolve, reject) => {
        context.delete().then(resolve, reject);
        this.model.submitBatch(this.model.getUpdateGroupId());
      });
    }

    /**
     * Retrieve the completion from the OData service by calling the getCompletion function.
     *
     * @param params {IFuncGetCompletionParams}
     * @returns {Promise<ICompletion>}
     */
    async getCompletion(params) {
      return new Promise((resolve, reject) => {
        const binding = this.model.bindContext("/getCompletion(...)");
        binding.setParameter("model", params.model);
        binding.setParameter("chat", params.chat);
        binding.setParameter("personality", params.personality);
        const dialog = new BusyDialog({
          text: "Thinking..."
        });
        dialog.open();
        binding.execute().then(() => {
          dialog.close();
          resolve(binding.getBoundContext().getObject());
        }, error => {
          dialog.close();
          MessageBox.alert(error.message, {
            title: "Error"
          });
          reject(error);
        });
      });
    }
  }
  return ChatService;
});