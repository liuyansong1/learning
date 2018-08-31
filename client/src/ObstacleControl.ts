/*
* name;
*/
class ObstacleControl {
    __active: boolean;
    constructor() {
        this.__active = false;
    }

    get active():boolean {
        return this.__active;
    }

    update(t:number) { }
    reset(t:Object) { }
    hide() { }
}
