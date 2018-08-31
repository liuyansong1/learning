/*
* name;
*/
class PathManager {
   __boxCount: number;
    __boxIndex: number;
    __boxMat: CurvedMaterial;
    __boxObstacles: Array<Laya.MeshSprite3D>;
    __buildScaleXZ: number;
    __buildingColor: Laya.Vector4;
    __buildingColors: Array<Laya.Vector4>;
    __buildingCount: number;
    __buildingLSpanZ: number;
    __buildingMaterial: CurvedMaterial;
    __buildingRSpanZ: number;
    __buildingScaleYMax: number;
    __buildingScaleYMin: number;
    __buildingSpanX: number;
    __buildingSpanY: number;
    __buildingSpanZDis: number;
    __buildingsIndex: number;
    __buildingsPrefab: Array<Laya.MeshSprite3D>;
    __chainObstacleControlCount: number;
    __chainObstacleControlIndex: number;
    __chainObstacleControlPool: Array<ChainObstacleControl>;
    __createSimpleCounter: number;
    __createSimpleTypes: Array<Object>;
    __createSpanObstacleDis1: number;
    __createSpanObstacleDis2: number;
    __createSpeedUpConstantDis: number;
    __createSpeedUpDis: number;
    __fixedObstacleControlCount: number;
    __fixedObstacleControlIndex: number;
    __fixedObstacleControlPool: Array<FixedObstacleControl>;
    __initCreateObstacleDis: number;
    __jumpCount: number;
    __jumpIndex: number;
    __jumpMat: CurvedMaterial;
    __jumpObstacles: Array<Laya.Sprite3D>;
    __moveObstacleControlCount: number;
    __moveObstacleControlIndex: number;
    __moveObstacleControlPool: Array<MoveObstacleControl>;
    __obstaclesProbility: Array<number>;
    __qOffsetChangeTime: number;
    __qOffsetCountX: number;
    __qOffsetCountY: number;
    __qOffsetLoopTime: number;
    __qOffsetX: number;
    __qOffsetXIndex: number;
    __qOffsetXS: Array<number>;
    __qOffsetY: number;
    __qOffsetYIndex: number;
    __qOffsetYS: Array<number>;
    __roadAColor: Laya.Vector4;
    __roadAColors: Array<Laya.Vector4>;
    __roadAMaterial: CurvedMaterial;
    __roadBColor: Laya.Vector4;
    __roadBColors: Array<Laya.Vector4>;
    __roadBMaterial: CurvedMaterial;
    __roadCount: number;
    __roadSpanZ: number;
    __roadSpanZDis: number;
    __roadSteps: number;
    __roadsIndex: number;
    __roadsPrefab: Array<Laya.MeshSprite3D>;
    __spanZDis: number;
    __speedUpCount: number;
    __speedUpIndex: number;
    __speedUpMat: CurvedMaterial;
    __speedUpObstacles: Array<Laya.MeshSprite3D>;
    __speedupManager: SpeedUpPtManager;

    static Instance: PathManager;
    constructor() {
        PathManager.Instance = this;

        this.__qOffsetCountX = 5;
        this.__qOffsetX = 0;
        // this.__qOffsetXS = [0, 10, 20, -10, -20];
        this.__qOffsetXS = [0, 50, 140, -70, -150];
        this.__qOffsetCountY = 5;
        this.__qOffsetXIndex = 0;
        this.__qOffsetY = 0;
        // this.__qOffsetYS = [0, 10, 20, 30, 40];
        this.__qOffsetYS = [0, 100, -100, 300, -400];
        this.__qOffsetYIndex = 0;
        this.__qOffsetChangeTime = 3e3;
        this.__qOffsetLoopTime = 1e4;
        this.__spanZDis = 55;
        this.__buildScaleXZ = 5;
        this.__buildingScaleYMin = 5;
        this.__buildingScaleYMax = 15;
        this.__buildingSpanX = 7;
        this.__buildingSpanY = 4;
        this.__buildingSpanZDis = 10;
        this.__roadSpanZDis = 2;
        this.__roadSpanZ = 6;
        this.__buildingLSpanZ = 5;
        this.__buildingRSpanZ = 2;
        this.__roadSteps = 0;
        this.__roadsIndex = 0;
        this.__buildingsIndex = 0;
        this.__roadCount = 45;
        this.__buildingCount = 15;
        this.__roadsPrefab = [];
        this.__buildingsPrefab = [];
        this.__roadAColor = new Laya.Vector4;
        this.__roadAColors = [new Laya.Vector4(.3412, .4431, .7922, 1), new Laya.Vector4(.6431, .2745, .5608, 1), new Laya.Vector4(.8353, .4745, .1686, 1), new Laya.Vector4(.2353, .6824, .2902, 1), new Laya.Vector4(.5922, .3059, .8667, 1), new Laya.Vector4(.3961, .2157, .7373, 1), new Laya.Vector4(.4235, .6745, .4118, 1), new Laya.Vector4(.7059, .251, .2745, 1), new Laya.Vector4(.2667, .4157, .6549, 1), new Laya.Vector4(.1843, .5843, .5294, 1)];
        this.__roadBColor = new Laya.Vector4;
        this.__roadBColors = [new Laya.Vector4(.251, .1922, .6706, 1), new Laya.Vector4(.4157, .0431, .5098, 1), new Laya.Vector4(.7098, .2471, 0, 1), new Laya.Vector4(0, .4745, .1176, 1), new Laya.Vector4(.3647, .0784, .7569, 1), new Laya.Vector4(.1961, 0, .5569, 1), new Laya.Vector4(.0784, .4745, .3137, 1), new Laya.Vector4(.5137, 0, .0863, 1), new Laya.Vector4(.1294, .1608, .4314, 1), new Laya.Vector4(0, .3255, .4118, 1)];
        this.__buildingColor = new Laya.Vector4;
        this.__buildingColors = [new Laya.Vector4(.1137, .3176, .3765, 1), new Laya.Vector4(.3961, .2275, .1961, 1), new Laya.Vector4(.3922, .3098, .1098, 1), new Laya.Vector4(.3176, .3961, .1765, 1), new Laya.Vector4(.3765, .2275, .4039, 1), new Laya.Vector4(.2471, .1961, .3922, 1), new Laya.Vector4(.3961, .3882, .1647, 1), new Laya.Vector4(.3922, .251, .1765, 1), new Laya.Vector4(.1451, .3176, .3961, 1), new Laya.Vector4(.1961, .3922, .2314, 1)];
        this.__createSpeedUpConstantDis = 30;
        this.__createSpeedUpDis = 0;
        this.__createSpanObstacleDis1 = 10;
        this.__createSpanObstacleDis2 = 20;
        this.__initCreateObstacleDis = -40;
        this.__createSimpleCounter = -1;
        this.__createSimpleTypes = null;
        this.__boxCount = 50;
        this.__boxIndex = 0;
        this.__boxObstacles = [];
        this.__speedUpCount = 10;
        this.__speedUpIndex = 0;
        this.__speedUpObstacles = [];
        this.__jumpCount = 20;
        this.__jumpIndex = 0;
        this.__jumpObstacles = [];
        this.__fixedObstacleControlCount = 15;
        this.__fixedObstacleControlPool = [];
        this.__fixedObstacleControlIndex = 0;
        this.__moveObstacleControlCount = 15;
        this.__moveObstacleControlPool = [];
        this.__moveObstacleControlIndex = 0;
        this.__chainObstacleControlCount = 15;
        this.__chainObstacleControlPool = [];
        this.__chainObstacleControlIndex = 0;
        this.__obstaclesProbility = null;
        this.__speedupManager = new SpeedUpPtManager();
    }



