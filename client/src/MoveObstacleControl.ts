/*
* name;
*/
var MoveObstacleType = {
    "SINGLELEFTTORIGHT": 0,
    "SINGLELEFTTHREE": 1,
    "SINGLERIGHTTHREE": 2,
    "DOUBLELEFTANDRIGHT": 3,
    "SINGLEMIDDLE": 4,
}

class MoveObstacleControl extends FixedObstacleControl {
    __active: boolean;
    __animOk: boolean;
    __lPos: Laya.Vector3;
    __leftBox: Laya.MeshSprite3D;
    __loop: boolean;
    __moveLDir: number;
    __moveRDir: number;
    __moveSpeed: number;
    __moveType: number;
    __objs: Array<any>;
    __rPos: Laya.Vector3;
    __rightBox: Laya.MeshSprite3D;
    __spanZ: number;
    __widthBox: number;

    constructor() {
        super();
        this.__lPos = new Laya.Vector3;
        this.__rPos = new Laya.Vector3;
        this.__moveSpeed = 0;
        this.__moveLDir = 0;
        this.__moveRDir = 0;
        this.__widthBox = 1;
        this.__loop = false;
        this.__animOk = false;
    }



    update(t: number) {
        if (this.__active) {
            this.__updateMoveBoxes(t);
            this.__collect();
        }
    }

    __stopAnim() {
        if (!this.__loop) { this.__animOk = true; }
    }


    __updateMoveBoxes(t: number) {
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
    }

    reset(t: Object) {
        this.__active = true;
        this.__spanZ = t["spanZ"];
        this.__setMoveObjs(t);
    }

    __setMoveObjs(t: Object) {
        var e: Laya.Vector3;
        var i: Array<Laya.MeshSprite3D> = t["boxes"];
        var n: number = this.__moveType = t["type"];
        var r: boolean = t["lorr"];
        var a: number = 2 * this.__widthBox;
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
                    this.__moveSpeed = GameSetting.moveObsatcle2MaxSpeed
                }
                this.__moveLDir = 1;
                this.__activeObj(this.__leftBox, e);
                break;
            case MoveObstacleType.SINGLERIGHTTHREE:
                this.__leftBox = i[0];
                (e = new Laya.Vector3(a, .5, this.__spanZ)).cloneTo(this.__lPos);
                this.__moveSpeed = GameSetting.initMoveObsatcle3Speed + GameSetting.moveObsatcle3AddSpeed * (GameData.Instance.level - 2);
                if (this.__moveSpeed >= GameSetting.moveObsatcle3MaxSpeed) {
                    this.__moveSpeed = GameSetting.moveObsatcle3MaxSpeed
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
    }

    hide() {
        super.hide();
        this.__leftBox = null;
        this.__rightBox = null;
    }
}