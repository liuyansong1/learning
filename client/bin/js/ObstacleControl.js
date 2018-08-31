/*
* name;
*/
var ObstacleControl = /** @class */ (function () {
    function ObstacleControl() {
        this.__active = false;
    }
    Object.defineProperty(ObstacleControl.prototype, "active", {
        get: function () {
            return this.__active;
        },
        enumerable: true,
        configurable: true
    });
    ObstacleControl.prototype.update = function (t) { };
    ObstacleControl.prototype.reset = function (t) { };
    ObstacleControl.prototype.hide = function () { };
    return ObstacleControl;
}());
//# sourceMappingURL=ObstacleControl.js.map