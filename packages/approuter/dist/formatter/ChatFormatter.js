sap.ui.define(["../types/ChatService"], function (___types_ChatService) {
  const Sender = ___types_ChatService["Sender"];
  /**
   * @namespace com.p36.capui5gptchat.formatter
   */
  class ChatFormatter {
    /**
     *
     * @param sender {string}
     * @returns {string}
     */
    static senderIcon(sender) {
      return sender === Sender.AI ? "sap-icon://tnt/robot" : "sap-icon://tnt/user";
    }

    /**
     *
     * @param id {string}
     * @returns {boolean}
     */
    static itemIsVisibleInList(id) {
      return !!id;
    }
  }
  return ChatFormatter;
});