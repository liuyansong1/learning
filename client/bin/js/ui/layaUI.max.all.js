var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var indexFrameUI = /** @class */ (function (_super) {
        __extends(indexFrameUI, _super);
        function indexFrameUI() {
            return _super.call(this) || this;
        }
        indexFrameUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.indexFrameUI.uiView);
        };
        indexFrameUI.uiView = { "type": "View", "props": { "width": 640, "height": 1136 }, "child": [{ "type": "Button", "props": { "var": "startBtn", "stateNum": 2, "skin": "indexFrame/res_01.png", "centerX": 0, "bottom": 200 } }] };
        return indexFrameUI;
    }(View));
    ui.indexFrameUI = indexFrameUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map