    __createPrefabs() {
        var t: Laya.Sprite3D = new Laya.Sprite3D;
        SceneManager.Instance.addToScene(t);
        var e: number = GameData.Instance.dist;
        var i: Laya.Vector4 = GameData.Instance.qOffset;
        var n: number = GameData.Instance.sceneIndex;
        var r: number = GameData.Instance.fogStart;
        var a: number = GameData.Instance.fogStartD;
        var s: number = GameData.Instance.fogRange;
        var o: number = GameData.Instance.fogRangeD;
        var h: Laya.Vector3 = GameData.Instance.fogColor;
        this.__buildingColors[n].cloneTo(this.__buildingColor);
        this.__buildingMaterial = new CurvedMaterial;
        this.__buildingMaterial.qOffset = i;
        this.__buildingMaterial.dist = e;
        this.__buildingMaterial.mainColor = this.__buildingColor;
        this.__buildingMaterial.enableFog = true;
        this.__buildingMaterial.fogColor = h;
        this.__buildingMaterial.fogStart = r;
        this.__buildingMaterial.fogRange = s;
        this.__buildingMaterial.enabledDepthFog = true;
        this.__buildingMaterial.fogStartD = a;
        this.__buildingMaterial.fogRangeD = o;
        this.__roadAColors[n].cloneTo(this.__roadAColor);
        this.__roadAMaterial = new CurvedMaterial;
        this.__roadAMaterial.qOffset = i;
        this.__roadAMaterial.dist = e;
        this.__roadAMaterial.mainColor = this.__roadAColor;
        this.__roadAMaterial.enableFog = true;
        this.__roadAMaterial.fogColor = h;
        this.__roadAMaterial.fogStart = r;
        this.__roadAMaterial.fogRange = s;
        this.__roadBColors[n].cloneTo(this.__roadBColor);
        this.__roadBMaterial = new CurvedMaterial;
        this.__roadBMaterial.qOffset = i;
        this.__roadBMaterial.dist = e;
        this.__roadBMaterial.mainColor = this.__roadBColor;
        this.__roadBMaterial.enableFog = true;
        this.__roadBMaterial.fogColor = h;
        this.__roadBMaterial.fogStart = r;
        this.__roadBMaterial.fogRange = s;
        for (var l = new Laya.PlaneMesh(1, 1, 1, 1), _ = new Laya.BoxMesh(1, 1, 1), u = new Laya.Vector3(5, 1, this.__roadSpanZDis), c = 0; c < this.__roadCount; c++) {
            (x = new Laya.MeshSprite3D(l)).meshRender.sharedMaterial = c % 2 == 0 ? this.__roadAMaterial : this.__roadBMaterial;
            x.transform.localScale = u;
            x.active = false, t.addChild(x);
            this.__roadsPrefab.push(x);
        }
        for (c = 0; c < this.__buildingCount; c++) {
            (x = new Laya.MeshSprite3D(_)).meshRender.sharedMaterial = this.__buildingMaterial;
            x.active = false, t.addChild(x);
            this.__buildingsPrefab.push(x);
        }
        this.__boxMat = new CurvedMaterial;
        this.__boxMat.qOffset = i;
        this.__boxMat.dist = e;
        this.__boxMat.mainColor = this.__roadBColor;
        this.__boxMat.mainTexture = Laya.Texture2D.load("res/textures/box.png");
        this.__boxMat.enableFog = true;
        this.__boxMat.fogColor = h;
        this.__boxMat.fogStart = r;
        this.__boxMat.fogRange = s;
        for (c = 0; c < this.__boxCount; c++) {
            (x = new Laya.MeshSprite3D(_, "box")).meshRender.sharedMaterial = this.__boxMat;
            x.active = false;
            t.addChild(x);
            x.layer = Laya.Layer.getLayerByNumber(1);//盒子障碍物的物理层是1
            y = x.addComponent(Laya.BoxCollider);
            (y as Laya.BoxCollider).size = new Laya.Vector3(1, 1, 1);
            y.enable = false;
            this.__boxObstacles.push(x);
        }
        var d: Laya.Mesh = Laya.Mesh.load("res/mesh/speedUp.lm");
        this.__speedUpMat = new CurvedMaterial;
        this.__speedUpMat.renderMode = CurvedMaterial.RENDEMODE_TRANSPARENT;
        this.__speedUpMat.qOffset = i;
        this.__speedUpMat.dist = e;
        this.__speedUpMat.mainColor = new Laya.Vector4(1, 1, 0, 1);
        this.__speedUpMat.enableFog = true;
        this.__speedUpMat.fogColor = h;
        this.__speedUpMat.fogStart = r;
        this.__speedUpMat.fogRange = s;
        for (var f = new Laya.Vector3(1, 1.2, .3), p = new Laya.Vector3(-90, 0, 0), c = 0; c < this.__speedUpCount; c++) {
            (x = new Laya.MeshSprite3D(d, "speedUp")).meshRender.sharedMaterial = this.__speedUpMat;
            x.transform.localScale = f;
            x.transform.localRotationEuler = p;
            x.active = false;
            t.addChild(x);
            x.layer = Laya.Layer.getLayerByNumber(1);//加速器的物理层是1
            ((y = x.addComponent(Laya.BoxCollider)) as Laya.BoxCollider).size = new Laya.Vector3(1, 1, 1.5);
            y.enable = false;
            this.__speedUpObstacles.push(x);
        }
        this.__jumpMat = new CurvedMaterial;
        this.__jumpMat.qOffset = i;
        this.__jumpMat.dist = e;
        this.__jumpMat.mainColor = this.__roadBColor;
        this.__jumpMat.mainTexture = Laya.Texture2D.load("res/textures/jump.png");
        this.__jumpMat.enableFog = true;
        this.__jumpMat.fogColor = h;
        this.__jumpMat.fogStart = r;
        this.__jumpMat.fogRange = s;
        for (var m: Laya.Vector3 = new Laya.Vector3(1, 1, Math.SQRT2), g: Laya.Vector3 = new Laya.Vector3(45, 0, 0), c = 0; c < this.__jumpCount; c++) {
            var v: Laya.Sprite3D = new Laya.Sprite3D("jump");
            var x: Laya.MeshSprite3D = new Laya.MeshSprite3D(l);
            v.addChild(x);
            x.meshRender.sharedMaterial = this.__jumpMat;
            x.transform.localScale = m; x.transform.localRotationEuler = g;
            v.active = false; t.addChild(v); v.layer = Laya.Layer.getLayerByNumber(2);//jump台的物理层是1
            var y = v.addComponent(Laya.BoxCollider);
            (y as Laya.BoxCollider).size = new Laya.Vector3(1, 1, 1);
            y.enable = false;
            this.__jumpObstacles.push(v);
        }
        var E: Laya.Layer = Laya.Layer.getLayerByNumber(1);//jump,障碍物，加速器
        var T: Laya.Layer = Laya.Layer.getLayerByNumber(0);//小球
        var M: Laya.Layer = Laya.Layer.getLayerByNumber(2);
        Laya.Physics.setLayerCollision(T, T, false);
        Laya.Physics.setLayerCollision(T, E, true);
        Laya.Physics.setLayerCollision(E, E, false);
        Laya.Physics.setLayerCollision(T, M, true);
    }

