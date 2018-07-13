"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class BaseStyle {
    beginning(classTitle, listActivated, formGroupActivated, formGroupName) {
        return "<:content>" +
            ((formGroupActivated) ? "\n\t<form [formGroup]='" + formGroupName + "'>" : "") +
            "\n\t<:grid>" +
            "\n\t\t<:row class='headlineRow'>" +
            "\n\t\t\t<:title>" + classTitle + "</:title>" +
            "\n\t\t</:row>" +
            ((listActivated) ?
                "\n\t\t<:row class='addElementRow'>" +
                    "\n\t\t\t<:button class='standardBtn' (click)='add" + classTitle + "()'>" + classTitle + " hinzufügen</button>" +
                    "\n\t\t</:row>" : "");
    }
    ending(formGroupActivated, listActivated) {
        return ((formGroupActivated && listActivated) ? "\n\t\t\t</div>" : "") +
            "\n\t\t<:row>" +
            "\n\t</:grid>" +
            (formGroupActivated ? "\n\t</form>" : "") +
            "\n</:content>";
    }
    replace(htmlOutput) {
        return htmlOutput;
    }
    replaceTags(htmlOutput, regexStr) {
        utils_1.tagsToReplace.forEach(tagToReplace => {
            let replaceText = regexStr.replace(":tagToReplace", tagToReplace);
            htmlOutput = utils_1.replaceAll(htmlOutput, ":" + tagToReplace, replaceText);
        });
        return htmlOutput;
    }
    constructor() { }
}
exports.BaseStyle = BaseStyle;
