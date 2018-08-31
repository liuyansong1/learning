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
var MoveObstacleType = {
    "SINGLELEFTTORIGHT": 0,
    "SINGLELEFTTHREE": 1,
    "SINGLERIGHTTHREE": 2,
    "DOUBLELEFTANDRIGHT": 3,
    "SINGLEMIDDLE": 4,
};
var MoveObstacleControl = /** @class */ (function (_super) {
    __extends(MoveObstacleControl, _super);
    function MoveObstacleControl() {
        var _this = _super.call(this) || this;
        _this.__lPos = new Laya.Vector3;
        _this.__rPos = new Laya.Vector3;
        _this.__moveSpeed = 0;
        _this.__moveLDir = 0;
        _this.__moveRDir = 0;
        _this.__widthBox = 1;
        _this.__loop = false;
        _this.__animOk = false;
        return _this;
    }
    MoveObstacleControl.prototype.update = function (t) {
        if (this.__active) {
            this.__updateMoveBoxes(t);
            this.__collect();
        }
    };
    MoveObstacleControl.prototype.__stopAnim = function () {
        if (!this.__loop) {
            this.__animOk = true;
        }
    };
    MoveObstacleControl.prototype.__updateMoveBoxes = function (t) {
        if (!(!this.__leftBox || this.__animOk || (!this.__loop && PlayerControl.Instance.curPos.z - this.__spanZ > GameSetting.moveObstacleActiveDis))) {
            switch (this.__moveType) {
                case MoveObstacleType.SINGLELEFTTORIGHT:
                    this.__lPos.x += this.__moveSpeed * this.__moveLDir * t;
                    if (this.__lPos.x < 2 * -this.__widthBox) {
                        this.__moveLDir = 1;
                        this.__stopAnim();
                    }
                    if (this.__lPos.x > 2 * this.__widthBox) {
                        this.__moveLDir = -1;
                        this.__stopAnim();
                    }
                    this.__leftBox.transform.localPosition = this.__lPos;
                    break;
                case MoveObstacleType.SINGLELEFTTHREE:
                    this.__lPos.x += this.__moveSpeed * this.__moveLDir * t;
                    if (this.__lPos.x < 2 * -this.__widthBox) {
                        this.__moveLDir = 1;
                        this.__stopAnim();
                    }
                    if (this.__lPos.x > 0) {
                        this.__moveLDir = -1;
                        this.__stopAnim();
                    }
                    this.__leftBox.transform.localPosition = this.__lPos;
                    break;
                case MoveObstacleType.SINGLERIGHTTHREE:
                    this.__lPos.x += this.__moveSpeed * this.__moveLDir * t;
                    if (this.__lPos.x < 0) {
                        this.__moveLDir = 1;
                        this.__stopAnim();
                    }
                    if (this.__lPos.x > 2 * this.__widthBox) {
                        this.__moveLDir = -1;
                        this.__stopAnim();
                    }
                    this.__leftBox.transform.localPosition = this.__lPos;
                    break;
                case MoveObstacleType.DOUBLELEFTANDRIGHT:
                    this.__lPos.x += this.__moveSpeed * this.__moveLDir * t;
                    if (this.__lPos.x > 0) {
                        this.__moveLDir = -1;
                        this.__stopAnim();
                    }
                    if (this.__lPos.x < -2 * this.__widthBox) {
                        this.__moveLDir = 1;
                        this.__stopAnim();
                    }
                    this.__leftBox.transform.localPosition = this.__lPos;
                    this.__rPos.x += this.__moveSpeed * this.__moveRDir * t;
                    if (this.__rPos.x < 0) {
                        this.__moveRDir = 1;
                        this.__stopAnim();
                    }
                    if (this.__rPos.x > 2 * this.__widthBox) {
                        this.__moveRDir = -1;
                        this.__stopAnim();
                    }
                    this.__rightBox.transform.localPosition = this.__rPos;
                    break;
                case MoveObstacleType.SINGLEMIDDLE:
                    this.__lPos.x += this.__moveSpeed * this.__moveLDir * t;
                    if (this.__lPos.x < -this.__widthBox) {
                        this.__moveLDir = 1;
                        this.__stopAnim();
                    }
                    if (this.__lPos.x > this.__widthBox) {
                        this.__moveLDir = -1;
                        this.__stopAnim();
                    }
                    this.__leftBox.transform.localPosition = this.__lPos;
                    break;
                default:
                    console.log("不能设置的类型Move");
            }
        }
    };
    MoveObstacleControl.prototype.reset = function (t) {
        this.__active = true;
        this.__spanZ = t["spanZ"];
        this.__setMoveObjs(t);
    };
    MoveObstacleControl.prototype.__setMoveObjs = function (t) {
        var e;
        var i = t["boxes"];
        var n = this.__moveType = t["type"];
        var r = t["lorr"];
        var a = 2 * this.__widthBox;
        if (this.__loop = !t["once"], this.__animOk = false, i)
            for (var s = 0; s < i.length; s++)
                this.__objs.push(i[s]);
        switch (n) {
            case MoveObstacleType.SINGLELEFTTORIGHT:
                this.__leftBox = i[0];
                (e = new Laya.Vector3(r ? -a : a, .5, this.__spanZ)).cloneTo(this.__lPos);
                this.__moveSpeed = GameSetting.initMoveObsatcle1Speed + GameSetting.moveObsatcle1AddSpeed * (GameData.Instance.level - 2);
                if (this.__moveSpeed >= GameSetting.moveObsatcle1MaxSpeed) {
                    this.__moveSpeed = GameSetting.moveObsatcle1MaxSpeed;
                }
                this.__moveLDir = r ? 1 : -1, this.__activeObj(this.__leftBox, e);
                break;
            case MoveObstacleType.SINGLELEFTTHREE:
                this.__leftBox = i[0];
                (e = new Laya.Vector3(-a, .5, this.__spanZ)).cloneTo(this.__lPos);
                this.__moveSpeed = GameSetting.initMoveObsatcle2Speed + GameSetting.moveObsatcle2AddSpeed * (GameData.Instance.level - 2);
                if (this.__moveSpeed >= GameSetting.moveObsatcle2MaxSpeed) {
                    this.__moveSpeed = GameSetting.moveObsatcle2MaxSpeed;
                }
                this.__moveLDir = 1;
                this.__activeObj(this.__leftBox, e);
                break;
            case MoveObstacleType.SINGLERIGHTTHREE:
                this.__leftBox = i[0];
                (e = new Laya.Vector3(a, .5, this.__spanZ)).cloneTo(this.__lPos);
                this.__moveSpeed = GameSetting.initMoveObsatcle3Speed + GameSetting.moveObsatcle3AddSpeed * (GameData.Instance.level - 2);
                if (this.__moveSpeed >= GameSetting.moveObsatcle3MaxSpeed) {
                    this.__moveSpeed = GameSetting.moveObsatcle3MaxSpeed;
                }
                this.__moveLDir = -1;
                this.__activeObj(this.__leftBox, e);
                break;
            case MoveObstacleType.DOUBLELEFTANDRIGHT:
                this.__moveSpeed = GameSetting.initMoveObsatcle4Speed + GameSetting.moveObsatcle4AddSpeed * (GameData.Instance.level - 2);
                if (this.__moveSpeed >= GameSetting.moveObsatcle4MaxSpeed) {
                    this.__moveSpeed = GameSetting.moveObsatcle4MaxSpeed;
                }
                this.__leftBox = i[0];
                (e = new Laya.Vector3(-a, .5, this.__spanZ)).cloneTo(this.__lPos);
                this.__moveLDir = 1;
                this.__activeObj(this.__leftBox, e);
                this.__rightBox = i[1];
                (e = new Laya.Vector3(a, .5, this.__spanZ)).cloneTo(this.__rPos);
                this.__moveRDir = -1;
                this.__activeObj(this.__rightBox, e);
                break;
            case MoveObstacleType.SINGLEMIDDLE:
                this.__leftBox = i[0];
                (e = new Laya.Vector3(r ? -this.__widthBox : this.__widthBox, .5, this.__spanZ)).cloneTo(this.__lPos);
                this.__moveSpeed = GameSetting.initMoveObsatcle5Speed + GameSetting.moveObsatcle5AddSpeed * (GameData.Instance.level - 2);
                if (this.__moveSpeed >= GameSetting.moveObsatcle5MaxSpeed) {
                    this.__moveSpeed = GameSetting.moveObsatcle5MaxSpeed;
                }
                this.__moveLDir = r ? 1 : -1;
                this.__activeObj(this.__leftBox, e);
                break;
            default:
                console.log("不能设置的类型Move");
        }
    };
    MoveObstacleControl.prototype.hide = function () {
        _super.prototype.hide.call(this);
        this.__leftBox = null;
        this.__rightBox = null;
    };
    return MoveObstacleControl;
}(FixedObstacleControl));
//# sourceMappingURL=MoveObstacleControl.js.map