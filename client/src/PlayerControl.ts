/*
* name;
*/
class PlayerControl {
    public static Instance: PlayerControl;

    __addSpeedUpOnce: number;
    __addSpeedUpTime: number;
    __body: Laya.MeshSprite3D;
    __bodyMat: CurvedMaterial;
    __bodyMoveSpeedY: number;
    __bodyPosY: number;
    __curBodyPosY: number;
    __curPos: Laya.Vector3;
    __flyTime: number;
    __initPos: Laya.Vector3;
    __initSpeedAcci: number;
    __isFlying: boolean;
    __isPressing: boolean;
    __isSpeedDowning: boolean;
    __isSpeedUping: boolean;
    __loseState: number;
    __maxHeight: number;
    __maxMoveSpeed: number;
    __maxPosX: number;
    __middleHeight: number;
    __minMoveSpeed: number;
    __moveDis: number;
    __moveSpeed: number;
    __playerNode: Laya.Sprite3D;
    __rotateSpeed: number;
    __screenX: number;
    __shadow: Laya.MeshSprite3D;
    __shadowMat: CurvedMaterial;
    __speedAcci: number;
    __speedDownTime: number;
    __speedDownTimer: number;
    __targetPosX: number;
    __trail: Laya.Glitter;
    __trailMat: CurvedGlitterMaterial;
    __trailOffsetZ: number;
    __trailPos1: Laya.Vector3;
    __trailPos2: Laya.Vector3;
    __trailWidth: number;
    __xChangeSpeed: number;
    y: number;

    constructor() {
        this.__loseState = LoseState.NOLOSE;
        this.__maxPosX = 2.2;
        this.__initPos = new Laya.Vector3(0, 0, 0);
        this.__curPos = new Laya.Vector3(0, 0, 0);
        this.__bodyPosY = .32;
        this.__curBodyPosY = .32;
        this.__bodyMoveSpeedY = 0;
        this.__trailWidth = .4;
        this.__trailOffsetZ = -1;
        this.__trailPos1 = new Laya.Vector3(-.5, .06, 0);
        this.__trailPos2 = new Laya.Vector3(.5, .06, 0);
        this.__isPressing = false;
        this.__moveSpeed = 15;
        this.__targetPosX = 0;
        this.__maxMoveSpeed = 30;
        this.__minMoveSpeed = 15;
        this.__xChangeSpeed = 8;
        this.__speedAcci = 0;
        this.__initSpeedAcci = 7.5;
        this.__screenX = -1e3;
        this.__isFlying = false;
        this.__flyTime = 200;
        this.__maxHeight = 1.6;
        this.__middleHeight = .6;
        this.__speedDownTimer = 0;
        this.__speedDownTime = 2;
        this.__isSpeedUping = false;
        this.__isSpeedDowning = false;
        this.__addSpeedUpOnce = 20;
        this.__addSpeedUpTime = .25;
        this.__moveDis = 0;
        this.__rotateSpeed = 100;
        PlayerControl.Instance = this;
    }

    get loseState(): number {
        return this.__loseState;
    }

    get maxPosX(): number {
        return this.__maxPosX;
    }

    get curPos(): Laya.Vector3 {
        return this.__curPos;
    }

    get moveSpeed(): number {
        return this.__moveSpeed;
    }

    get maxSpeed(): number {
        return this.__maxMoveSpeed;
    }

    get minSpeed(): number {
        return this.__minMoveSpeed;
    }

    gameUpdate(t: number) {
        switch (GameManager.Instance.gameState) {
            case GameState.IDLE:
            case GameState.START:
                break;
            case GameState.PLAYING:
                this.__move(t);
                break;
            case GameState.END:
        }
    }

    gameInit() {
        this.__createPlayer();
        this.__addControl();
        this.__moveSpeed = this.__minMoveSpeed = GameSetting.minPlayerSpeed;
        this.__maxMoveSpeed = GameSetting.maxPlayerSpeed;
        this.__initSpeedAcci = GameSetting.accelPlayerSpeedUp;
    }

    gameReset() {
        this.__isSpeedDowning = false;
        this.__isSpeedUping = false;
        this.__speedDownTimer = 0;
        this.__loseState = LoseState.NOLOSE;
        this.__isPressing = false;
        this.__targetPosX = 0;
        this.__moveSpeed = this.__minMoveSpeed = GameSetting.minPlayerSpeed;
        this.__speedAcci = 0;
        this.__moveDis = 0;
        this.__isFlying = false;
        this.__body.transform.localPosition = new Laya.Vector3(0, this.__bodyPosY, 0);
        this.__body.getComponentByType(Laya.SphereCollider).enable = true;
        this.__body.active = true;
        this.__trail.active = true;
        this.__shadow.active = true;
        this.__initPos.cloneTo(this.__curPos);
        this.__playerNode.transform.position = this.__curPos;
    }

