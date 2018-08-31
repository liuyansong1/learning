/*
* name;
*/
var FixedObstacleType = {
    "SINGLEBOX": 0,
    "TWOBOX": 1,
    "THREEBOX": 2,
    "FOURBOX": 3,
    "ONEBOXFOURJUMP": 4,
    "TWOBOXTHREEJUMP": 5,
    "THREEBOXTWOJUMP": 6,
    "FOURBOXONEJUMP": 7,
    "SPEEDUP": 8
}


var SINGLEBOX = {
    "ONEFLOOR": 0,
    "TWOFLOOR1": 1,
    "THREEFLOOR1": 2,
    "THREEFLOOR2": 3,
    "THREEFLOOR3": 4,
    "THREEFLOOR4": 5,
    "THREEFLOOR5": 6,
    "THREEFLOOR6": 7,
    "THREEFLOOR7": 8,
}

var TWOBOX = {
    "ONEFLOOR": 0,
    "TWOFLOOR1": 1,
    "TWOFLOOR2": 2,
    "TWOFLOOR3": 3,
    "TWOFLOOR4": 4,
    "TWOFLOOR5": 5,
    "THREEFLOOR1": 6,
    "THREEFLOOR2": 7,
    "THREEFLOOR3": 8,
    "THREEFLOOR4": 9,
    "THREEFLOOR5": 10,
    "THREEFLOOR6": 11,
    "FOURFLOOR1": 12,
}

var THREEBOX = {
    "ONEFLOOR": 0,
    "TWOFLOOR1": 1,
    "TWOFLOOR2": 2,
    "TWOFLOOR3": 3,
    "TWOFLOOR4": 4,
    "TWOFLOOR5": 5,
    "THREEFLOOR1": 6,
}

var FOURBOX = {
    "ONEFLOOR": 0,
    "TWOFLOOR1": 1,
    "THREEFLOOR1": 2,
    "THREEFLOOR2": 3,
    "THREEFLOOR3": 4,
}

class FixedObstacleControl extends ObstacleControl {
    __objs: Array<any>;
    __spanZ: number;
    constructor() {
        super();
        this.__objs = [];
    }

    update(t: number) {
        if (this.__active)
            this.__collect();
    }

    __collect() {
        if (this.__spanZ - PlayerControl.Instance.curPos.z > GameSetting.collectDis)
            this.hide();
    }

    reset(t: Object) {
        this.__active = true;
        this.__spanZ = t["spanZ"];
        this.__setObjs(t);
    }

