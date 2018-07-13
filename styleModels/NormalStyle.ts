import {BaseStyle} from "./BaseStyle";
import {mapClassTags, normalTags, replaceAll, tagsToReplace} from "../utils/utils";

export class NormalStyle extends BaseStyle {
    constructor() {
        super();
    }

    replace(htmlOutput: string): string {
        tagsToReplace.forEach(tagToReplace => {
            if(normalTags.includes(tagToReplace)) {
                htmlOutput = replaceAll(htmlOutput, ":"+tagToReplace, tagToReplace);
            }
        });
        htmlOutput = replaceAll(htmlOutput,":tag-datetime", "input");
        htmlOutput = replaceAll(htmlOutput,":date", "input type='date'");
        htmlOutput = replaceAll(htmlOutput,":time", "input type='time'");
        htmlOutput = replaceAll(htmlOutput,":checkbox", "input type='checkbox'");
        htmlOutput = super.replaceTags(htmlOutput, "div class=':tagToReplace'");
        return mapClassTags(htmlOutput);
    }
}