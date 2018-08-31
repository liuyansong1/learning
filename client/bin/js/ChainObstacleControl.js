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
var ChainObstacleType = {
    "UPDOWNONEBYONE": 0,
    "ROTATELOOP": 1
};
var ChainObstacleControl = /** @class */ (function (_super) {
    __extends(ChainObstacleControl, _super);
    function ChainObstacleControl() {
        var _this = _super.call(this) || this;
        _this.__upDir = 0;
        _this.__animOk = false;
        _this.__animDelay = 0;
        _this.__animTimer = 0;
        _this.__moveDir = 0;
        _this.__moveSpeed = 0;
        _this.__moveIndex = 0;
        _this.__chainBoxesStates = [{
                canAnim: false,
                upDir: 1
            }, {
                canAnim: false,
                upDir: 1
            }, {
                canAnim: false,
                upDir: 1
            }, {
                canAnim: false,
                upDir: 1
            }, {
                canAnim: false,
                upDir: 1
            }];
        _this.__rotateSpeed = 30;
        _this.__rotDir = 0;
        _this.__rotZ = 0;
        _this.__boxWidth = 1;
        return _this;
    }
    ;
    ChainObstacleControl.prototype.update = function (t) {
        if (this.__active) {
            this.__updateBoxes(t);
            this.__collect();
        }
    };
    ChainObstacleControl.prototype.__updateBoxes = function (t) {
        switch (this.__chainType) {
            case ChainObstacleType["UPDOWNONEBYONE"]:
                this.__upDownBoxes(t);
                break;
            case ChainObstacleType["ROTATELOOP"]:
                this.__rotateBoxes(t);
                break;
            default:
                console.log("不能设置的类型chain");
        }
    };
    ChainObstacleControl.prototype.__rotateBoxes = function (t) {
        this.__rotZ += this.__rotateSpeed * this.__rotDir * t;
        if (this.__rotZ > 180) {
            this.__rotDir = -1;
            this.__rotZ = 180;
        }
        if (this.__rotZ < 0) {
            this.__rotDir = 1,
                this.__rotZ = 0;
        }
        for (var e = this.__rotZ * Math.PI / 180, i = Math.sin(e), n = Math.cos(e), r = 0; r < 3; r++) {
            this.__objs[r].transform.localRotationEuler = new Laya.Vector3(0, 0, this.__rotZ);
            this.__objs[r].transform.localPosition = new Laya.Vector3(this.__boxWidth * r * n, this.__boxWidth * r * i + this.__boxWidth / 2, this.__spanZ);
        }
    };
    ChainObstacleControl.prototype.__upDownBoxes = function (t) {
        if (!this.__animOk) {
            this.__animTimer += t;
            if (this.__animTimer > this.__animDelay) {
                this.__nextBox(),
                    this.__animTimer = 0;
            }
        }
        ;
        for (var e = 0; e < 5; e++)
            if (this.__chainBoxesStates[e]["canAnim"]) {
                this.__upDownSingleBox(t, this.__objs[e], this.__chainBoxesStates[e]);
            }
    };
    ChainObstacleControl.prototype.__upDownSingleBox = function (t, e, i) {
        var n = e.transform.localPosition;
        n.y += i["upDir"] * this.__moveSpeed * t;
        if (n.y > 3 * this.__boxWidth) {
            n.y = 3 * this.__boxWidth;
            i["upDir"] = -1;
        }
        if (n.y < this.__boxWidth / 2) {
            n.y = this.__boxWidth / 2;
            i["upDir"] = 1;
        }
        e.transform.localPosition = n;
    };
    ChainObstacleControl.prototype.__nextBox = function () {
        this.__moveIndex += this.__moveDir;
        if (this.__moveDir > 0 && this.__moveIndex > 4) {
            this.__animOk = true;
        }
        else if (this.__moveDir < 0 && this.__moveIndex < 0) {
            this.__animOk = true;
        }
        else {
            this.__chainBoxesStates[this.__moveIndex]["canAnim"] = true;
            this.__chainBoxesStates[this.__moveIndex]["upDir"] = 1;
        }
    };
    ChainObstacleControl.prototype.reset = function (t) {
        this.__active = true;
        this.__spanZ = t["spanZ"];
        this.__setChainBoxes(t);
    };
    ChainObstacleControl.prototype.__resetChainBoxesState = function (t) {
        for (var e = 0; e < 5; e++) {
            this.__chainBoxesStates[e]["canAnim"] = e === t;
            this.__chainBoxesStates[e]["upDir"] = 1;
        }
    };
    ChainObstacleControl.prototype.__setChainBoxes = function (t) {
        var e = t["boxes"];
        var i = this.__chainType = t["type"];
        var n = Math.random() > .5;
        this.__boxWidth;
        switch (i) {
            case ChainObstacleType["UPDOWNONEBYONE"]:
                for (var r = 0; r < 5; r++) {
                    this.__activeObj(e[r], new Laya.Vector3(r - 2, .5, this.__spanZ));
                    this.__objs.push(e[r]);
                }
                this.__animDelay = GameSetting.chainMoveObsatcle1Delay;
                this.__animTimer = 0;
                this.__upDir = 1;
                this.__animOk = false;
                this.__moveIndex = n ? 0 : 4;
                this.__moveDir = n ? 1 : -1;
                this.__resetChainBoxesState(this.__moveIndex);
                this.__moveSpeed = GameSetting.initChainMoveObsatcle1Speed + GameSetting.chainMoveObsatcle1AddSpeed * (GameData.Instance.level - 2);
                this.__moveSpeed >= GameSetting.chainMoveObsatcle1MaxSpeed && (this.__moveSpeed = GameSetting.chainMoveObsatcle1MaxSpeed);
                break;
            case ChainObstacleType["ROTATELOOP"]:
                this.__rotZ = n ? 0 : 180;
                this.__rotDir = n ? 1 : -1;
                this.__rotateSpeed = GameSetting.initChainMoveObsatcle2Speed + GameSetting.chainMoveObsatcle2AddSpeed * (GameData.Instance.level - 2);
                if (this.__rotateSpeed >= GameSetting.chainMoveObsatcle2MaxSpeed) {
                    this.__rotateSpeed = GameSetting.chainMoveObsatcle2MaxSpeed;
                }
                this.__activeObj(e[0], new Laya.Vector3(0, .5, this.__spanZ));
                this.__objs.push(e[0]);
                this.__activeObj(e[1], new Laya.Vector3(n ? -this.__boxWidth : this.__boxWidth, .5, this.__spanZ));
                this.__objs.push(e[1]);
                this.__activeObj(e[2], new Laya.Vector3(n ? -2 * this.__boxWidth : 2 * this.__boxWidth, .5, this.__spanZ));
                this.__objs.push(e[2]);
                break;
            default:
                console.log("不能设置的类型chain");
        }
    };
    ChainObstacleControl.prototype.hide = function () {
        if (this.__active) {
            this.__active = false;
            for (var t = 0; t < this.__objs.length; t++) {
                var e = this.__objs[t];
                e.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
                e.active = this.__active;
                var i = e.getComponentByType(Laya.BoxCollider);
                if (i) {
                    i.enable = this.__active;
                }
            }
            this.__objs = [];
        }
    };
    return ChainObstacleControl;
}(FixedObstacleControl));
//# sourceMappingURL=ChainObstacleControl.js.map