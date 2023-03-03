sap.ui.define(["sap/m/MessageBox", "sap/ui/Device"], function (MessageBox, sap_ui_Device) {
  const Action = MessageBox["Action"];
  const support = sap_ui_Device["support"];
  /**
   * @namespace com.p36.capui5gptchat.util
   */
  class Helper {
    /**
     * Helper for confirmation dialogs.
     *
     * @param title {string}
     * @param text {string}
     * @param callback {() => void}
     */
    static withConfirmation(title, text, callback) {
      MessageBox.confirm(text, {
        title,
        onClose: action => {
          if (action === Action.OK) {
            callback();
          }
        }
      });
    }

    /**
     * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
     * design mode class should be set, which influences the size appearance of some controls.
     *
     * @public
     * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
     */
    static getContentDensityClass() {
      if (this.contentDensityClass === undefined) {
        // check whether FLP has already set the content density class; do nothing in this case
        if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
          this.contentDensityClass = "";
        } else if (!support.touch) {
          // apply "compact" mode if touch is not supported
          this.contentDensityClass = "sapUiSizeCompact";
        } else {
          // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
          this.contentDensityClass = "sapUiSizeCozy";
        }
      }
      return this.contentDensityClass;
    }
  }
  return Helper;
});