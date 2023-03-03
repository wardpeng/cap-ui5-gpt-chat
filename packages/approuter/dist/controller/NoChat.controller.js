sap.ui.define(["./BaseController"], function (__BaseController) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  /**
   * @namespace com.p36.capui5gptchat.controller
   */
  const NoChat = BaseController.extend("com.p36.capui5gptchat.controller.NoChat", {});
  return NoChat;
});