    __createObstacleControls() {
        for (t = 0; t < this.__fixedObstacleControlCount; t++)
            this.__fixedObstacleControlPool.push(new FixedObstacleControl);
        for (t = 0; t < this.__moveObstacleControlCount; t++)
            this.__moveObstacleControlPool.push(new MoveObstacleControl);
        for (var t = 0; t < this.__chainObstacleControlCount; t++)
            this.__chainObstacleControlPool.push(new ChainObstacleControl)
    }

    __updateEnviroment() {
        this.__updateRoads();
        this.__updateBuildings();
    }

    __updateRoads() {
        if (!(PlayerControl.Instance.curPos.z - this.__roadSpanZ > this.__spanZDis)) {

            this.__createObstacle();
            this.__roadsPrefab[this.__roadsIndex].active = true;
            this.__roadsPrefab[this.__roadsIndex].transform.position = new Laya.Vector3(0, 0, this.__roadSpanZ);
            this.__roadSpanZ -= this.__roadSpanZDis;
            this.__roadSteps++;
            this.__roadsIndex = this.__roadsIndex >= this.__roadCount - 1 ? 0 : this.__roadsIndex + 1;
        }
    }

    __updateObstacles(t: number) {
        for (n = 0; n < this.__fixedObstacleControlCount; n++) {
            var e: FixedObstacleControl = this.__fixedObstacleControlPool[n];
            if (e.active)
                e.update(t);
        }
        for (n = 0; n < this.__moveObstacleControlCount; n++) {
            var i: MoveObstacleControl = this.__moveObstacleControlPool[n];
            if (i.active)
                i.update(t);
        }
        for (var n = 0; n < this.__chainObstacleControlCount; n++) {
            var r: ChainObstacleControl = this.__chainObstacleControlPool[n];
            if (r.active)
                r.update(t);
        }
    }

