import "reflect-metadata";
export function ionicBeginning(classTitle: string): string {
    return "<ion-content>" +
    "\n\t<ion-grid>" +
    "\n\t\t<ion-row class='headlineRow'>" +
    "\n\t\t\t<ion-title>" + classTitle + "</ion-title>" +
    "\n\t\t</ion-row>" +
    "\n\t\t<ion-row class='headlineRow'>" +
    "\n\t\t\t<button ion-button class='standardBtn' (click)='add" + classTitle + "()'>" + classTitle + " hinzufügen</button>" +
    "\n\t\t</ion-row>";
}

export function ionicEnding() {
    return "\n\t\t</ion-row>" +
        "\n\t</ion-grid>"+
    "\n</ion-content>"
}

export function angularBeginning(classTitle: string): string {
    return "";
}

export function replaceAll(target: string, search: string, replacement: string): string {
    return target.replace(new RegExp(search, 'g'), replacement);
}

export function getTypeFromTarget(target: any, key: string): string {
    let value = new (Reflect.getMetadata("design:type", target, key))();
    return getType(value);
}

export function getType(value: any): string {
    let type = typeof value;
    if (type === 'object') {
        return value ? value.constructor.name : 'null';
    }
    return type;
}


export function preAppendix(transformStr: string, preText: string): string {
    if(transformStr) {
        transformStr =
            preText +
            transformStr;
    } else {
        transformStr = preText;
    }
    return transformStr;
}

export function appendix(transformStr: string, appendText: string): string {
    if(transformStr) {
        transformStr =
            transformStr + appendText;
    } else {
        transformStr = appendText;
    }
    return transformStr;
}


export function generatePlural(word: string): string {
    return word+((word[word.length-1] == 's')?"es": "s");
}


let tagsToReplace = ['row', 'col','button','input','label','select','option','checkbox', 'title', 'date', 'time'];
export {tagsToReplace};