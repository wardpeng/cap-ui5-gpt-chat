sap.ui.define(["sap/m/ListItemBase", "./ChatMessageListItemRenderer"], function (ListItemBase, __ChatMessageListItemRenderer) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const ChatMessageListItemRenderer = _interopRequireDefault(__ChatMessageListItemRenderer);
  /**
   * @namespace com.p36.capui5gptchat
   */
  const ChatMessageListItem = ListItemBase.extend("com.p36.capui5gptchat.ChatMessageListItem", {
    renderer: ChatMessageListItemRenderer,
    metadata: {
      properties: {
        message: {
          type: "string",
          group: "Misc",
          defaultValue: ""
        },
        sender: {
          type: "string",
          group: "Misc",
          defaultValue: ""
        },
        date: {
          type: "string",
          group: "Misc",
          defaultValue: ""
        }
      },
      aggregations: {
        avatar: {
          type: "sap.m.Avatar",
          multiple: false
        }
      }
    }
  });
  return ChatMessageListItem;
});