    __createObstacle() {
        if (!(this.__roadSpanZ > this.__initCreateObstacleDis)) return this.__createSpeedUpDis-- ,
            this.__createSpeedUpDis !==this.__createSpanObstacleDis1 && this.__createSpeedUpDis !== this.__createSpanObstacleDis2 || this.__setHasOrNoObstacles(),
            this.__createSpeedUpDis <= 0 ? (this.__createSpeedUpDis = this.__createSpeedUpConstantDis,
                void this.__setFixedObstacles({
                    type: FixedObstacleType.SPEEDUP,
                    number1: Math.floor(5 * Math.random() - 2),
                    number2: 0
                })
            ) : undefined
    }



 __setHasOrNoObstacles() {
        this.__createSimpleCounter < 0 ? this.__setObstacles() : this.__setSimpleObstacles();
    }

    __setObstacles(t?: number, e?: number, i?: boolean, n?: number) {
        var r: number = Math.random();
        var a: number = 0;
        var s: number = 0;
        var o: number = -1;
        var h: number = -1;
        var l: number = -1;
        if (t != undefined && null !== t && t >= 0) h = t;
        else
            for (g = 0; g < this.__obstaclesProbility.length; g++) {
                if (a += this.__obstaclesProbility[g], r > s && r < a) {
                    h = g;
                    break;
                }
                s += this.__obstaclesProbility[g];
            }
        var _: Array<number>;
        var u: number[][] = null;
        var c: number = 0;
        //by luo
        h = 3;
        switch (h) {
            case 0:
                switch (void 0 !== e && null !== e && e >= 0 ? l = e : (l = Math.floor(Math.random() * (SINGLEBOX.THREEFLOOR7 + 1 + 4)) - 4) < 0 && (l = 0), l) {
                    case SINGLEBOX.ONEFLOOR:
                        o = Math.floor(5 * Math.random()) - 2;
                        break;
                    case SINGLEBOX.TWOFLOOR1:
                        o = Math.random() > .5 ? -1 : 1;
                        break;
                    case SINGLEBOX.THREEFLOOR1:
                        o = Math.random() > .5 ? -1 : 2;
                        break;
                    case SINGLEBOX.THREEFLOOR2:
                    case SINGLEBOX.THREEFLOOR3:
                        o = Math.random() > .5 ? -2 : 1;
                        break;
                    case SINGLEBOX.THREEFLOOR4:
                        o = Math.random() > .5 ? -1 : 2;
                        break;
                    case SINGLEBOX.THREEFLOOR5:
                        o = Math.random() > .5 ? -2 : 1;
                        break;
                    case SINGLEBOX.THREEFLOOR6:
                        o = Math.random() > .5 ? -1 : 2;
                        break;
                    case SINGLEBOX.THREEFLOOR7:
                        o = Math.random() > .5 ? -2 : 2
                }
                this.__setFixedObstacles({
                    type: FixedObstacleType.SINGLEBOX,
                    otherType: l,
                    number1: o,
                    number2: -1
                });
                break;
            case 1:
                if (void 0 !== e && null !== e && e >= 0) l = e;
                else {
                    l = (_ = [TWOBOX.ONEFLOOR, TWOBOX.TWOFLOOR1, TWOBOX.THREEFLOOR1, TWOBOX.FOURFLOOR1])[Math.floor(Math.random() * _.length)]
                }
                this.__setFixedObstacles({
                    type: FixedObstacleType.TWOBOX,
                    otherType: l,
                    number1: -2,
                    number2: 2
                });
                break;
            case 2:
                u = [[1, 2], [-2, -1]];
                c = Math.floor(Math.random() * u.length);
                l = void 0 !== e && null !== e && e >= 0 ? e : (_ = [TWOBOX.ONEFLOOR, TWOBOX.TWOFLOOR4, TWOBOX.THREEFLOOR2, TWOBOX.THREEFLOOR3, TWOBOX.THREEFLOOR4, TWOBOX.THREEFLOOR5])[Math.floor(Math.random() * _.length)];
                this.__setFixedObstacles({
                    type: FixedObstacleType.TWOBOX,
                    otherType: l,
                    number1: u[c][0],
                    number2: u[c][1]
                });
                break;
            case 3:
                u = [[-2, 0], [2, 0], [0, 0]];
                c = Math.floor(Math.random() * u.length);
                this.__setFixedObstacles({
                    type: FixedObstacleType.ONEBOXFOURJUMP,
                    number1: u[c][0],
                    number2: u[c][1]
                });
                break;
            case 4:
                u = [[-2, -1], [1, 2], [-2, 2]];
                c = Math.floor(Math.random() * u.length);
                this.__setFixedObstacles({
                    type: FixedObstacleType.TWOBOXTHREEJUMP,
                    number1: u[c][0],
                    number2: u[c][1]
                });
                break;
            case 5:
                u = [[-2, 2], [1, 2], [-2, -1], [0, 1], [-1, 0]];
                c = Math.floor(Math.random() * u.length);
                l = void 0 !== e && null !== e && e >= 0 ? e : c <= 2 ? (_ = [THREEBOX.ONEFLOOR, THREEBOX.TWOFLOOR1, THREEBOX.TWOFLOOR2, THREEBOX.TWOFLOOR3])[Math.floor(Math.random() * _.length)] : THREEBOX.ONEFLOOR;
                this.__setFixedObstacles({
                    type: FixedObstacleType.THREEBOX,
                    otherType: l,
                    number1: u[c][0],
                    number2: u[c][1]
                });
                break;
            case 6:
                u = [[1, 2], [-2, -1], [0, 1], [-1, 0]];
                c = Math.floor(Math.random() * u.length);
                this.__setFixedObstacles({
                    type: FixedObstacleType.THREEBOXTWOJUMP,
                    number1: u[c][0],
                    number2: u[c][1]
                });
                break;
            case 7:
                u = [[2, 0], [-2, 0]];
                c = Math.floor(Math.random() * u.length);
                l = void 0 !== e && null !== e && e >= 0 ? e : (_ = [FOURBOX.ONEFLOOR, FOURBOX.TWOFLOOR1, FOURBOX.THREEFLOOR1, FOURBOX.THREEFLOOR2])[Math.floor(Math.random() * _.length)];
                this.__setFixedObstacles({
                    type: FixedObstacleType.FOURBOX,
                    otherType: l,
                    number1: u[c][0],
                    number2: u[c][1]
                });
                break;
            case 8:
                var d: boolean = Math.random() > .5;
                void 0 === i && null !== i && (d = i);
                this.__setMoveObstacles({
                    type: MoveObstacleType.SINGLELEFTTORIGHT,
                    lorr: d,
                    once: true
                });
                break;
            case 9:
                var f: number = Math.random() > .5 ? MoveObstacleType.SINGLELEFTTORIGHT : MoveObstacleType.DOUBLELEFTANDRIGHT;
                var p: boolean = Math.random() > .5;
                void 0 !== n && null !== n && (f = n);
                this.__setMoveObstacles({
                    type: f,
                    lorr: p,
                    once: false
                });
                break;
            case 10:
                u = [[0, 2], [-2, 0]];
                c = Math.floor(Math.random() * u.length);
                l = void 0 !== e && null !== e && e >= 0 ? e : (_ = [TWOBOX.ONEFLOOR, TWOBOX.TWOFLOOR5, TWOBOX.THREEFLOOR6])[Math.floor(Math.random() * _.length)];
                this.__setFixedObstacles({
                    type: FixedObstacleType.TWOBOX,
                    otherType: l,
                    number1: u[c][0],
                    number2: u[c][1]
                });
                break;
            case 11:
                if (u = [[-1, 1], [-2, 0], [-2, 1], [0, 2], [-1, 2]], c = Math.floor(Math.random() * u.length), void 0 !== e && null !== e && e >= 0) {
                    l = e;
                }
                else switch (c) {
                    case 0:
                        l = Math.random() > .5 ? THREEBOX.ONEFLOOR : THREEBOX.THREEFLOOR1;
                        break;
                    case 1:
                    case 4:
                        l = Math.random() > .5 ? THREEBOX.ONEFLOOR : THREEBOX.TWOFLOOR4;
                        break;
                    case 2:
                    case 3:
                        l = Math.random() > .5 ? THREEBOX.ONEFLOOR : THREEBOX.TWOFLOOR5;
                }
                this.__setFixedObstacles({
                    type: FixedObstacleType.THREEBOX,
                    otherType: l,
                    number1: u[c][0],
                    number2: u[c][1]
                });
                break;
            case 12:
                l = void 0 !== e && null !== e && e >= 0 ? e : (_ = [TWOBOX.ONEFLOOR, TWOBOX.TWOFLOOR5, TWOBOX.THREEFLOOR6])[Math.floor(Math.random() * _.length)];
                this.__setFixedObstacles({
                    type: FixedObstacleType.TWOBOX,
                    otherType: l,
                    number1: -1,
                    number2: 1
                });
                break;
            case 13:
                u = [[1, 0], [0, 0], [-1, 0]];
                c = Math.floor(Math.random() * u.length);
                l = void 0 !== e && null !== e && e >= 0 ? e : 0 === c && Math.random() > .5 ? FOURBOX.THREEFLOOR3 : FOURBOX.ONEFLOOR;
                this.__setFixedObstacles({
                    type: FixedObstacleType.FOURBOX,
                    otherType: l,
                    number1: u[c][0],
                    number2: u[c][1]
                });
                break;
            case 14:
                u = [[1, 0], [0, 0], [-1, 0]];
                c = Math.floor(Math.random() * u.length);
                this.__setFixedObstacles({
                    type: FixedObstacleType.FOURBOXONEJUMP,
                    number1: u[c][0],
                    number2: u[c][1]
                });
                break;
            case 15:
                this.__createSimpleCounter = 0;
                this.__createSimpleTypes = Math.random() > .5 ? [{
                    type: 1,
                    otherType: TWOBOX.FOURFLOOR1
                }, {
                    type: 1,
                    otherType: TWOBOX.THREEFLOOR1
                }, {
                    type: 1,
                    otherType: TWOBOX.TWOFLOOR1
                }] : [{
                    type: 1,
                    otherType: TWOBOX.TWOFLOOR1
                }, {
                    type: 1,
                    otherType: TWOBOX.THREEFLOOR1
                }, {
                    type: 1,
                    otherType: TWOBOX.FOURFLOOR1
                }],
                    this.__setSimpleObstacles();
                break;
            case 16:
                this.__createSimpleCounter = 0;
                var m: number = Math.floor(7 * Math.random()) + 2;
                Math.random();
                this.__createSimpleTypes = [];
                for (var g = 0; g < m; g++)
                    this.__createSimpleTypes.push({ type: 9, moveType: MoveObstacleType.SINGLELEFTTORIGHT });
                this.__setSimpleObstacles();
                break;
            case 17:
                this.__createSimpleCounter = 0;
                this.__createSimpleTypes = [{
                    type: 9,
                    moveType: MoveObstacleType.SINGLELEFTTORIGHT
                }, {
                    type: 9,
                    moveType: MoveObstacleType.SINGLELEFTTORIGHT
                }, {
                    type: 9,
                    moveType: MoveObstacleType.SINGLELEFTTORIGHT
                }],
                    this.__setSimpleObstacles();
                break;
            case 18:
                this.__createSimpleCounter = 0;
                this.__createSimpleTypes = [{
                    type: 9,
                    moveType: MoveObstacleType.DOUBLELEFTANDRIGHT
                }, {
                    type: 9,
                    moveType: MoveObstacleType.DOUBLELEFTANDRIGHT
                }, {
                    type: 9,
                    moveType: MoveObstacleType.DOUBLELEFTANDRIGHT
                }],
                    this.__setSimpleObstacles();
                break;
            case 19:
                this.__setChainObstacles({
                    type: ChainObstacleType.UPDOWNONEBYONE
                });
                break;
            case 20:
                this.__setChainObstacles({
                    type: ChainObstacleType.ROTATELOOP
                });
                break;
            default:
                console.log("不能设置的类型");
        }
    }

