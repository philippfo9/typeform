"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const main_1 = require("../main");
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
                    "\n\t\t\t<:button class='standardBtn' (click)='add" + classTitle + "()'>Add " + classTitle + "</button>" +
                    "\n\t\t</:row>" : "");
    }
    ending(formGroupActivated, listActivated) {
        return ((formGroupActivated && listActivated) ? "\n\t\t\t</div>" : "") +
            "\n\t\t</:row>" +
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
    generateModule(classTitle) {
        return this.generateModuleHelper(classTitle, "", "", "", "");
    }
    generateModuleHelper(classTitle, imports, declarations, exports, providers) {
        let componentName = classTitle + "Component";
        let moduleName = componentName + "Module";
        let output = "import { NgModule } from '@angular/core';" +
            "\nimport {CommonModule} from '@angular/common';" +
            `\nimport {${componentName}} from "./${classTitle.toLowerCase()}";`;
        output += "\n\n" +
            "@NgModule({" +
            "\n\tdeclarations: " +
            `[ \n\t\t${componentName} ${declarations} \n\t],` +
            "\n\timports: " +
            "[ \n\t\tCommonModule" + imports + "\n\t]," +
            "\n\texports: " +
            "[" + exports + "]," +
            "\n\tproviders: " +
            "[" + providers + "]" +
            "\n})" +
            `\nexport class ${moduleName} {}`;
        return output;
    }
    acceptBtn(className) {
        return main_1.start + '\t\t\t<:button class="standardBtn updateBtn" (click)="update' + className + '(' + className.toLowerCase() + ')">' +
            main_1.start + '\t\t\t\tSpeichern' +
            main_1.start + '\t\t\t</:button>';
    }
    closeBtn(className) {
        return main_1.start + '\t\t\t<:button class="cancelChangeBtn standardBtn" (click)="cancelChange(' + className.toLowerCase() + ')">' +
            main_1.start + '\t\t\t\tClose' +
            main_1.start + '\t\t\t</:button>';
    }
    constructor() { }
}
exports.BaseStyle = BaseStyle;
