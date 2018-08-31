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
var PlayerCollisionCheck = /** @class */ (function (_super) {
    __extends(PlayerCollisionCheck, _super);
    function PlayerCollisionCheck() {
        return _super.call(this) || this;
    }
    PlayerCollisionCheck.prototype.onTriggerEnter = function (t) {
        "speedUp" === t.owner.name && PlayerControl.Instance.speedUp();
        "box" === t.owner.name && PlayerControl.Instance.hitLose();
        "jump" === t.owner.name && PlayerControl.Instance.fly();
    };
    return PlayerCollisionCheck;
}(Laya.Script));
//# sourceMappingURL=PlayerCollisionCheck.js.map