/*
* name;
*/
var SceneManager = /** @class */ (function () {
    function SceneManager() {
        SceneManager.Instance = this;
        this.__scene = new Laya.Scene();
    }
    SceneManager.prototype.gameInit = function () {
        this.__scene.ambientColor = new Laya.Vector3(.324, .324, .324);
        Laya.stage.addChild(this.__scene);
    };
    SceneManager.prototype.addToScene = function (t) {
        this.__scene.addChild(t);
    };
    return SceneManager;
}());
//# sourceMappingURL=SceneManager.js.map