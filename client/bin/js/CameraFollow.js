/*
* name;
*/
var CameraFollow = /** @class */ (function () {
    function CameraFollow() {
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
    CameraFollow.prototype.__updatePos = function (t) {
        var e = PlayerControl.Instance.moveSpeed;
        var i = PlayerControl.Instance.maxSpeed;
        var n = PlayerControl.Instance.minSpeed;
        this.__curPos.y = this.__maxPosY - (e - n) / (i - n) * (this.__maxPosY - this.__minPosY);
        this.__curPos.z = PlayerControl.Instance.curPos.z + this.__offsetZ;
        this.__camera.transform.position = this.__curPos;
    };
    CameraFollow.prototype.__updateRot = function (t) {
        var e = PlayerControl.Instance.curPos.x / PlayerControl.Instance.maxPosX;
        this.__curRot.z = Laya.MathUtil.lerp(this.__curRot.z, e * this.__maxRotZ, this.__rotateSpeed * t);
        this.__camera.transform.localRotationEuler = this.__curRot;
    };
    CameraFollow.prototype.sceneChange = function (t) {
        var e = GameData.Instance.fogColor;
        this.__camera.clearColor = new Laya.Vector4(e.x, e.y, e.z, 1);
    };
    CameraFollow.prototype.gameUpdate = function (t) {
        if (GameManager.Instance.gameState === GameState.PLAYING) {
            this.__updatePos(t);
            this.__updateRot(t);
        }
    };
    CameraFollow.prototype.gameInit = function () {
        this.__camera = new Laya.Camera(0, .01, 200);
        this.__camera.fieldOfView = 51;
        this.__camera.transform.position = this.__curPos;
        this.__camera.transform.localRotationEuler = this.__curRot;
        SceneManager.Instance.addToScene(this.__camera);
        var t = GameData.Instance.fogColor;
        this.__camera.clearColor = new Laya.Vector4(t.x, t.y, t.z, 1);
    };
    CameraFollow.prototype.gameReset = function () {
        this.__curRot.z = 0;
        this.__camera.transform.localRotationEuler = this.__curRot;
        this.__initPos.cloneTo(this.__curPos);
        this.__camera.transform.position = this.__curPos;
    };
    return CameraFollow;
}());
//# sourceMappingURL=CameraFollow.js.map