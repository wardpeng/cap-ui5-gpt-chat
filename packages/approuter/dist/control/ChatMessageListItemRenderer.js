sap.ui.define([
    'sap/ui/core/Renderer',
    'sap/m/Text',
    'com/p36/capui5gptchat/thirdparty/showdown',
    'com/p36/capui5gptchat/thirdparty/showdown-highlight/lib/index'
], function (Renderer, Text, __showdown, __showdownHighlight) {
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule && typeof obj.default !== 'undefined' ? obj.default : obj;
    }
    const showdown = _interopRequireDefault(__showdown);
    const showdownHighlight = _interopRequireDefault(__showdownHighlight);
    const ChatMessageListItemRenderer = Renderer.extend('sap.m.ListItemBaseRenderer');
    ChatMessageListItemRenderer.renderLIContent = (rm, control) => {
        rm.openStart('div').class('sapMMessageListItem').openEnd();
        rm.openStart('div').class('sapMMessageListItemText').openEnd();
        rm.unsafeHtml(ChatMessageListItemRenderer.markdownToHtml(control.getMessage()));
        rm.close('div');
        rm.openStart('div').class('sapMMessageListItemHeader').openEnd();
        rm.renderControl(control.getAggregation('avatar'));
        rm.openStart('div').class('sapMMessageListItemInfo').openEnd();
        rm.renderControl(new Text({ text: control.getSender() }));
        rm.renderControl(new Text({ text: '|' }));
        rm.renderControl(new Text({ text: control.getDate() }));
        rm.close('div');
        rm.close('div');
        rm.close('div');
    };
    ChatMessageListItemRenderer.markdownToHtml = text => {
        const converter = new showdown.Converter({
            extensions: [showdownHighlight({
                    pre: true,
                    auto_detection: true
                })]
        });
        converter.setFlavor('github');
        return converter.makeHtml(text);
    };
    return ChatMessageListItemRenderer;
});