"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IBaseStyleClass_1 = require("./IBaseStyleClass");
const utils_1 = require("../../decorators/utils/utils");
const utils_2 = require("../utils/utils");
class IonicStyle extends IBaseStyleClass_1.BaseStyle {
    replace(htmlOutput) {
        replace(htmlOutput, string);
        string;
        {
            utils_1.tagsToReplace.forEach(tagToReplace => {
                let replaceText = "ion-" + tagToReplace;
                if (tagToReplace == "button")
                    replaceText = "button ion-button";
                else if (tagToReplace == "date")
                    replaceText = "ion-datetime displayFormat='DD.MMM.YYYY'";
                else if (tagToReplace == "time")
                    replaceText = "ion-datetime displayFormat='HH:mm'";
                htmlOutput = utils_2.replaceAll(htmlOutput, ":" + tagToReplace, replaceText);
            });
            htmlOutput = utils_2.replaceAll(htmlOutput, ":tag-datetime", "ion-datetime");
            return htmlOutput;
        }
    }
}
exports.IonicStyle = IonicStyle;