    __createPlayer() {
        this.__playerNode = new Laya.Sprite3D;
        SceneManager.Instance.addToScene(this.__playerNode);
        var t: Laya.Mesh = Laya.Mesh.load("res/mesh/ball.lm");
        var e: Laya.PlaneMesh = new Laya.PlaneMesh(1, 1, 1, 1);
        var i: number = GameData.Instance.dist;
        var n: Laya.Vector4 = GameData.Instance.qOffset;
        this.__bodyMat = new CurvedMaterial;
        this.__bodyMat.dist = i;
        this.__bodyMat.qOffset = n;
        this.__bodyMat.mainColor = new Laya.Vector4(1, 1, 1, 1);
        this.__bodyMat.mainTexture = Laya.Texture2D.load("res/textures/player.png");
        this.__body = new Laya.MeshSprite3D(t);
        this.__body.meshRender.sharedMaterial = this.__bodyMat;
        this.__body.transform.localScale = new Laya.Vector3(.6, .6, .6);
        this.__body.transform.localRotationEuler = new Laya.Vector3(0, 0, 90);
        this.__body.transform.localPosition = new Laya.Vector3(0, this.__bodyPosY, 0);
        this.__playerNode.addChild(this.__body);
        this.__shadowMat = new CurvedMaterial;
        this.__shadowMat.renderMode = CurvedMaterial.RENDEMODE_TRANSPARENT;
        this.__shadowMat.mainColor = new Laya.Vector4(1, 1, 1, .5);
        this.__shadowMat.mainTexture = Laya.Texture2D.load("res/textures/shadowc.png");
        this.__shadowMat.qOffset = n;
        this.__shadowMat.dist = i;
        this.__shadow = new Laya.MeshSprite3D(e);
        this.__shadow.meshRender.sharedMaterial = this.__shadowMat;
        this.__shadow.transform.localScale = new Laya.Vector3(.6, .6, .6);
        this.__shadow.transform.localPosition = new Laya.Vector3(0, .05, 0);
        this.__playerNode.addChild(this.__shadow);
        this.__trailMat = new CurvedGlitterMaterial;
        this.__trailMat.renderMode = CurvedGlitterMaterial.RENDEMODE_TRANSPARENT;
        this.__trailMat.mainColor = new Laya.Vector4(1, 1, 1, .8);
        this.__trailMat.qOffset = n;
        this.__trailMat.dist = i;
        this.__trail = new Laya.Glitter;
        this.__trail.transform.localPosition = new Laya.Vector3(0, .01, 0);
        this.__trail.glitterRender.sharedMaterial = this.__trailMat;
        var r = this.__trail.templet;
        r.lifeTime = 1, r.minSegmentDistance = .1;
        r.minInterpDistance = .6;
        r.maxSlerpCount = 128;
        r.maxSegments = 600;
        SceneManager.Instance.addToScene(this.__trail);
        this.__body.addComponent(Laya.SphereCollider)["radius"] = .5;
        this.__body.addComponent(Laya.Rigidbody);
        this.__body.addComponent(PlayerCollisionCheck);
        this.__body.layer = Laya.Layer.getLayerByNumber(0);//玩家小球的物理层是0
        this.__playerNode.transform.position = this.__curPos;
    }



