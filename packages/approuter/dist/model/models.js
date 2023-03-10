sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/model/BindingMode", "sap/ui/Device", "sap/f/library", "./UserModel", "./LayoutModel"], function (JSONModel, BindingMode, Device, sap_f_library, __UserModel, ___LayoutModel) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const LayoutType = sap_f_library["LayoutType"];
  const UserModel = _interopRequireDefault(__UserModel);
  const LayoutModel = ___LayoutModel["LayoutModel"];
  var __exports = {
    createDeviceModel: () => {
      const model = new JSONModel(Device);
      model.setDefaultBindingMode(BindingMode.OneWay);
      return model;
    },
    createAppModel: () => {
      const model = new JSONModel({
        layout: LayoutType.TwoColumnsMidExpanded
      });
      model.setDefaultBindingMode(BindingMode.OneWay);
      return model;
    },
    createUserModel: async () => {
      const userModel = new UserModel();
      await userModel.initialize();
      return userModel;
    },
    createLayoutModel: () => {
      const layoutModel = new LayoutModel();
      layoutModel.setData({
        currentLayout: LayoutType.TwoColumnsMidExpanded,
        isFullScreen: false
      });
      return layoutModel;
    }
  };
  return __exports;
});