    __setObjs(t: Object) {
        var e: number = t["type"];
        var i: number = t["otherType"];
        var n: number = t["number1"];
        var r: number = t["number2"];
        var a: Array<Laya.MeshSprite3D> = t["boxes"];
        var s: Array<any> = t["jumps"];
        var o: Array<Laya.MeshSprite3D> = t["speedUps"];
        var h: number = 0;
        var l: number = 0;
        if (a)
            for (_ = 0; _ < a.length; _++) this.__objs.push(a[_]);
        if (s)
            for (_ = 0; _ < s.length; _++) this.__objs.push(s[_]);
        if (o)
            for (_ = 0; _ < o.length; _++) this.__objs.push(o[_]);

        switch (e) {
            case FixedObstacleType.SINGLEBOX:
                this.__setSinglBox(n, a, i);
                break;
            case FixedObstacleType.TWOBOX:
                this.__setTwoBox(n > r ? r : n, n < r ? r : n, a, i);
                break;
            case FixedObstacleType.THREEBOX:
                this.__setThreeBox(n, r, a, i);
                break;
            case FixedObstacleType.FOURBOX:
                this.__setFourBox(n, a, i);
                break;
            case FixedObstacleType.ONEBOXFOURJUMP:
                for (_ = 0; _ < 5; _++) {
                    if (_ == n + 2) {
                        this.__activeObj(a[l], new Laya.Vector3(_ - 2, .5, this.__spanZ));
                        l++;
                    }
                    else {
                        this.__activeObj(s[h], new Laya.Vector3(_ - 2, .5, this.__spanZ));
                        h++;
                    }
                }
                break;
            case FixedObstacleType.TWOBOXTHREEJUMP:
                for (_ = 0; _ < 5; _++) {
                    if (_ === n + 2 || _ === r + 2) {
                        this.__activeObj(a[l], new Laya.Vector3(_ - 2, .5, this.__spanZ));
                        l++;
                    }
                    else {
                        this.__activeObj(s[h], new Laya.Vector3(_ - 2, .5, this.__spanZ));
                        h++;
                    }
                }
                break;
            case FixedObstacleType.THREEBOXTWOJUMP:
                for (_ = 0; _ < 5; _++) {
                    if (_ === n + 2 || _ === r + 2) {
                        this.__activeObj(s[h], new Laya.Vector3(_ - 2, .5, this.__spanZ));
                        h++;
                    }
                    else {
                        this.__activeObj(a[l], new Laya.Vector3(_ - 2, .5, this.__spanZ));
                        l++;
                    }
                }
                break;
            case FixedObstacleType.FOURBOXONEJUMP:
                for (var _ = 0; _ < 5; _++) {
                    if (_ === n + 2) {
                        this.__activeObj(s[h], new Laya.Vector3(_ - 2, .5, this.__spanZ));
                        h++;
                    }
                    else {
                        this.__activeObj(a[l], new Laya.Vector3(_ - 2, .5, this.__spanZ));
                        l++;
                    }
                }
                break;
            case FixedObstacleType.SPEEDUP:
                this.__activeObj(o[0], new Laya.Vector3(n, .01, this.__spanZ));
                break;
            default:
                console.log("不能设置的类型");
        }
    }

    /*
    t = t.number1,
    e = t.boxes,
    i = t.otherType,
    */

