/*
* name;
*/
class GameManager {
    static Instance: GameManager;

    __cameraFollow: CameraFollow;
    __gameData: GameData;
    __gameScore: number;
    __gameState: number;
    __pathManager: PathManager;
    __pixelRatio: number;
    __playerControl: PlayerControl;
    __resourceManager: ResourceManager;
    __sceneManager: SceneManager;
    // __soundManager: any;
    // __uiManager: any;

    constructor() {
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
            return this.pixelRatio
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

    get gameState(): number {
        return this.__gameState;
    }

    get pixelRatio(): number {
        return this.__pixelRatio;
    }

    set pixelRatio(t: number) {
        t = Math.max(Math.min(t, window.devicePixelRatio), .5);
        this.__pixelRatio = t;
        Laya.stage.event(Laya.Event.RESIZE);
    }


    gameInit = function () {
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
    }

    gameUpdate = function () {
        // TWEEN.update(Laya.timer.currTimer);
        var t: number = Laya.timer.delta / 1e3;
        if (t > .1) { t = .1; }
        this.__pathManager.gameUpdate(t);
        this.__playerControl.gameUpdate(t);
        this.__cameraFollow.gameUpdate(t);
    }

    gameScoreChange = function (t: number) {
        this.__gameScore += t,
            this.__gameData.score = this.__gameScore;
        //  UIManager.Instance.showScoreChange(this.__gameScore),
        this.__levelChange();
    }

    __levelChange = function () {
        for (var t = 0, e = 0; e < GameSetting.levelDis.length; e++) {
            if (this.__gameData.score > GameSetting.levelDis[e])
                t++;
        }
        if (t - this.__gameData.level > 0) {
            this.__gameData.level = t;
            this.__pathManager.levelChange();
            this.__playerControl.levelChange();
        }
    }

    gameIdle = function () {
        this.__gameState = GameState.IDLE
    }
    gameStart = function () {
        this.__gameState = GameState.START, console.log("gamestart")
    }
    gameEnd = function () {
        this.__gameState = GameState.END,
            // this.__uiManager.showGameEnd();
            Laya.Tween.clearAll(this);
        //  TWEEN.removeAll()
    }
    showGroupRank = function () {
        this.__gameState = GameState.END
    }
    gamePlayGame = function () {
        this.__gameState = GameState.PLAYING;
        // this.__uiManager.hideTips(), 
        console.log("gameplaygame");
    }

    gameReset = function () {
        this.__reset();
        this.__gameData.gameReset();
        this.__playerControl.gameReset();
        this.__pathManager.gameReset();
        this.__cameraFollow.gameReset();
        this.__gameState = GameState.START;
    }

    __reset = function () {
        this.__gameScore = this.__gameData.score = 0;
        this.__gameData.level = 0;
        //  UIManager.Instance.showScoreChange(this.__gameScore)
    }
    gameReborn = function () {
        this.__playerControl.gameRevive(), this.gamePlayGame();
    }
    preload = function () {
        this.__resourceManager.preload();
    }
    changePixelRatio = function (t: number) {
        this.pixelRatio = t;
        // UIManager.Instance.resetScale()
    }
}