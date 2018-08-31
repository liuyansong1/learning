/*
* name;
*/
var SpeedUpPtManager = /** @class */ (function () {
    function SpeedUpPtManager() {
        SpeedUpPtManager.Instance = this;
        this.__ptPool = [];
        this.__ptPos = [];
        this.__ptPoolCount = 50;
        this.__spanIndex = 0;
        this.__moveSpeed = 50;
        this.__width = .05;
        this.__spanTime = 500;
    }
    SpeedUpPtManager.prototype.gameUpdate = function (t) {
        for (var e = PlayerControl.Instance.curPos.z, i = 0; i < this.__ptPoolCount; i++) {
            if (this.__ptPool[i].active) {
                var n = this.__ptPos[i];
                n.z += this.__moveSpeed * t;
                // debugger
                this.__ptPool[i].addGlitterByPositions(new Laya.Vector3(n.x - 0.5 * this.__width, n.y, n.z), new Laya.Vector3(n.x + 0.5 * this.__width, n.y, n.z));
                if (e - n.z < -50) {
                    this.__ptPool[i].active = false;
                }
            }
        }
    };
    SpeedUpPtManager.prototype.gameInit = function () {
        var t = GameData.Instance.qOffset;
        var e = GameData.Instance.dist;
        new Laya.PlaneMesh(1, 1, 10, 10);
        this.__ptMat = new CurvedGlitterMaterial;
        this.__ptMat.renderMode = CurvedGlitterMaterial.RENDEMODE_TRANSPARENT;
        this.__ptMat.qOffset = t;
        this.__ptMat.dist = e;
        this.__ptMat.mainColor = new Laya.Vector4(1, 1, 1, 0.5);
        for (var i = 0; i < this.__ptPoolCount; i++) {
            this.__ptPos.push(new Laya.Vector3);
            var n = new Laya.Glitter;
            n.glitterRender.material = this.__ptMat;
            var r = n.templet;
            r.lifeTime = 1;
            r.minSegmentDistance = 0.3;
            r.minInterpDistance = 0.6;
            r.maxSlerpCount = 128;
            r.maxSegments = 600;
            n.active = false;
            SceneManager.Instance.addToScene(n);
            this.__ptPool.push(n);
        }
        Laya.timer.loop(this.__spanTime, this, this.spanPts);
    };
    SpeedUpPtManager.prototype.qOffsetChange = function () {
        var t = GameData.Instance.qOffset;
        var e = GameData.Instance.dist;
        this.__ptMat.qOffset = t;
        this.__ptMat.dist = e;
    };
    SpeedUpPtManager.prototype.spanPts = function (t) {
        if (GameManager.Instance.gameState === GameState.PLAYING) {
            // debugger
            if (t == undefined) {
                t = Math.floor(5 * Math.random()) + 5;
            }
            ;
            for (var e = 0; e < t; e++) {
                var i = 5 * Math.random() - 2.5;
                var n = 1 * Math.random() + 1.5;
                var r = PlayerControl.Instance.curPos.z - 5 * Math.floor(5 * Math.random()) - 40;
                this.__ptPos[e].fromArray([i, n, r]);
                this.__ptPool[e].active = true;
                this.__spanIndex = (this.__spanIndex >= this.__ptPoolCount - 1) ? 0 : this.__spanIndex + 1;
            }
        }
    };
    return SpeedUpPtManager;
}());
//# sourceMappingURL=SpeedUpPtManager.js.map