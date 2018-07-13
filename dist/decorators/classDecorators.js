"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IonicStyle_1 = require("../model/IonicStyle");
require("reflect-metadata");
const NormalStyle_1 = require("../model/NormalStyle");
function List(target) {
    target.prototype[':ngFor'] = true;
}
exports.List = List;
function FormGroup(target) {
    target.prototype[':formGroup'] = true;
}
exports.FormGroup = FormGroup;
function Selector(selector) {
    return (target) => {
        target.prototype[':selector'] = selector;
    };
}
exports.Selector = Selector;
function Ionic(target) {
    target.prototype[':ionic'] = true;
    target.prototype[':styleClass'] = new IonicStyle_1.IonicStyle();
}
exports.Ionic = Ionic;
function Angular(target) {
    target.prototype['angular'] = true;
}
exports.Angular = Angular;
function Normal(target) {
    target.prototype['normal'] = true;
    target.prototype[':styleClass'] = new NormalStyle_1.NormalStyle();
}
exports.Normal = Normal;
function Module(target) {
    target.prototype[':generateModule'] = true;
}
exports.Module = Module;
function IonicPage(configObj) {
    return (target) => {
        target.prototype[':ionicPage'] = true;
        let configObjString = "";
        if (configObj && typeof configObj == "object") {
            configObjString = "{";
            for (let prop of Object.keys(configObj)) {
                configObjString += `\n\t${prop}: '${configObj[prop]}',`;
            }
            configObjString = configObjString.substring(0, configObjString.length - 1) + "\n}";
        }
        target.prototype[':classPrefix'] = "\n\n@IonicPage(" + configObjString + ")";
    };
}
exports.IonicPage = IonicPage;
