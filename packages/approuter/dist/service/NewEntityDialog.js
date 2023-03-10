sap.ui.define(["sap/ui/core/Fragment"], function (Fragment) {
  class NewEntityDialog {
    constructor(context, fragment, view) {
      this.context = context;
      this.fragment = fragment;
      this.view = view;
    }
    async open() {
      this.model = this.context.getModel();
      return new Promise(async (resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        this.dialog = await Fragment.load({
          id: "newEntityDialog",
          name: `com.p36.capui5gptchat.fragment.${this.fragment}`,
          controller: this
        });
        this.view.addDependent(this.dialog);
        this.dialog.setBindingContext(this.context);
        this.context.created().then(() => {
          this.dialog.close();
          this.resolve(this.context);
        }, reject);
        this.dialog.open();
      });
    }
    async onCreate() {
      await this.model.submitBatch(this.model.getUpdateGroupId());
    }
    onCancel() {
      this.dialog.close();
      this.reject({
        error: "User cancelled"
      });
    }
  }
  return NewEntityDialog;
});