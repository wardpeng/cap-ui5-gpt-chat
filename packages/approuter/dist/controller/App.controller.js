sap.ui.define(["../util/Helper", "./BaseController"], function (__Helper, __BaseController) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const Helper = _interopRequireDefault(__Helper);
  const BaseController = _interopRequireDefault(__BaseController);
  /**
   * @namespace com.p36.capui5gptchat.controller
   */
  const App = BaseController.extend("com.p36.capui5gptchat.controller.App", {
    onInit: function _onInit() {
      // apply content density mode to root view
      this.getView().addStyleClass(Helper.getContentDensityClass());
    }
  });
  return App;
});