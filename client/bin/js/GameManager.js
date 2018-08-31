/*
* name;
*/
var GameManager = /** @class */ (function () {
    // __soundManager: any;
    // __uiManager: any;
    function GameManager() {
        this.gameInit = function () {
            // debugger
            this.__gameData.gameInit();
            // this.__soundManager.gameInit();
            this.__sceneManager.gameInit();
            // this.__uiManager.gameInit();
            this.__pathManager.gameInit();
            this.__cameraFollow.gameInit();
            this.__playerControl.gameInit();
            Laya.timer.frameLoop(1, this, this.gameUpdate);
            Laya.stage.addChild(new indexFrame);
            console.log("gameinit");
        };
        this.gameUpdate = function () {
            // TWEEN.update(Laya.timer.currTimer);
            var t = Laya.timer.delta / 1e3;
            if (t > .1) {
                t = .1;
            }
            this.__pathManager.gameUpdate(t);
            this.__playerControl.gameUpdate(t);
            this.__cameraFollow.gameUpdate(t);
        };
        this.gameScoreChange = function (t) {
            this.__gameScore += t,
                this.__gameData.score = this.__gameScore;
            //  UIManager.Instance.showScoreChange(this.__gameScore),
            this.__levelChange();
        };
        this.__levelChange = function () {
            for (var t = 0, e = 0; e < GameSetting.levelDis.length; e++) {
                if (this.__gameData.score > GameSetting.levelDis[e])
                    t++;
            }
            if (t - this.__gameData.level > 0) {
                this.__gameData.level = t;
                this.__pathManager.levelChange();
                this.__playerControl.levelChange();
            }
        };
        this.gameIdle = function () {
            this.__gameState = GameState.IDLE;
        };
        this.gameStart = function () {
            this.__gameState = GameState.START, console.log("gamestart");
        };
        this.gameEnd = function () {
            this.__gameState = GameState.END,
                // this.__uiManager.showGameEnd();
                Laya.Tween.clearAll(this);
            //  TWEEN.removeAll()
        };
        this.showGroupRank = function () {
            this.__gameState = GameState.END;
        };
        this.gamePlayGame = function () {
            this.__gameState = GameState.PLAYING;
            // this.__uiManager.hideTips(), 
            console.log("gameplaygame");
        };
        this.gameReset = function () {
            this.__reset();
            this.__gameData.gameReset();
            this.__playerControl.gameReset();
            this.__pathManager.gameReset();
            this.__cameraFollow.gameReset();
            this.__gameState = GameState.START;
        };
        this.__reset = function () {
            this.__gameScore = this.__gameData.score = 0;
            this.__gameData.level = 0;
            //  UIManager.Instance.showScoreChange(this.__gameScore)
        };
        this.gameReborn = function () {
            this.__playerControl.gameRevive(), this.gamePlayGame();
        };
        this.preload = function () {
            this.__resourceManager.preload();
        };
        this.changePixelRatio = function (t) {
            this.pixelRatio = t;
            // UIManager.Instance.resetScale()
        };
        GameManager.Instance = this;
        this.__gameScore = 0;
        this.__pixelRatio = 1;
        Laya.MiniAdpter.init();
        Laya3D.init(0, 0, true);
        // debugger
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        CurvedMaterial.initShader();
        CurvedGlitterMaterial.initShader();
        Laya.ShaderCompile3D.debugMode = true;
        Laya.RunDriver.getPixelRatio = function () {
            return this.pixelRatio;
        }.bind(this);
        this.__gameData = new GameData;
        this.__resourceManager = new ResourceManager;
        // this.__soundManager = new SoundManager;
        this.__sceneManager = new SceneManager;
        // this.__uiManager = new UIManager;
        this.__cameraFollow = new CameraFollow;
        this.__playerControl = new PlayerControl;
        this.__pathManager = new PathManager;
        this.__gameState = GameState.IDLE;
        this.__pixelRatio = 2;
        if (Laya.Browser.onMiniGame) {
            // wx.getSystemInfoSync().benchmarkLevel < 1 ? this.__pixelRatio = 1 : this.__pixelRatio = 2
        }
        this.changePixelRatio(this.__pixelRatio);
    }
    Object.defineProperty(GameManager.prototype, "gameState", {
        get: function () {
            return this.__gameState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "pixelRatio", {
        get: function () {
            return this.__pixelRatio;
        },
        set: function (t) {
            t = Math.max(Math.min(t, window.devicePixelRatio), .5);
            this.__pixelRatio = t;
            Laya.stage.event(Laya.Event.RESIZE);
        },
        enumerable: true,
        configurable: true
    });
    return GameManager;
}());
//# sourceMappingURL=GameManager.js.map