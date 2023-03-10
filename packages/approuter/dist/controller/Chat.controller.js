sap.ui.define(["./BaseController", "../util/Helper", "../types/ChatService", "../service/ChatService"], function (__BaseController, __Helper, ___types_ChatService, __ChatService) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  const Helper = _interopRequireDefault(__Helper);
  const Sender = ___types_ChatService["Sender"];
  const ChatService = _interopRequireDefault(__ChatService);
  /**
   * @namespace com.p36.capui5gptchat.controller
   */
  const Chat = BaseController.extend("com.p36.capui5gptchat.controller.Chat", {
    onInit: function _onInit() {
      this.getRouter().getRoute("chat").attachPatternMatched(this.onRouteMatched, this);
    },
    onAfterRendering: function _onAfterRendering() {
      this.addKeyboardEventsToInput();
      this.getView().byId("messageList").addEventDelegate({
        onAfterRendering: () => {
          this.scrollToBottom(100, "auto");
        }
      });
    },
    onRouteMatched: function _onRouteMatched(event) {
      const {
        chat
      } = event.getParameter("arguments");
      this.getView().bindElement({
        path: `/Chats(${chat})`
      });
    },
    onDeleteChat: function _onDeleteChat(event) {
      Helper.withConfirmation("Delete Chat", "Are you sure you want to delete this chat?", async () => {
        await ChatService.getInstance().deleteEntity(this.getView().getBindingContext());
        this.getRouter().navTo("home");
      });
    },
    onPostMessage: async function _onPostMessage(event) {
      const message = event.getParameter("value");
      const chat = this.getView().getBindingContext().getObject();
      const chatService = ChatService.getInstance();
      const binding = this.getView().byId("messageList").getBinding("items");
      await chatService.createEntity({
        text: message.trim(),
        model: chat.model,
        sender: this.getModel("user").getUser().displayName,
        chat_ID: chat.ID
      }, binding, false, true);
      const completion = await chatService.getCompletion({
        chat: chat.ID,
        model: chat.model,
        personality: chat.personality_ID
      });
      await chatService.createEntity({
        text: completion.message,
        model: chat.model,
        sender: Sender.AI,
        chat_ID: chat.ID
      }, binding, false, true);
    },
    scrollToBottom: function _scrollToBottom(timeout, behavior = "smooth") {
      setTimeout(() => {
        const items = this.getView().byId("messageList").getItems();
        items[items.length - 1].getDomRef().scrollIntoView({
          behavior: behavior
        });
      }, timeout);
    },
    addKeyboardEventsToInput: function _addKeyboardEventsToInput() {
      const input = this.getView().byId("newMessageInput");
      input.attachBrowserEvent("keydown", event => {
        if (event.key == "Enter" && (event.ctrlKey || event.metaKey) && input.getValue().trim() != "") {
          input.fireEvent("post", {
            value: input.getValue()
          });
          input.setValue(null);
          event.preventDefault();
        }
      });
    }
  });
  return Chat;
});