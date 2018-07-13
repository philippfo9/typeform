"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
require("reflect-metadata");
const start = "\n\t\t\t\t\t";
function Title(target, key) {
    let preText = "\n\t\t\t\t<:col col-12>" +
        start + "<:title text-center>{{" + target.constructor.name.toLowerCase() + "." + key + "}}</:title>" +
        "\n\t\t\t\t</:col>";
    target[':html-output'] = utils_1.preAppendix(target[':html-output'], preText);
}
exports.Title = Title;
function ArrayType(type) {
    function actualTypeDecorator(target, key) {
        //declare type for the array
        target[key + "-type"] = utils_1.getType(new type()).toLowerCase();
    }
    return actualTypeDecorator;
}
exports.ArrayType = ArrayType;
function OnlyVisibleInEditMode(target, key) {
    target[":" + key + "-EditMode"] = true;
}
exports.OnlyVisibleInEditMode = OnlyVisibleInEditMode;
function Relation(valueProperty, displayProperty) {
    function actualRelationDecorator(target, key) {
        //declare specifier and display for the relation
        target[':' + key + "-specifier"] = valueProperty;
        target[':' + key + "-display"] = displayProperty;
    }
    return actualRelationDecorator;
}
exports.Relation = Relation;
function Required(target, key) {
    target[':' + key + "-required"] = true;
}
exports.Required = Required;
function Col(cols, centered, label, placeholder) {
    function actualColDecorator(target, key) {
        let className = target.constructor.name.toLowerCase();
        //ngIf (if edit mode is activated)
        let OnlyVisibleInEditMode = target[":" + key + "-EditMode"];
        let ngIfEditMode = (OnlyVisibleInEditMode) ? `*ngIf='${className}.changeActivated '` : "";
        let preText = "\n\t\t\t\t<:col col-" + cols + " " + ((centered) ? "class='centeredContent' " : "") + ngIfEditMode + ">";
        target[':' + key + '-html-output'] = utils_1.preAppendix(target[':' + key + '-html-output'], preText);
        if (label && label != "")
            target[':' + key + '-html-output'] += start + `<:label text-center>${label}</:label>`;
        let ngModel = `[(ngModel)]='${className}.${key}'`;
        //disabled
        let disabled = `[disabled]='!${className}.changeActivated'`;
        //placeholder
        let placeholderText = ((placeholder) ? `placeholder='${placeholder}'` : "");
        //formControlName
        let formControlName = `formControlName='${key}'`;
        //input placeholder text
        let inpText = start + `<:input type='inputType' ${ngModel} ${formControlName} ${placeholderText} ${disabled}></:input>`;
        //type of target[key]
        let typeOfVar = utils_1.getTypeFromTarget(target, key);
        switch (typeOfVar) {
            case "String": {
                inpText = utils_1.replaceAll(inpText, "inputType", "text");
                target[':' + key + "-html-output"] += inpText;
                break;
            }
            case "Number": {
                inpText = utils_1.replaceAll(inpText, "inputType", "number");
                target[':' + key + "-html-output"] += inpText;
                break;
            }
            case "Boolean": {
                target[':' + key + "-html-output"] += start + `<:checkbox ${formControlName} ${ngModel} ${disabled}></:checkbox>`;
                break;
            }
            case "Array": {
                let type = target[key + "-type"];
                let relationClassTitle = type.toLowerCase();
                if (!type)
                    throw new Error("You need to specify the @ArrayType annotation for an array");
                target[':' + key + "-html-output"] +=
                    createSelectText(relationClassTitle, target, key, "multiple='true'", ngModel, formControlName, disabled, placeholderText);
                break;
            }
            case "Date": {
                target[':' + key + "-html-output"] += start + `<:date ${formControlName} ${ngModel}></:tag-datetime>`;
                break;
            }
            default: {
                let relationClassTitle = typeOfVar.toLowerCase();
                target[':' + key + "-html-output"] +=
                    createSelectText(relationClassTitle, target, key, "", ngModel, formControlName, disabled, placeholderText);
                break;
            }
        }
        target[':' + key + "-html-output"] += "\n\t\t\t\t</:col>";
        target[':html-output'] = utils_1.appendix(target[':html-output'], target[':' + key + "-html-output"]);
    }
    return actualColDecorator;
}
exports.Col = Col;
function createSelectText(relationClassTitle, target, key, multiple, ngModel, formControlName, disabled, placeholderText) {
    if (!target[':' + key + '-specifier'] || !target[':' + key + '-display'])
        throw new Error("You need to specify the relation between the two entities with the @Relation annotation");
    let selectText = start + `<:select ${ngModel} ${formControlName} ${placeholderText} ${disabled} ${multiple}>` +
        start + `\t<:option *ngFor='let ${relationClassTitle} of ${utils_1.generatePlural(relationClassTitle)}' ` +
        `[value]='${relationClassTitle}.${target[':' + key + '-specifier']}'>` +
        `{{ ${relationClassTitle}.${target[':' + key + '-display']} }}</:option>` +
        start + `</:select>`;
    return selectText;
}