    __setSimpleObstacles() {
        var t: Object = this.__createSimpleTypes[this.__createSimpleCounter];
        this.__createSimpleCounter++;
        this.__setObstacles(t["type"],
            void 0 !== t["otherType"] ? t["otherType"] : null,
            void 0 !== t["lorr"] ? t["lorr"] : null,
            void 0 !== t["moveType"] ? t["moveType"] : null);
        if (this.__createSimpleCounter >= this.__createSimpleTypes.length) {
            this.__createSimpleCounter = -1;
            this.__createSimpleTypes = null;
        }
    }

    __setFixedObstacles(t: Object) {
        var e = {
            type: -1,
            otherType: -1,
            spanZ: this.__roadSpanZ,
            number1: 0,
            number2: 0,
            boxes: null,
            jumps: null,
            speedUps: null
        };
        switch (e.type = t["type"],
        void 0 !== t["otherType"] && (e.otherType = t["otherType"]),
        e.number1 = t["number1"],
        e.number2 = t["number2"], e.type) {
            case FixedObstacleType.SINGLEBOX:
                switch (e.otherType) {
                    case SINGLEBOX.ONEFLOOR:
                        e.boxes = this.__getBoxes(1);
                        break;
                    case SINGLEBOX.TWOFLOOR1:
                    case SINGLEBOX.THREEFLOOR1:
                    case SINGLEBOX.THREEFLOOR2:
                    case SINGLEBOX.THREEFLOOR3:
                    case SINGLEBOX.THREEFLOOR4:
                    case SINGLEBOX.THREEFLOOR5:
                    case SINGLEBOX.THREEFLOOR6:
                        e.boxes = this.__getBoxes(4);
                        break;
                    case SINGLEBOX.THREEFLOOR7:
                        e.boxes = this.__getBoxes(3);
                }
                break;
            case FixedObstacleType.TWOBOX:
                switch (e.otherType) {
                    case TWOBOX.ONEFLOOR:
                        e.boxes = this.__getBoxes(2);
                        break;
                    case TWOBOX.TWOFLOOR1:
                        e.boxes = this.__getBoxes(7);
                        break;
                    case TWOBOX.TWOFLOOR2:
                    case TWOBOX.TWOFLOOR3:
                    case TWOBOX.TWOFLOOR4:
                        e.boxes = this.__getBoxes(4);
                        break;
                    case TWOBOX.TWOFLOOR5:
                        e.boxes = this.__getBoxes(5);
                        break;
                    case TWOBOX.THREEFLOOR1:
                        e.boxes = this.__getBoxes(9);
                        break;
                    case TWOBOX.THREEFLOOR2:
                    case TWOBOX.THREEFLOOR3:
                        e.boxes = this.__getBoxes(4);
                        break;
                    case TWOBOX.THREEFLOOR4:
                    case TWOBOX.THREEFLOOR5:
                        e.boxes = this.__getBoxes(5);
                        break;
                    case TWOBOX.THREEFLOOR6:
                        e.boxes = this.__getBoxes(7);
                        break;
                    case TWOBOX.FOURFLOOR1:
                        e.boxes = this.__getBoxes(11)
                }
                break;
            case FixedObstacleType.THREEBOX:
                switch (e.otherType) {
                    case THREEBOX.ONEFLOOR:
                        e.boxes = this.__getBoxes(3);
                        break;
                    case THREEBOX.TWOFLOOR1:
                    case THREEBOX.TWOFLOOR2:
                    case THREEBOX.TWOFLOOR3:
                        e.boxes = this.__getBoxes(4);
                        break;
                    case THREEBOX.TWOFLOOR4:
                    case THREEBOX.TWOFLOOR5:
                        e.boxes = this.__getBoxes(7);
                        break;
                    case THREEBOX.THREEFLOOR1:
                        e.boxes = this.__getBoxes(11);
                }
                break;
            case FixedObstacleType.FOURBOX:
                switch (e.otherType) {
                    case FOURBOX.ONEFLOOR:
                        e.boxes = this.__getBoxes(4);
                        break;
                    case FOURBOX.TWOFLOOR1:
                        e.boxes = this.__getBoxes(6);
                        break;
                    case FOURBOX.THREEFLOOR1:
                        e.boxes = this.__getBoxes(10);
                        break;
                    case FOURBOX.THREEFLOOR2:
                        e.boxes = this.__getBoxes(12);
                        break;
                    case FOURBOX.THREEFLOOR3:
                        e.boxes = this.__getBoxes(8);
                }
                break;
            case FixedObstacleType.ONEBOXFOURJUMP:
                e.boxes = this.__getBoxes(1), e.jumps = this.__getJumps(4);
                break;
            case FixedObstacleType.TWOBOXTHREEJUMP:
                e.boxes = this.__getBoxes(2), e.jumps = this.__getJumps(3);
                break;
            case FixedObstacleType.THREEBOXTWOJUMP:
                e.boxes = this.__getBoxes(3), e.jumps = this.__getJumps(2);
                break;
            case FixedObstacleType.FOURBOXONEJUMP:
                e.boxes = this.__getBoxes(4), e.jumps = this.__getJumps(1);
                break;
            case FixedObstacleType.SPEEDUP:
                e.speedUps = this.__getSpeedUps(1);
                break;
            default:
                console.log("不能设置的类型");
        }
        this.__fixedObstacleControlPool[this.__fixedObstacleControlIndex].reset(e);
        this.__fixedObstacleControlIndex =
            this.__fixedObstacleControlIndex >= this.__fixedObstacleControlCount - 1 ? 0 : this.__fixedObstacleControlIndex + 1;
    }

