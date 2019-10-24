"use strict";
exports.__esModule = true;
var Char = /** @class */ (function () {
    function Char(char) {
        this.setValue(char);
    }
    Object.defineProperty(Char.prototype, "getValue", {
        get: function () {
            return String.fromCharCode(this._value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Char.prototype, "setValue", {
        set: function (char) {
            if (typeof char === "number") {
                this._value = char;
            }
            else {
                this._value = char.charCodeAt(0);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Char;
}());
exports["default"] = Char;
