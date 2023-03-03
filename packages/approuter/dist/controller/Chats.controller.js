sap.ui.define(["./BaseController", "../service/NewEntityDialog"], function (__BaseController, __NewEntityDialog) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  const NewEntityDialog = _interopRequireDefault(__NewEntityDialog);
  /**
   * @namespace com.p36.capui5gptchat.controller
   */
  const Chats = BaseController.extend("com.p36.capui5gptchat.controller.Chats", {
    onInit: function _onInit() {
      this.getRouter().getRoute("home").attachPatternMatched(this.onRouteMatched, this);
    },
    onRouteMatched: function _onRouteMatched(event) {
      this.getView().byId("chatList").getBinding("items").refresh();
    },
    onChatPress: function _onChatPress(event) {
      const item = event.getParameter("listItem");
      this.getRouter().navTo("chat", {
        chat: item.getBindingContext().getProperty("ID")
      });
    },
    onAddChat: async function _onAddChat(event) {
      const binding = this.getView().byId("chatList").getBinding("items");
      let context = binding.create({
        model: "text-davinci-003"
      });
      const dialog = new NewEntityDialog(context, "NewChatDialog", this.getView());
      await dialog.open().catch(() => {
        context.delete("$auto");
      });
      this.getRouter().navTo("chat", {
        chat: context.getObject().ID
      });
    }
  });
  return Chats;
});