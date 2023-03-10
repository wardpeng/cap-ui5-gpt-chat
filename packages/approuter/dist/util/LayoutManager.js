sap.ui.define(["sap/f/library"], function (sap_f_library) {
  const LayoutType = sap_f_library["LayoutType"];
  class LayoutManager {
    /**
     * Private constructor to prevent creating instances of this class.
     * Use the static getInstance() method instead.
     */
    constructor() {}

    /**
     * Instantiates the LayoutManager if it doesn't exist yet and returns the singleton instance.
     *
     * @returns {LayoutManager} The singleton instance of the LayoutManager.
     */
    static getInstance() {
      this.instance ??= new LayoutManager();
      return this.instance;
    }
    setModel(model) {
      this.model = model;
    }
    setLayout(layout) {
      this.model.setData({
        currentLayout: layout,
        oldLayout: this.getLayout(),
        isFullScreen: layout === LayoutType.MidColumnFullScreen || layout === LayoutType.EndColumnFullScreen
      });
    }
    getLayout() {
      return this.model.getProperty("/currentLayout");
    }
    setMidColumnFullScreen() {
      this.setLayout(LayoutType.MidColumnFullScreen);
    }
    setEndColumnFullScreen() {
      this.setLayout(LayoutType.EndColumnFullScreen);
    }
    exitFullScreen() {
      this.setLayout(this.model.getProperty("/oldLayout"));
    }
  }
  return LayoutManager;
});