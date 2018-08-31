/*
* name;
*/
class PlayerCollisionCheck extends Laya.Script {
    constructor() {
        super();
    }

    onTriggerEnter(t:Laya.Collider) {
        "speedUp" === t.owner.name && PlayerControl.Instance.speedUp();
            "box" === t.owner.name && PlayerControl.Instance.hitLose();
            "jump" === t.owner.name && PlayerControl.Instance.fly();
    }
}