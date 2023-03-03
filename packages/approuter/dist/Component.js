sap.ui.define(["sap/ui/core/UIComponent", "./model/models", "./service/ChatService", "./util/IconFonts", "./util/LayoutManager"], function (UIComponent, __models, __ChatService, __IconFonts, __LayoutManager) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const models = _interopRequireDefault(__models);
  const ChatService = _interopRequireDefault(__ChatService);
  const IconFonts = _interopRequireDefault(__IconFonts);
  const LayoutManager = _interopRequireDefault(__LayoutManager);
  /**
   * @namespace com.p36.capui5gptchat
   */
  const Component = UIComponent.extend("com.p36.capui5gptchat.Component", {
    metadata: {
      manifest: "json"
    },
    init: async function _init() {
      UIComponent.prototype.init.call(this);
      this.setModel(models.createDeviceModel(), "device");
      this.setModel(models.createAppModel(), "app");
      this.setModel(await models.createUserModel(), "user");
      const layoutModel = models.createLayoutModel();
      this.setModel(layoutModel, "appLayout");
      LayoutManager.getInstance().setModel(layoutModel);
      ChatService.getInstance().setModel(this.getModel());
      IconFonts.register();
      this.getRouter().initialize();
    }
  });
  return Component;
});