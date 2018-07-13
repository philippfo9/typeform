"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function replaceAll(target, search, replacement) {
    target = target.replace(new RegExp("<" + search, 'g'), "<" + replacement);
    target = target.replace(new RegExp("</" + search, 'g'), "</" + replacement.split(' ')[0]);
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
function generateStandardTsOutput(classTitle, selector, classPrefix, templateUrl) {
    let imports = "import { Component } from '@angular/core';";
    let decorator = ((classPrefix) ? classPrefix : "") +
        "\n@Component({\n" +
        "\tselector: '" + selector + "',\n" +
        "\ttemplateUrl: '" + templateUrl + "',\n" +
        "})";
    let tsClass = "\nexport class " + classTitle + "Component {";
    return imports + decorator + tsClass;
}
exports.generateStandardTsOutput = generateStandardTsOutput;
function generateFormGroupDefinitions(classToGenerate) {
    let formGroupDefinitions = "";
    for (let prop of Object.keys(classToGenerate)) {
        if (!prop.includes(":") && prop != "id") {
            let required = classToGenerate[":" + prop + "-required"];
            let type = getType(classToGenerate[prop]);
            formGroupDefinitions += `\n\t\t\t${prop}: [${(type == 'Array') ? "[]" : "''"}, Validators.compose([${(required) ? "Validators.required" : ""}])],`;
        }
    }
    return formGroupDefinitions;
}
exports.generateFormGroupDefinitions = generateFormGroupDefinitions;
function mapClassTags(strInput) {
    let outputStr = "";
    strInput.split("\n").map(line => {
        if (line.includes("class")) {
            let classStr = "";
            let amountOfClass = 0;
            line.split(' ').forEach(textPiece => {
                if (textPiece.includes("class")) {
                    amountOfClass++;
                    let len = textPiece.length - 1;
                    if (textPiece.includes(">"))
                        len--;
                    let className = textPiece.substring(7, len);
                    classStr += (classStr == "") ? className : " " + className;
                }
            });
            if (amountOfClass >= 2) {
                let regex = new RegExp(/class='[a-zA-Z0-9:;\.\s\(\)\-\,]*'/g);
                line = line.replace(regex, "");
                line = line.substring(0, line.length - 1) + "class='" + classStr + "'" + ">";
            }
        }
        outputStr += line + "\n";
    });
    return outputStr;
}
exports.mapClassTags = mapClassTags;
function removeDisabledAttributes(strInput, lwcClassTitle) {
    let search = "\\[disabled\\]='" + lwcClassTitle + ".changeActivated'".trim();
    return replaceAll(strInput, search, "");
}
exports.removeDisabledAttributes = removeDisabledAttributes;
function removeFormControlNameAttributes(strInput) {
    let search = "formControlName='[a-zA-Z0-9:;\.\s\(\)\-\,]*'";
    return replaceAll(strInput, search, "");
}
exports.removeFormControlNameAttributes = removeFormControlNameAttributes;
function createAddElementFunction(className, pluralClassTitle, classToGenerate, formGroupActivated) {
    let methodName = "add" + className;
    if (formGroupActivated) {
        return "\n\n\tcreateElement() {" +
            "\n\t\treturn this.formBuilder.group({" +
            generateFormGroupDefinitions(classToGenerate) +
            "\n\t\t});" +
            "\n\t}" +
            "\n\n\t" + methodName + "() {" +
            `\n\t\tthis.${pluralClassTitle} = this.${className}Form.get('${pluralClassTitle}') as FormArray;` +
            `\n\t\tthis.${pluralClassTitle}.push(this.createElement());` +
            "\n\t}";
    }
    else {
        return "\n\n\t" + methodName + "() {" +
            "\n\t\tthis." + pluralClassTitle + ".push(new " + className + "());" +
            "\n\t}\n";
    }
}
exports.createAddElementFunction = createAddElementFunction;
function createRemoveElementFunction(className, pluralClassTitle, formGroupActivated) {
    let methodName = "remove" + className;
    if (formGroupActivated) {
        return `\n\t${methodName}(index: number){` +
            `\n\t\tthis.${pluralClassTitle} = this.${className}Form.get('${pluralClassTitle}') as FormArray;` +
            `\n\t\t(<FormArray>this.${pluralClassTitle}).removeAt(index);` +
            `\n\t}\n`;
    }
    else {
        return `\n\t${methodName}(${className.toLowerCase()}: ${className}) {` +
            `\n\t\tthis.${pluralClassTitle} = this.${pluralClassTitle}.filter(e => {` +
            `\n\t\t\treturn e != ${className.toLowerCase()}` +
            `\n\t\t});\n\t}\n`;
    }
}
exports.createRemoveElementFunction = createRemoveElementFunction;
function createUpdateElementFunction(className) {
    let methodName = "update" + className;
    let lwcClassTitle = className.toLowerCase();
    return `\n\t${methodName}(${lwcClassTitle}){` +
        `\n\t\t${lwcClassTitle}.changeActivated = false;` +
        `\n\t\tif(${lwcClassTitle}.hasOwnProperty('id')) {` +
        `\n\t\t\t// update/put` +
        `\n\t\t} else {` +
        `\n\t\t\t// post & set id if successful` +
        `\n\t\t}\n\t}\n`;
}
exports.createUpdateElementFunction = createUpdateElementFunction;
function createEnableChangeFunction(lwcClassTitle) {
    return `\n\tenableChange(${lwcClassTitle}) {` +
        `\n\t\t${lwcClassTitle}.backup = JSON.parse(JSON.stringify(${lwcClassTitle}));` +
        `\n\t\t${lwcClassTitle}.changeActivated = true;` +
        `\n\t}\n`;
}
exports.createEnableChangeFunction = createEnableChangeFunction;
function createCancelChangeFunction(className) {
    let lwcClassTitle = className.toLowerCase();
    return "\n\tcancelChange(" + lwcClassTitle + ") {\n" +
        "\t\tif(" + lwcClassTitle + ".hasOwnProperty('id')) {\n" +
        "\t\t\tfor(let prop in Object.keys(" + lwcClassTitle + ")) {\n" +
        "\t\t\t\tif(" + lwcClassTitle + ".hasOwnProperty(prop)) {\n" +
        "\t\t\t\t\tfor(let backupProp in Object.keys(" + lwcClassTitle + ".backup)) {\n" +
        "\t\t\t\t\t\tif(" + lwcClassTitle + ".backup.hasOwnProperty(backupProp)) {\n" +
        "\t\t\t\t\t\t\tif(prop == backupProp) {\n" +
        "\t\t\t\t\t\t\t\t" + lwcClassTitle + "[prop] = " + lwcClassTitle + ".backup[backupProp];\n" +
        "\t\t\t\t\t\t\t}\n" +
        "\t\t\t\t\t\t}\n" +
        "\t\t\t\t\t}\n" +
        "\t\t\t\t}\n" +
        "\t\t\t\t" + lwcClassTitle + ".changeActivated = false;\n" +
        "\t\t\t}\n" +
        "\t\t} else {\n" +
        "\t\t\tthis.remove" + className + "(" + lwcClassTitle + ");\n" +
        "\t\t}\n" +
        "\t}\n";
}
exports.createCancelChangeFunction = createCancelChangeFunction;
let tagsToReplace = ['content', 'grid', 'row', 'col', 'button', 'input', 'label', 'select', 'option', 'checkbox', 'title', 'date', 'time'];
exports.tagsToReplace = tagsToReplace;
let normalTags = ['button', 'input', 'label', 'select', 'option'];
exports.normalTags = normalTags;
