sap.ui.define([], function () {
  var Sender;
  (function (Sender) {
    Sender["AI"] = "AI";
  })(Sender || (Sender = {}));
  var FuncGetModels;
  (function (FuncGetModels) {
    FuncGetModels["name"] = "getModels";
  })(FuncGetModels || (FuncGetModels = {}));
  var FuncGetCompletion;
  (function (FuncGetCompletion) {
    FuncGetCompletion["name"] = "getCompletion";
    FuncGetCompletion["paramModel"] = "model";
    FuncGetCompletion["paramPersonality"] = "personality";
    FuncGetCompletion["paramChat"] = "chat";
  })(FuncGetCompletion || (FuncGetCompletion = {}));
  var Entity;
  (function (Entity) {
    Entity["Chats"] = "ChatService.Chats";
    Entity["Messages"] = "ChatService.Messages";
    Entity["Personalities"] = "ChatService.Personalities";
    Entity["Model"] = "ChatService.types.Model";
    Entity["Completion"] = "ChatService.types.Completion";
  })(Entity || (Entity = {}));
  var SanitizedEntity;
  (function (SanitizedEntity) {
    SanitizedEntity["Chats"] = "Chats";
    SanitizedEntity["Messages"] = "Messages";
    SanitizedEntity["Personalities"] = "Personalities";
    SanitizedEntity["Model"] = "Model";
    SanitizedEntity["Completion"] = "Completion";
  })(SanitizedEntity || (SanitizedEntity = {}));
  var __exports = {
    __esModule: true
  };
  __exports.Sender = Sender;
  __exports.FuncGetModels = FuncGetModels;
  __exports.FuncGetCompletion = FuncGetCompletion;
  __exports.Entity = Entity;
  __exports.SanitizedEntity = SanitizedEntity;
  return __exports;
});