    __addControl() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.__onTouchStart);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.__onTouchMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.__onTouchEnd);
    }

    __onTouchStart(t: Laya.Event) {
        switch (GameManager.Instance.gameState) {
            case GameState.IDLE:
            case GameState.END:
                return;
            case GameState.START:
                GameManager.Instance.gamePlayGame();
                break;
            case GameState.PLAYING:
        }
        this.__isPressing = true;
        t.touches ? this.__screenX = t.touches[0].stageX : this.__screenX = t.stageX
    }


    __onTouchMove(t: Laya.Event) {
        if (this.__isPressing)
            if (t.touches) {
                var e: number = t.touches[0].stageX - this.__screenX;
                this.__setTargetPosX(e);
                this.__screenX = t.touches[0].stageX;
            } else {
                var e: number = t.stageX - this.__screenX;
                this.__setTargetPosX(e);
                this.__screenX = t.stageX;
            }
    }

    __onTouchEnd(t: Laya.Event) {
        if (this.__isPressing) {
            t.touches ? 0 === t.touches.length && (this.__isPressing = false) : this.__isPressing = false
        }
    }

    __setTargetPosX(t: number) {
        var e: number = t / Laya.Browser.width * (3 * this.__maxPosX);
        this.__targetPosX += e;
        if (this.__targetPosX > this.maxPosX)
            this.__targetPosX = this.maxPosX;
        else if (this.__targetPosX < -this.__maxPosX) {
            this.__targetPosX = -this.__maxPosX;
        }
    }

    __move(t: number) {
        this.__updateTrail();
        this.__changeMoveSpeed(t);
        this.__curPos.x = Laya.MathUtil.lerp(this.__curPos.x, this.__targetPosX, this.__xChangeSpeed * t);
        this.__curPos.z -= this.__moveSpeed * t;
        this.__playerNode.transform.position = this.__curPos;
        this.__stepsChange();
    }

    __updateTrail() {
        this.__trailPos1.x = this.__curPos.x - .5 * this.__trailWidth;
        this.__trailPos2.x = this.__curPos.x + .5 * this.__trailWidth;
        this.__trailPos1.z = this.__trailPos2.z = this.__curPos.z + this.__trailOffsetZ;
        this.__trail.addGlitterByPositions(this.__trailPos2, this.__trailPos1);
    }

    fly() {
        //debugger
        if (this.__loseState === LoseState.NOLOSE && !this.__isFlying) {
            this.__isFlying = true;
            var t: this = this;
            this.__trail.active = false;
            this.__shadow.active = false;
            var e: number = this.__maxHeight / this.__moveSpeed * 1e3;
            var that: this = this;


            /*
                        i = new TWEEN.Tween().to({
                            y: this.__bodyPosY
                        }, e).onUpdate(function () {
                            t.__body.transform.localPosition = new Laya.Vector3(0, this.y, 0)
                        }).onComplete(function () {
                            t.__loseState === LoseState.NOLOSE &&
                                (t.__trail.active = true,
                                    t.__shadow.active = true,
                                    n.start(Laya.timer.currTimer),
                                    Laya.Browser.onMiniGame && wx.vibrateShort({}))
                        }),
                        */



            /*
                        n = new TWEEN.Tween({
                            y: this.__bodyPosY
                        }).to({
                            y: this.__middleHeight
                        }
                                    this.__flyTime / 2).onUpdate(function () {
                                t.__body.transform.localPosition = new Laya.Vector3(0, this.y, 0)
                            }).onComplete(function () {
                                t.__loseState === LoseState.NOLOSE && r.start(Laya.timer.currTimer)
                            });
            */



            /*
                        r = new TWEEN.Tween({
                            y: this.__middleHeight
                        }).to({
                            y: this.__bodyPosY
                        }
                                    this.__flyTime / 2).onUpdate(function () {
                                t.__body.transform.localPosition = new Laya.Vector3(0, this.y, 0)
                            }).onComplete(function () {
                                t.__loseState === LoseState.NOLOSE &&
                                    (Laya.Browser.onMiniGame && wx.vibrateShort({}), t.__isFlying = false)
                            });
                  
                            */
            var oriY: number = that.__bodyPosY;
            //debugger
            var tmp3: Object = {
                y: oriY
            };

            Laya.Tween.to(tmp3, {
                y: that.__maxHeight,
                update: Laya.Handler.create(that, function () {
                    t.__body.transform.localPosition = new Laya.Vector3(0, tmp3["y"], 0)
                }, undefined, false)
            }, e, Laya.Ease['elasticOut'], Laya.Handler.create(that, function () {//结束回调，把i带起来
                if (t.__loseState === LoseState.NOLOSE) {
                    //debugger
                    //i
                    var tmp0: Object = {
                        y: that.__maxHeight
                    };

                    Laya.Tween.to(tmp0, {
                        y: oriY,
                        update: Laya.Handler.create(that, function () {
                            t.__body.transform.localPosition = new Laya.Vector3(0, tmp0["y"], 0)
                        }, undefined, false)
                    }, e, Laya.Ease['linearNone'], Laya.Handler.create(that, function () {
                        //debugger
                        if (t.__loseState === LoseState.NOLOSE) {
                            t.__trail.active = true;
                            t.__shadow.active = true;
                            //把n带起来
                            var tmp1: Object = {
                                y: oriY
                            };

                            Laya.Tween.to(tmp1, {
                                y: that.__middleHeight,
                                update: Laya.Handler.create(that, function () {
                                    t.__body.transform.localPosition = new Laya.Vector3(0, tmp1["y"], 0)
                                }, undefined, false)
                            }, that.__flyTime / 2, Laya.Ease['elasticOut'], Laya.Handler.create(that, function () {
                                //debugger
                                if (t.__loseState === LoseState.NOLOSE) {//开始下一段补间
                                    //把r带起来
                                    var tmp2: Object = {
                                        y: this.__middleHeight
                                    }
                                    Laya.Tween.to(tmp2, {
                                        y: oriY,
                                        update: Laya.Handler.create(that, function () {
                                            t.__body.transform.localPosition = new Laya.Vector3(0, tmp2["y"], 0)
                                        }, undefined, false)
                                    }, that.__flyTime / 2, Laya.Ease['linearNone'], Laya.Handler.create(that, function () {
                                        //debugger
                                        t.__loseState === LoseState.NOLOSE &&
                                            (
                                                // t.__body.transform.localPosition = new Laya.Vector3(0, oriY, 0),
                                                // Laya.Browser.onMiniGame 
                                                //  wx.vibrateShort({})
                                                t.__isFlying = false)
                                    }));
                                }
                            }));
                        }
                    }));
                }

            }));

            /*
            new TWEEN.Tween({
                y: this.__bodyPosY
            }).to({
                y: this.__maxHeight
            }, e).onUpdate(function () {
                t.__body.transform.localPosition = new Laya.Vector3(0, this.y, 0)
            }).onComplete(function () {
                t.__loseState === LoseState.NOLOSE && i.start(Laya.timer.currTimer)
            }).start(Laya.timer.currTimer)
            */
        }
    }
    //luo luo luo 


    speedUp() {
        this.__speedAcci = this.__addSpeedUpOnce / this.__addSpeedUpTime;
        this.__isSpeedDowning = false;
        this.__isSpeedUping = true;
        this.__speedDownTimer = 0;
        SpeedUpPtManager.Instance.spanPts(5);
    }


    __changeMoveSpeed(t: number) {
        if (this.__isSpeedUping) {
            this.__speedDownTimer += t;
            if (this.__speedDownTimer > this.__speedDownTime) {
                this.__isSpeedUping = false;
                this.__isSpeedDowning = true;
                this.__speedDownTimer = 0;
            }
            else if (this.__speedDownTimer < this.__addSpeedUpTime) {
                this.__moveSpeed += this.__speedAcci * t;
                if (this.__moveSpeed > this.__maxMoveSpeed) {
                    this.__moveSpeed = this.__maxMoveSpeed;
                }
            }
        }


        if (this.__isSpeedDowning) {
            this.__moveSpeed -= this.__initSpeedAcci * t;
            if (this.__moveSpeed < this.__minMoveSpeed) {
                this.__moveSpeed = this.__minMoveSpeed;
                this.__isSpeedDowning = false;
            }
        }
    }

    __stepsChange() {
        var t: number = Math.floor(this.__curPos.z),
            e: number = this.__moveDis - t;
        this.__moveDis = t;
        if (0 !== e) {
            (this.__setMinMoveSpeed(t), GameManager.Instance.gameScoreChange(e));
        }
    }
    //luo luo


    __setMinMoveSpeed(t: number) {
        this.__minMoveSpeed = Math.floor(-t / GameSetting.addSpeedDis) * GameSetting.addPlayerSpeed + GameSetting.minPlayerSpeed;
        if (this.__minMoveSpeed > GameSetting.minMaxPlayerSpeed) {
            this.__minMoveSpeed = GameSetting.minMaxPlayerSpeed;
        }
    }

    __hitAnim() {
        // SoundManager.Instance.playSound(SoundName.LOSE);
        this.__body.getComponentByType(Laya.SphereCollider).enable = false;
        this.__body.active = false;
        this.__trail.active = false;
        this.__shadow.active = false;
    }

    gameRevive() {
        this.__isSpeedDowning = false;
        this.__isSpeedUping = false;
        this.__speedDownTimer = 0;
        this.__loseState = LoseState.NOLOSE;
        this.__isPressing = false;
        this.__targetPosX = 0;
        this.__moveSpeed = this.__minMoveSpeed;
        this.__speedAcci = 0;
        this.__isFlying = false;
        this.__body.transform.localPosition = new Laya.Vector3(0, this.__bodyPosY, 0);
        this.__curPos.x = 0;
        this.__curPos.y = 0;
        this.__playerNode.transform.position = this.__curPos;
        this.__body.getComponentByType(Laya.SphereCollider).enable = true;
        this.__body.active = true;
        this.__trail.active = true;
        this.__shadow.active = true;
        var t = this.__body.getComponentByType(Laya.Rigidbody);
        t.enable = false;
        this.__bodyMat.mainColor = new Laya.Vector4(1, 0, 0, 1);
        var e = this;
        setTimeout(function () { t.enable = true; e.__bodyMat.mainColor = new Laya.Vector4(1, 1, 1, 1) }, 500);
    }

    hitLose() {
        if (this.__loseState !== LoseState.HIT) {
            GameManager.Instance.gameEnd();
            this.__loseState = LoseState.HIT;
            Laya.timer.frameOnce(1, this, this.__hitAnim);
        }
    }

    qOffsetChange() {
        var t: Laya.Vector4 = GameData.Instance.qOffset;
        this.__bodyMat.qOffset = t;
        this.__shadowMat.qOffset = t;
        this.__trailMat.qOffset = t;
    }

    levelChange() {
        var t = GameData.Instance.level;
        if (t > 3) { t = 3; }
    }

    choosePlayer(t) { }


}