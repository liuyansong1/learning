var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        this.scaleDelta = 0;
        this.scaleValue = 0;
        Laya3D.init(640, 1136);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        var scene = Laya.stage.addChild(new Laya.Scene());
        this.pos1 = new Laya.Vector3(0, 0, -0.5);
        this.pos2 = new Laya.Vector3(0, 0, 0.5);
        var camera = scene.addChild(new Laya.Camera(0, 1, 1000));
        camera.transform.translate(new Laya.Vector3(0, 6, 10));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        // camera.addComponent(CameraMoveScript)
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(0.7, 0.6, 0.6);
        directionLight.direction = new Laya.Vector3(0, -1.0, -1.0);
        var box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.5, 0.5, 0.5)));
        box.transform.position = new Laya.Vector3(1.5, 0.25, 0.6);
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        this.glitter = scene.addChild(new Laya.Glitter());
        var glitterTemplet = this.glitter.templet;
        var glitterMaterial = this.glitter.glitterRender.sharedMaterial;
        glitterMaterial.diffuseTexture = Laya.Texture2D.load("res/image.png");
        glitterMaterial.albedo = new Laya.Vector4(1.3, 1.3, 1.3, 1);
        glitterTemplet.lifeTime = 1.3 * 1;
        glitterTemplet.minSegmentDistance = 0.1;
        glitterTemplet.minInterpDistance = 0.6;
        glitterTemplet.maxSlerpCount = 128;
        glitterTemplet.maxSegments = 100;
        Laya.timer.frameLoop(1, this, this.loop);
    }
    GameMain.prototype.loop = function () {
        this.scaleValue = (this.scaleDelta += 0.01); //Math.sin
        this.pos1.elements[0] = this.pos2.elements[0] = Math.sin(this.scaleValue * 3);
        this.pos1.elements[1] = Math.sin(this.scaleValue * 2) * 0.1;
        this.pos2.elements[1] = Math.sin(this.scaleValue * 2) * 0.1;
        this.glitter.addGlitterByPositions(this.pos1, this.pos2);
    };
    return GameMain;
}());
// new GameMain();
var gameManager = new GameManager;
gameManager.preload();
//# sourceMappingURL=LayaSample.js.map