sap.ui.define(["sap/ui/core/IconPool"], function (IconPool) {
  /**
   * @namespace com.p36.capui5gptchat.util
   */
  class IconFonts {
    static register() {
      IconPool.registerFont({
        collectionName: "tnt",
        fontFamily: "SAP-icons-TNT",
        fontURI: sap.ui.require.toUrl("sap/tnt/themes/base/fonts"),
        lazy: true
      });
      IconPool.registerFont({
        collectionName: "suite",
        fontFamily: "BusinessSuiteInAppSymbols",
        fontURI: sap.ui.require.toUrl("sap/ushell/themes/base/fonts/"),
        lazy: true
      });
    }
  }
  return IconFonts;
});