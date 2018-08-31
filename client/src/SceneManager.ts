/*
* name;
*/
class SceneManager {
    public static Instance: SceneManager;

    public __scene: Laya.Scene;
    constructor() {
        SceneManager.Instance = this;
        this.__scene = new Laya.Scene();
    }

    gameInit() {
        this.__scene.ambientColor = new Laya.Vector3(.324, .324, .324);
        Laya.stage.addChild(this.__scene);
    }

    addToScene(t:Laya.Sprite3D) {
        this.__scene.addChild(t);
    }
}