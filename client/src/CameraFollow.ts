/*
* name;
*/
class CameraFollow {
    __initPos: Laya.Vector3;
    __curPos: Laya.Vector3;
    __maxPosY: number;
    __minPosY: number;
    __offsetZ: number;
    __curRot: Laya.Vector3;
    __maxRotZ: number;
    __rotateSpeed: number;
    __camera: Laya.Camera;

    static Instance: CameraFollow;
    constructor() {
        CameraFollow.Instance = this;
        this.__initPos = new Laya.Vector3(0, 2, 8);
        this.__curPos = new Laya.Vector3(0, 2, 8);
        this.__maxPosY = 2;
        this.__minPosY = 1.3;
        this.__offsetZ = 8;
        this.__curRot = new Laya.Vector3();
        this.__maxRotZ = 10;
        this.__rotateSpeed = 5;
    }



    __updatePos(t: number) {
        var e: number = PlayerControl.Instance.moveSpeed;
        var i: number = PlayerControl.Instance.maxSpeed;
        var n: number = PlayerControl.Instance.minSpeed;
        this.__curPos.y = this.__maxPosY - (e - n) / (i - n) * (this.__maxPosY - this.__minPosY);
        this.__curPos.z = PlayerControl.Instance.curPos.z + this.__offsetZ;
        this.__camera.transform.position = this.__curPos;
    }

    __updateRot(t: number) {
        var e: number = PlayerControl.Instance.curPos.x / PlayerControl.Instance.maxPosX;
        this.__curRot.z = Laya.MathUtil.lerp(this.__curRot.z, e * this.__maxRotZ, this.__rotateSpeed * t);
        this.__camera.transform.localRotationEuler = this.__curRot;
    }

    sceneChange(t: number) {
        var e: Laya.Vector3 = GameData.Instance.fogColor;
        this.__camera.clearColor = new Laya.Vector4(e.x, e.y, e.z, 1);
    }

    gameUpdate(t: number) {
        if (GameManager.Instance.gameState === GameState.PLAYING) {
            this.__updatePos(t);
            this.__updateRot(t);
        }
    }

    gameInit() {
        this.__camera = new Laya.Camera(0, .01, 200);
        this.__camera.fieldOfView = 51;
        this.__camera.transform.position = this.__curPos;
        this.__camera.transform.localRotationEuler = this.__curRot;
        SceneManager.Instance.addToScene(this.__camera);
        var t: Laya.Vector3 = GameData.Instance.fogColor;
        this.__camera.clearColor = new Laya.Vector4(t.x, t.y, t.z, 1);
    }

    gameReset() {
        this.__curRot.z = 0;
        this.__camera.transform.localRotationEuler = this.__curRot;
        this.__initPos.cloneTo(this.__curPos);
        this.__camera.transform.position = this.__curPos;
    }
}