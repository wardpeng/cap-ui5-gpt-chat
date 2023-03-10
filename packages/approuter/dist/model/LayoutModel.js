sap.ui.define(["sap/f/library", "sap/ui/model/json/JSONModel"], function (sap_f_library, JSONModel) {
  const LayoutType = sap_f_library["LayoutType"];
  class LayoutModel extends JSONModel {
    setData(data, merge) {
      super.setData(data, merge);
    }
    getData() {
      return super.getData();
    }
    setLayout(layout) {
      this.setData({
        currentLayout: layout,
        oldLayout: this.getLayout(),
        isFullScreen: layout === LayoutType.MidColumnFullScreen || layout === LayoutType.EndColumnFullScreen
      });
    }
    getLayout() {
      return this.getProperty("/currentLayout");
    }
    setMidColumnFullScreen() {
      this.setLayout(LayoutType.MidColumnFullScreen);
    }
    setEndColumnFullScreen() {
      this.setLayout(LayoutType.EndColumnFullScreen);
    }
    exitFullScreen() {
      this.setLayout(this.getProperty("/oldLayout"));
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.LayoutModel = LayoutModel;
  return __exports;
});