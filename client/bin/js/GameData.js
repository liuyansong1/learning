/*
* name;
*/
var GameData = /** @class */ (function () {
    function GameData() {
        GameData.Instance = this;
        this.coins = 0;
        this.score = 0;
        this.level = 0;
        this.bestScore = 0;
        this.qOffset = new Laya.Vector4(0, 0, 0, 0);
        this.dist = 100;
        this.__fogStart = 15;
        this.__fogRange = 35;
        this.__fogStartD = 5;
        this.__fogRandgeD = 10;
        this.__fogColor = new Laya.Vector3(1, 1, 1);
        this.__sceneIndex = 0;
        this.__sceneCount = 10;
        this.__fogColors = [
            new Laya.Vector3(.4941, .9216, 1),
            new Laya.Vector3(1, .7176, .651),
            new Laya.Vector3(1, .898, .4784),
            new Laya.Vector3(.902, 1, .6078),
            new Laya.Vector3(1, .7216, 1),
            new Laya.Vector3(.7647, .6549, 1),
            new Laya.Vector3(1, 1, .6039),
            new Laya.Vector3(1, .7686, .6196),
            new Laya.Vector3(.5373, .902, 1),
            new Laya.Vector3(.6706, 1, .7412)
        ];
        this.__nextSceneIndex = 1;
        this.__changeTime = 3e3;
        this.__delayTime = 1e4;
        if (Laya.Browser.onMiniGame) {
            /*
            var e = wx.getStorageSync("bestScore");
            e || (e = 0);
            this.bestScore = parseInt(e)
            */
        }
    }
    Object.defineProperty(GameData.prototype, "fogStart", {
        get: function () { return this.__fogStart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "fogRange", {
        get: function () { return this.__fogRange; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "fogStartD", {
        get: function () { return this.__fogStartD; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "fogRangeD", {
        get: function () { return this.__fogRandgeD; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "fogColor", {
        get: function () { return this.__fogColor; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "sceneIndex", {
        get: function () { return this.__sceneIndex; },
        enumerable: true,
        configurable: true
    });
    GameData.prototype.calcBest = function () {
        var t = this.bestScore;
        return this.bestScore = t < this.score ? this.score : t, t < this.score;
    };
    GameData.prototype.initAllGameData = function () {
        this.bestScore = 0; //MD_UserData.getUserData().betterScore;
        // UIManager.Instance.initData()
    };
    GameData.prototype.gameInit = function () {
        this.__sceneIndex = Math.floor(Math.random() * this.__sceneCount);
        this.__fogColors[this.__sceneIndex].cloneTo(this.fogColor);
        Laya.timer.loop(this.__delayTime, this, this.__setScene);
    };
    GameData.prototype.gameReset = function () {
        this.qOffset.x = this.qOffset.y = 0;
    };
    GameData.prototype.__setScene = function () {
        if (GameManager.Instance.gameState === GameState.PLAYING) {
            this.__nextSceneIndex = Math.floor(Math.random() * this.__sceneCount);
            if (this.__nextSceneIndex === this.__sceneIndex) {
                this.__nextSceneIndex > 0 ? this.__nextSceneIndex = this.__nextSceneIndex - 1 : this.__nextSceneIndex = this.__nextSceneIndex + 1;
            }
            this.__sceneIndex = this.__nextSceneIndex;
            var t = this;
            var p = { p: 0 };
            Laya.Tween.to(p, {
                p: 1,
                update: Laya.Handler.create(t, function () {
                    t.__sceneChange(p["p"]);
                    PathManager.Instance.sceneChange(p["p"]);
                    CameraFollow.Instance.sceneChange(p["p"]);
                }, undefined, false)
            }, this.__changeTime);
            // .start(Laya.timer.currTimer)
        }
    };
    GameData.prototype.__sceneChange = function (t) {
        Laya.Vector3.lerp(this.fogColor, this.__fogColors[this.__sceneIndex], t, this.fogColor);
    };
    return GameData;
}());
//# sourceMappingURL=GameData.js.map