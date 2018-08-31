import WebGL = Laya.WebGL;
// 程序入口
/*
class GameMain {
    private glitter: Laya.Glitter;
    private pos1: Laya.Vector3;
    private pos2: Laya.Vector3;
    private scaleDelta: number = 0;
    private scaleValue: number = 0;

    constructor() {
        Laya3D.init(640, 1136);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;

        var scene: Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
        this.pos1 = new Laya.Vector3(0, 0, -0.5);
        this.pos2 = new Laya.Vector3(0, 0, 0.5);

        var camera: Laya.Camera = scene.addChild(new Laya.Camera(0, 1, 1000)) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 6, 10));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        // camera.addComponent(CameraMoveScript)

        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.7, 0.6, 0.6);
        directionLight.direction = new Laya.Vector3(0, -1.0, -1.0);

        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.5, 0.5, 0.5))) as Laya.MeshSprite3D;
        box.transform.position = new Laya.Vector3(1.5, 0.25, 0.6);
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);

        this.glitter = scene.addChild(new Laya.Glitter()) as Laya.Glitter;
        var glitterTemplet: Laya.GlitterTemplet = this.glitter.templet;
        var glitterMaterial: Laya.GlitterMaterial = this.glitter.glitterRender.sharedMaterial as Laya.GlitterMaterial;
        glitterMaterial.diffuseTexture = Laya.Texture2D.load("res/image.png");

        glitterMaterial.albedo = new Laya.Vector4(1.3, 1.3, 1.3, 1);
        glitterTemplet.lifeTime = 1.3 * 1;
        glitterTemplet.minSegmentDistance = 0.1;
        glitterTemplet.minInterpDistance = 0.6;
        glitterTemplet.maxSlerpCount = 128;
        glitterTemplet.maxSegments = 100;
        Laya.timer.frameLoop(1, this, this.loop);
    }
    private loop(): void {
        this.scaleValue = (this.scaleDelta += 0.01);//Math.sin
        this.pos1.elements[0] = this.pos2.elements[0] = Math.sin(this.scaleValue * 3);
        this.pos1.elements[1] = Math.sin(this.scaleValue * 2) * 0.1;
        this.pos2.elements[1] = Math.sin(this.scaleValue * 2) * 0.1;
        this.glitter.addGlitterByPositions(this.pos1, this.pos2);
    }
}
// new GameMain();
*/
var gameManager: GameManager = new GameManager;
gameManager.preload();