    __setMoveObstacles(t: Object) {
        var e = {
            type: -1,
            lorr: false,
            once: false,
            spanZ: this.__roadSpanZ,
            boxes: null
        };
        switch (e.type = t["type"], e["lorr"] = t["lorr"], e["once"] = t["once"], e["type"]) {
            case MoveObstacleType.SINGLELEFTTORIGHT:
            case MoveObstacleType.SINGLELEFTTHREE:
            case MoveObstacleType.SINGLERIGHTTHREE:
                e.boxes = this.__getBoxes(1);
                break;
            case MoveObstacleType.DOUBLELEFTANDRIGHT:
                e.boxes = this.__getBoxes(2);
                break;
            case MoveObstacleType.SINGLEMIDDLE:
                e.boxes = this.__getBoxes(1);
                break;
            default:
                console.log("不能设置的类型");
        }
        this.__moveObstacleControlPool[this.__moveObstacleControlIndex].reset(e);
        this.__moveObstacleControlIndex =
            this.__moveObstacleControlIndex >= this.__moveObstacleControlCount - 1 ? 0 : this.__moveObstacleControlIndex + 1;
    }

    //luo luo luo 

    __setChainObstacles(t: Object) {
        var e: Object = {
            type: -1,
            spanZ: this.__roadSpanZ,
            boxes: null
        };
        switch (e["type"] = t["type"], e["type"]) {
            case ChainObstacleType.UPDOWNONEBYONE:
                e["boxes"] = this.__getBoxes(5);
                break;
            case ChainObstacleType.ROTATELOOP:
                e["boxes"] = this.__getBoxes(3);
                break;
            default:
                console.log("不能设置的类型");
        }
        this.__chainObstacleControlPool[this.__chainObstacleControlIndex].reset(e);
        this.__chainObstacleControlIndex =
            this.__chainObstacleControlIndex >= this.__chainObstacleControlCount - 1 ? 0 : this.__chainObstacleControlIndex + 1;
    }

