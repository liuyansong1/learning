/*
* name;
*/
var ResourceManager = /** @class */ (function () {
    function ResourceManager() {
        this.preload = function () {
            for (t = 0; t < this.__assetArr.length; t++) {
                e = this.__assetArr[t];
                this.itemstotal++;
                Laya.loader.load(e.url, Laya.Handler.create(this, this.__onComplete), null, e.type ? e.type : null);
            }
            for (var t = 0; t < this.__assetArr3D.length; t++) {
                var e = this.__assetArr3D[t];
                this.itemstotal++;
                Laya.loader.create(e.url, Laya.Handler.create(this, this.__onComplete), null, e.clas ? e.clas : null, e.params ? e.params : null);
            }
        };
        this.__onComplete = function () {
            this.itemsloaded++;
            this.__onProgress(this.itemsloaded / this.itemstotal);
            if (this.itemsloaded === this.itemstotal) {
                console.log("all resource load ok!!!");
                GameManager.Instance.gameInit.bind(GameManager.Instance)();
            }
            // this.itemsloaded === this.itemstotal && (console.log("all resource load ok!!!"))
            /*
                MD_GameLogin.init({
                    root: GameSetting.root,
                    gameName: GameSetting.gameName,
                    loginOverCallBack: GameManager.Instance.gameInit.bind(GameManager.Instance)
                }))
                */
        };
        this.__onProgress = function (t) {
            console.log("resource load " + 100 * t + "%");
            // UIManager.Instance.loadingValChange(Math.floor(100 * t))
        };
        ResourceManager.Instance = this;
        this.itemsloaded = 0;
        this.itemstotal = 0;
        this.__assetArr = [{
                url: "res/atlas/end.atlas",
                type: Laya.Loader.ATLAS
            }, {
                url: "res/atlas/game.atlas",
                type: Laya.Loader.ATLAS
            }, {
                url: "res/atlas/plugins.atlas",
                type: Laya.Loader.ATLAS
            }, {
                url: "res/atlas/rank.atlas",
                type: Laya.Loader.ATLAS
            }, {
                url: "end/Endpagescore.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "end/Newrecord.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "game/Friendsrankings.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "game/Individualrankings.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "game/Title.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "game/t_bg.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "plugins/beyond.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "plugins/getmorerevivelife.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "plugins/trytorevive.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "rank/rank_list.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "rank/rank_score.png",
                type: Laya.Loader.IMAGE
            }, {
                url: "rank/defaultimg.png",
                type: Laya.Loader.IMAGE
            },
            /*
            {
                url: "res/sound/bgm.mp3",
                type: Laya.Loader.SOUND
            }, {
                url: "res/sound/start.mp3",
                type: Laya.Loader.SOUND
            }, {
                url: "res/sound/lose.mp3",
                type: Laya.Loader.SOUND
            }
            */
            {
                url: "indexFrame/res_01.png",
                type: Laya.Loader.IMAGE
            }
        ];
        this.__assetArr3D = [{
                url: "res/textures/shadowc.png",
                clas: Laya.Texture2D,
                params: [false, false, Laya.WebGLContext.RGBA, false]
            }, {
                url: "res/textures/jump.png",
                clas: Laya.Texture2D,
                params: [false, false, Laya.WebGLContext.RGBA, false]
            }, {
                url: "res/textures/speedup.png",
                clas: Laya.Texture2D,
                params: [false, false, Laya.WebGLContext.RGBA, false]
            }, {
                url: "res/textures/box.png",
                clas: Laya.Texture2D,
                params: [false, false, Laya.WebGLContext.RGBA, false]
            }, {
                url: "res/textures/player.png",
                clas: Laya.Texture2D,
                params: [false, false, Laya.WebGLContext.RGBA, false]
            }, {
                url: "res/mesh/ball.lm",
                clas: Laya.Mesh
            }, {
                url: "res/mesh/speedUp.lm",
                clas: Laya.Mesh
            }];
    }
    return ResourceManager;
}());
//# sourceMappingURL=ResourceManager.js.map