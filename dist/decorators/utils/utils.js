"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function ionicBeginning(classTitle) {
    return "<ion-content>" +
        "\n\t<ion-grid>" +
        "\n\t\t<ion-row class='headlineRow'>" +
        "\n\t\t\t<ion-title>" + classTitle + "</ion-title>" +
        "\n\t\t</ion-row>" +
        "\n\t\t<ion-row class='headlineRow'>" +
        "\n\t\t\t<button ion-button class='standardBtn' (click)='add" + classTitle + "()'>" + classTitle + " hinzufügen</button>" +
        "\n\t\t</ion-row>";
}
exports.ionicBeginning = ionicBeginning;
function ionicEnding() {
    return "\n\t\t</ion-row>" +
        "\n\t</ion-grid>" +
        "\n</ion-content>";
}
exports.ionicEnding = ionicEnding;
function angularBeginning(classTitle) {
    return "";
}
exports.angularBeginning = angularBeginning;
function replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
}
exports.replaceAll = replaceAll;
function getTypeFromTarget(target, key) {
    let value = new (Reflect.getMetadata("design:type", target, key))();
    return getType(value);
}
exports.getTypeFromTarget = getTypeFromTarget;
function getType(value) {
    let type = typeof value;
    if (type === 'object') {
        return value ? value.constructor.name : 'null';
    }
    return type;
}
exports.getType = getType;
function preAppendix(transformStr, preText) {
    if (transformStr) {
        transformStr =
            preText +
                transformStr;
    }
    else {
        transformStr = preText;
    }
    return transformStr;
}
exports.preAppendix = preAppendix;
function appendix(transformStr, appendText) {
    if (transformStr) {
        transformStr =
            transformStr + appendText;
    }
    else {
        transformStr = appendText;
    }
    return transformStr;
}
exports.appendix = appendix;
function generatePlural(word) {
    return word + ((word[word.length - 1] == 's') ? "es" : "s");
}
exports.generatePlural = generatePlural;
let tagsToReplace = ['row', 'col', 'button', 'input', 'label', 'select', 'option', 'checkbox', 'title', 'date', 'time'];
exports.tagsToReplace = tagsToReplace;