    __getBoxes(t: number): Array<Laya.MeshSprite3D> {
        for (var e: Array<Laya.MeshSprite3D> = [], i = 0; i < t; i++) {
            var n: Laya.MeshSprite3D = this.__boxObstacles[this.__boxIndex];
            e.push(n);
            this.__boxIndex = this.__boxIndex >= this.__boxCount - 1 ? 0 : this.__boxIndex + 1;
        }
        return e;
    }

    __getJumps(t: number): Array<Laya.Sprite3D> {
        for (var e: Array<Laya.Sprite3D> = [], i = 0; i < t; i++) {
            var n: Laya.Sprite3D = this.__jumpObstacles[this.__jumpIndex];
            e.push(n);
            this.__jumpIndex = this.__jumpIndex >= this.__jumpCount - 1 ? 0 : this.__jumpIndex + 1;
        }
        return e;
    }

    __getSpeedUps(t: number): Array<Laya.MeshSprite3D> {
        for (var e: Array<Laya.MeshSprite3D> = [], i = 0; i < t; i++) {
            var n: Laya.MeshSprite3D = this.__speedUpObstacles[this.__speedUpIndex];
            e.push(n);
            this.__speedUpIndex = this.__speedUpIndex >= this.__speedUpCount - 1 ? 0 : this.__speedUpIndex + 1;
        }
        return e;
    }



    __updateBuildings() {
        var t: number = PlayerControl.Instance.curPos.z;
        if (t - this.__buildingLSpanZ < this.__spanZDis) {
            var e: Laya.MeshSprite3D = this.__buildingsPrefab[this.__buildingsIndex];
            var i: number = Math.random() * (this.__buildingScaleYMax - this.__buildingScaleYMin) + this.__buildingScaleYMin;
            e.active = true;
            e.transform.localScale = new Laya.Vector3(this.__buildScaleXZ, i, this.__buildScaleXZ);
            e.transform.position = new Laya.Vector3(-this.__buildingSpanX, .5 * i - this.__buildingSpanY, this.__buildingLSpanZ);
            this.__buildingLSpanZ -= this.__buildingSpanZDis;
            this.__buildingsIndex = this.__buildingsIndex >= this.__buildingCount - 1 ? 0 : this.__buildingsIndex + 1;
        }
        if (t - this.__buildingRSpanZ < this.__spanZDis) {
            var e: Laya.MeshSprite3D = this.__buildingsPrefab[this.__buildingsIndex];
            var i: number = Math.random() * (this.__buildingScaleYMax - this.__buildingScaleYMin) + this.__buildingScaleYMin;
            e.active = true;
            e.transform.localScale = new Laya.Vector3(this.__buildScaleXZ, i, this.__buildScaleXZ);
            e.transform.position = new Laya.Vector3(this.__buildingSpanX, .5 * i - this.__buildingSpanY, this.__buildingRSpanZ);
            this.__buildingRSpanZ -= this.__buildingSpanZDis;
            this.__buildingsIndex = this.__buildingsIndex >= this.__buildingCount - 1 ? 0 : this.__buildingsIndex + 1;
        }
    }


