import {IonicStyle} from "../model/IonicStyle";
import "reflect-metadata";
import {NormalStyle} from "../model/NormalStyle";

export function List(target: any) {
    target.prototype[':ngFor'] = true;
}

export function FormGroup(target: any) {
    target.prototype[':formGroup'] = true;
}

export function Selector(selector: string) {
    return (target: any) => {
        target.prototype[':selector'] = selector;
    }
}

export function Ionic(target: any) {
    target.prototype[':ionic'] = true;
    target.prototype[':styleClass'] = new IonicStyle();
}

export function Angular(target: any) {
    target.prototype['angular'] = true;
}

export function Normal(target: any) {
    target.prototype['normal'] = true;
    target.prototype[':styleClass'] = new NormalStyle();
}

export function Module(target: any) {
    target.prototype[':generateModule'] = true;
}

export function IonicPage(configObj?: any) {
    return (target: any) => {
        target.prototype[':ionicPage'] = true;
        let configObjString = "";
        if(configObj && typeof configObj == "object") {
            configObjString = "{";
            for(let prop of Object.keys(configObj)) {
                configObjString += `\n\t${prop}: '${configObj[prop]}',`
            }
            configObjString = configObjString.substring(0, configObjString.length-1) + "\n}";
        }
        target.prototype[':classPrefix'] = "\n\n@IonicPage("+ configObjString +")";
    };
}

