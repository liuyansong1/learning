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
/*
* name;
*/
var indexFrame = /** @class */ (function (_super) {
    __extends(indexFrame, _super);
    function indexFrame() {
        var _this = _super.call(this) || this;
        _this.startBtn.on(Laya.Event.CLICK, _this, function () {
            this.removeSelf();
            GameManager.Instance.gameStart();
        });
        return _this;
    }
    return indexFrame;
}(ui.indexFrameUI));
//# sourceMappingURL=indexFrame.js.map