    levelChange() {
        var t: number = GameData.Instance.level;
        if (t > 4)
            t = 4;
        this.__obstaclesProbility = GameSetting.obstacleProbilities[t];
    }

    gameInit() {
        this.levelChange();
        this.__createObstacleControls();
        this.__createPrefabs();
        Laya.timer.loop(this.__qOffsetLoopTime, this, this.__qOffsetChange);
        this.__speedupManager.gameInit();
    }

    gameUpdate(t: number) {
        this.__speedupManager.gameUpdate(t);
        if (GameManager.Instance.gameState !== GameState.END) {
            this.__updateEnviroment();
            this.__updateObstacles(t);
        }

    }

    gameReset() {
        this.levelChange();
        this.__resetAllObjs();
    }

    __disableObj(t: any) {
        t.active = false;
        var e: Laya.Component3D = t.getComponentByType(Laya.BoxCollider);
        if (e) { e.enable = false; }
    }

    __resetAllObjs() {
        this.__roadsIndex = 0;
        this.__roadSpanZ = 6;
        this.__roadSteps = 0;
        for (t = 0; t < this.__roadCount; t++) {
            this.__roadsPrefab[0].active = false
        }
        this.__buildingsIndex = 0;
        this.__buildingLSpanZ = 5;
        this.__buildingRSpanZ = 2;
        for (t = 0; t < this.__buildingCount; t++) this.__disableObj(this.__buildingsPrefab[t]);
        this.__boxIndex = 0;
        for (t = 0; t < this.__boxCount; t++) this.__disableObj(this.__boxObstacles[t]);
        this.__jumpIndex = 0;
        for (t = 0; t < this.__jumpCount; t++) this.__disableObj(this.__jumpObstacles[t]);
        this.__speedUpIndex = 0;
        for (t = 0; t < this.__speedUpCount; t++) this.__disableObj(this.__speedUpObstacles[t]);
        this.__fixedObstacleControlIndex = 0;
        for (t = 0; t < this.__fixedObstacleControlCount; t++) this.__fixedObstacleControlPool[t].hide();
        this.__moveObstacleControlIndex = 0;
        for (t = 0; t < this.__moveObstacleControlCount; t++) this.__moveObstacleControlPool[t].hide();
        this.__chainObstacleControlIndex = 0;
        for (var t = 0; t < this.__chainObstacleControlCount; t++) this.__chainObstacleControlPool[t].hide();
        this.__createSpeedUpDis = 0;
        this.__createSimpleCounter = -1;
        this.__createSimpleTypes = null;
    }


    __qOffsetChange() {
        //这里会触发一个场景的变换！
        if (GameManager.Instance.gameState === GameState.PLAYING) {
            var t: Laya.Vector4 = GameData.Instance.qOffset;
            var e: number = Math.floor(Math.random() * this.__qOffsetCountX);
            // debugger
            if (this.__qOffsetXIndex === e) { e > 0 ? e -= 1 : e += 1; }
            this.__qOffsetXIndex = e;
            var i: number = Math.floor(Math.random() * this.__qOffsetCountY);
            if (this.__qOffsetYIndex === i) { i > 0 ? i -= 1 : i += 1; }
            this.__qOffsetYIndex = i;
            var n: number = Math.abs(this.__qOffsetXS[this.__qOffsetXIndex] - t.x);
            var r: number = Math.abs(this.__qOffsetYS[this.__qOffsetYIndex] - t.y);
            this.__qOffsetChangeTime = n > r ? 100 * n : 100 * r;
            var a = this;

            // var ttween:Laya.Tween = new Laya.Tween();
            // ttween.update = Laya.Handler.create()

            var tweenObj: Object = {
                x: t.x,
                y: t.y,
            };
            Laya.Tween.to(tweenObj, {
                x: a.__qOffsetXS[a.__qOffsetXIndex],
                y: a.__qOffsetYS[a.__qOffsetYIndex],
                update: Laya.Handler.create(a, function () {

                    t.x = tweenObj["x"];
                    t.y = tweenObj["y"];
                    // console.log('@debug: x=', t.x , ';y=', t.y);
                    // debugger
                    a.__roadAMaterial.qOffset = t;
                    a.__roadBMaterial.qOffset = t;
                    a.__buildingMaterial.qOffset = t;
                    a.__speedUpMat.qOffset = t;
                    a.__boxMat.qOffset = t;
                    a.__jumpMat.qOffset = t;
                    PlayerControl.Instance.qOffsetChange();
                    SpeedUpPtManager.Instance.qOffsetChange();
                }, undefined, false)
            }, a.__qOffsetChangeTime);
        }

    }

    sceneChange(t: number) {
        var e: number = GameData.Instance.sceneIndex;
        var i: Laya.Vector3 = GameData.Instance.fogColor;
        Laya.Vector4.lerp(this.__roadAColor, this.__roadAColors[e], t, this.__roadAColor);
        this.__roadAMaterial.mainColor = this.__roadAColor;
        this.__roadAMaterial.fogColor = i;
        Laya.Vector4.lerp(this.__roadBColor, this.__roadBColors[e], t, this.__roadBColor);
        this.__roadBMaterial.mainColor = this.__roadBColor;
        this.__roadBMaterial.fogColor = i;
        Laya.Vector4.lerp(this.__buildingColor, this.__buildingColors[e], t, this.__buildingColor);
        this.__buildingMaterial.mainColor = this.__buildingColor;
        this.__buildingMaterial.fogColor = i;
        this.__boxMat.mainColor = this.__roadBColor;
        this.__boxMat.fogColor = i;
        this.__speedUpMat.fogColor = i;
        this.__jumpMat.fogColor = i;
    }
}