"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseStyle_1 = require("./BaseStyle");
const utils_1 = require("../utils/utils");
class NormalStyle extends BaseStyle_1.BaseStyle {
    constructor() {
        super();
    }
    replace(htmlOutput) {
        utils_1.tagsToReplace.forEach(tagToReplace => {
            if (utils_1.normalTags.includes(tagToReplace)) {
                htmlOutput = utils_1.replaceAll(htmlOutput, ":" + tagToReplace, tagToReplace);
            }
        });
        htmlOutput = utils_1.replaceAll(htmlOutput, ":tag-datetime", "input");
        htmlOutput = utils_1.replaceAll(htmlOutput, ":date", "input type='date'");
        htmlOutput = utils_1.replaceAll(htmlOutput, ":time", "input type='time'");
        htmlOutput = utils_1.replaceAll(htmlOutput, ":checkbox", "input type='checkbox'");
        htmlOutput = super.replaceTags(htmlOutput, "div class=':tagToReplace'");
        return utils_1.mapClassTags(htmlOutput);
    }
}
exports.NormalStyle = NormalStyle;