    __setSinglBox(t: number, e: Array<Laya.MeshSprite3D>, i: number) {
        var n: number = 0;
        switch (this.__activeObj(e[n], new Laya.Vector3(t, .5, this.__spanZ)), n++ , i) {
            case SINGLEBOX.ONEFLOOR:
                break;
            case SINGLEBOX.TWOFLOOR1:
                this.__activeObj(e[n], new Laya.Vector3(t - 1, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t + 1, 1.5, this.__spanZ));
                n++;
                break;
            case SINGLEBOX.THREEFLOOR1:
                this.__activeObj(e[n], new Laya.Vector3(t - 1, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t, 2.5, this.__spanZ));
                n++;
                break;
            case SINGLEBOX.THREEFLOOR2:
                this.__activeObj(e[n], new Laya.Vector3(t + 1, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t, 2.5, this.__spanZ));
                n++;
                break;
            case SINGLEBOX.THREEFLOOR3:
                this.__activeObj(e[n], new Laya.Vector3(t + 1, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t + 1, 2.5, this.__spanZ));
                n++;
                break;
            case SINGLEBOX.THREEFLOOR4:
                this.__activeObj(e[n], new Laya.Vector3(t - 1, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t - 1, 2.5, this.__spanZ));
                n++;
                break;
            case SINGLEBOX.THREEFLOOR5:
                this.__activeObj(e[n], new Laya.Vector3(t, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t, 2.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t + 1, 2.5, this.__spanZ));
                n++;
                break;
            case SINGLEBOX.THREEFLOOR6:
                this.__activeObj(e[n], new Laya.Vector3(t, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t, 2.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t - 1, 2.5, this.__spanZ));
                n++;
                break;
            case SINGLEBOX.THREEFLOOR7:
                this.__activeObj(e[n], new Laya.Vector3(t, 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(t, 2.5, this.__spanZ));
                n++;
                break;
            default:
                console.log("singlebox not");
        }
    }


    /*
    t=min[num1, num2]
    e=max[num1, num2]
    i=boxs
    n=othertype
    */

    __setTwoBox(t, e, i, n) {
        var r: number = 0;
        switch (this.__activeObj(i[r], new Laya.Vector3(t, .5, this.__spanZ)), r++ , this.__activeObj(i[r], new Laya.Vector3(e, .5, this.__spanZ)), r++ , n) {
            case TWOBOX.ONEFLOOR:
                break;
            case TWOBOX.TWOFLOOR1:
                for (a = 0; a < 5; a++) {
                    this.__activeObj(i[r], new Laya.Vector3(a - 2, 1.5, this.__spanZ));
                    r++;
                }
                break;
            case TWOBOX.TWOFLOOR2:
                this.__activeObj(i[r], new Laya.Vector3(t + 1, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e + 1, 1.5, this.__spanZ));
                r++;
                break;
            case TWOBOX.TWOFLOOR3:
                this.__activeObj(i[r], new Laya.Vector3(t - 1, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e - 1, 1.5, this.__spanZ));
                r++;
                break;
            case TWOBOX.TWOFLOOR4:
                this.__activeObj(i[r], new Laya.Vector3(t, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e, 1.5, this.__spanZ));
                r++;
                break;
            case TWOBOX.TWOFLOOR5:
                this.__activeObj(i[r], new Laya.Vector3(t, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(t + 1, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e, 1.5, this.__spanZ));
                r++;
                break;
            case TWOBOX.THREEFLOOR1:
                this.__activeObj(i[r], new Laya.Vector3(t, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e, 1.5, this.__spanZ));
                r++;
                for (a = 0; a < 5; a++) {
                    this.__activeObj(i[r], new Laya.Vector3(a - 2, 2.5, this.__spanZ));
                    r++;
                }
                break;
            case TWOBOX.THREEFLOOR2:
                this.__activeObj(i[r], new Laya.Vector3(e, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e, 2.5, this.__spanZ));
                r++;
                break;
            case TWOBOX.THREEFLOOR3:
                this.__activeObj(i[r], new Laya.Vector3(t, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(t, 2.5, this.__spanZ));
                r++;
                break;
            case TWOBOX.THREEFLOOR4:
                this.__activeObj(i[r], new Laya.Vector3(t, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(t, 2.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e, 2.5, this.__spanZ));
                r++;
                break;
            case TWOBOX.THREEFLOOR5:
                this.__activeObj(i[r], new Laya.Vector3(e, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(t, 2.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e, 2.5, this.__spanZ));
                r++;
                break;
            case TWOBOX.THREEFLOOR6:
                this.__activeObj(i[r], new Laya.Vector3(t, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(t, 2.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(t + 1, 2.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e, 2.5, this.__spanZ));
                r++;
                break;
            case TWOBOX.FOURFLOOR1:
                this.__activeObj(i[r], new Laya.Vector3(t, 1.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e, 1.5, this.__spanZ));
                r++;

                this.__activeObj(i[r], new Laya.Vector3(t, 2.5, this.__spanZ));
                r++;
                this.__activeObj(i[r], new Laya.Vector3(e, 2.5, this.__spanZ));
                r++;
                for (var a = 0; a < 5; a++) {
                    this.__activeObj(i[r], new Laya.Vector3(a - 2, 3.5, this.__spanZ));
                    r++;
                }
                break;
            default:
                console.log("twobox not")
        }
    }

    __setThreeBox(t: number, e: number, i: Array<Laya.MeshSprite3D>, n: number) {
        for (var r: number = 0, a: Array<number> = [], s: number = 0; s < 5; s++) {
            if (s !== t + 2 && s !== e + 2) {
                a.push(s - 2), this.__activeObj(i[r], new Laya.Vector3(s - 2, .5, this.__spanZ));
                r++;
            }
        }
        switch (n) {
            case THREEBOX.ONEFLOOR:
                break;
            case THREEBOX.TWOFLOOR1:
                this.__activeObj(i[r], new Laya.Vector3(a[1], 1.5, this.__spanZ));
                r++;
                break;
            case THREEBOX.TWOFLOOR2:
                this.__activeObj(i[r], new Laya.Vector3(a[0], 1.5, this.__spanZ));
                r++;
                break;
            case THREEBOX.TWOFLOOR3:
                this.__activeObj(i[r], new Laya.Vector3(e[2], 1.5, this.__spanZ));
                r++;
                break;
            case THREEBOX.TWOFLOOR4:
                for (s = 0; s < 3; s++) {
                    this.__activeObj(i[r], new Laya.Vector3(a[s], 1.5, this.__spanZ));
                    r++;
                }
                this.__activeObj(i[r], new Laya.Vector3(a[0] + 1, 1.5, this.__spanZ));
                r++;
                break;
            case THREEBOX.TWOFLOOR5:
                for (s = 0; s < 3; s++) {
                    this.__activeObj(i[r], new Laya.Vector3(a[s], 1.5, this.__spanZ));
                    r++;
                }
                this.__activeObj(i[r], new Laya.Vector3(a[2] - 1, 1.5, this.__spanZ));
                r++;
                break;
            case THREEBOX.THREEFLOOR1:
                for (s = 0; s < 5; s++) {
                    this.__activeObj(i[r], new Laya.Vector3(s - 2, 1.5, this.__spanZ));
                    r++;
                }
                for (s = 0; s < 3; s++) {
                    this.__activeObj(i[r], new Laya.Vector3(a[s], 2.5, this.__spanZ));
                    r++;
                }
                break;
            default:
                console.log("threebox not");
        }
    }


    __setFourBox(t: number, e: Array<Laya.MeshSprite3D>, i: number) {
        for (var n: number = 0, r: Array<number> = [], a: number = 0; a < 5; a++) {
            if (a !== t + 2) {
                r.push(a - 2), this.__activeObj(e[n], new Laya.Vector3(a - 2, .5, this.__spanZ));
                n++;
            }
        }
        switch (i) {
            case FOURBOX.ONEFLOOR:
                break;
            case FOURBOX.TWOFLOOR1:
                this.__activeObj(e[n], new Laya.Vector3(r[0], 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(r[3], 1.5, this.__spanZ));
                n++;
                break;
            case FOURBOX.THREEFLOOR1:
                this.__activeObj(e[n], new Laya.Vector3(r[0], 1.5, this.__spanZ));
                n++;
                this.__activeObj(e[n], new Laya.Vector3(r[3], 1.5, this.__spanZ));
                n++;
                for (a = 0; a < 4; a++) {
                    this.__activeObj(e[n], new Laya.Vector3(r[a], 2.5, this.__spanZ));
                    n++;
                }
                break;
            case FOURBOX.THREEFLOOR2:
                for (var s = 0; s < 2; s++)
                    for (a = 0; a < 4; a++) {
                        this.__activeObj(e[n], new Laya.Vector3(r[a], 1 * (s + 1.5), this.__spanZ));
                        n++;
                    }
                break;
            case FOURBOX.THREEFLOOR3:
                for (a = 1; a < 4; a++) {
                    this.__activeObj(e[n], new Laya.Vector3(a - 2, 1.5, this.__spanZ));
                    n++;
                }
                this.__activeObj(e[n], new Laya.Vector3(0, 2.5, this.__spanZ));
                n++;
                break;
            default:
                console.log("fourbox not");
        }
    }

    __activeObj(t: Laya.MeshSprite3D, e: Laya.Vector3) {
        t.active = true;
        t.transform.localPosition = e;
        var i: Laya.Component3D = t.getComponentByType(Laya.BoxCollider);
        if (i) {
            i.enable = true;
        }
    }

    hide() {
        if (this.__active) {
            this.__active = false;
            for (var t: number = 0; t < this.__objs.length; t++) {
                var e: Laya.MeshSprite3D = this.__objs[t];
                e.active = this.__active;
                var i: Laya.Component3D = e.getComponentByType(Laya.BoxCollider);
                if (i) {
                    i.enable = this.__active;
                }
            }
            this.__objs = [];
        }
    }
}

