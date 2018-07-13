"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseStyle_1 = require("./BaseStyle");
const utils_1 = require("../utils/utils");
const main_1 = require("../main");
class IonicStyle extends BaseStyle_1.BaseStyle {
    replace(htmlOutput) {
        htmlOutput = utils_1.replaceAll(htmlOutput, ":tag-datetime", "ion-datetime");
        htmlOutput = utils_1.replaceAll(htmlOutput, ":button", "button ion-button");
        htmlOutput = utils_1.replaceAll(htmlOutput, ":date", "ion-datetime displayFormat='DD.MMM.YYYY'");
        htmlOutput = utils_1.replaceAll(htmlOutput, ":time", "ion-datetime displayFormat='HH:mm'");
        return super.replaceTags(htmlOutput, "ion-:tagToReplace");
    }
    generateModule(classTitle) {
        return super.generateModule(classTitle);
    }
    generatePageModule(classTitle) {
        let pageModuleImport = "import { IonicPageModule } from 'ionic-angular';\n";
        let imports = `,\n\t\tIonicPageModule.forChild(${classTitle}Component)`;
        return utils_1.preAppendix(super.generateModuleHelper(classTitle, imports, "", "", ""), pageModuleImport);
    }
    acceptBtn(className) {
        return main_1.start + '\t\t\t<button ion-button icon-only class="standardBtn updateBtn" (click)="update' + className + '(' + className.toLowerCase() + ')">' +
            main_1.start + '\t\t\t\t<ion-icon name="checkmark-circle"></ion-icon>' +
            main_1.start + '\t\t\t</button>';
    }
    closeBtn(className) {
        return main_1.start + '\t\t\t<button ion-button icon-only class="cancelChangeBtn standardBtn" (click)="cancelChange(' + className.toLowerCase() + ')">' +
            main_1.start + '\t\t\t\t<ion-icon name="close-circle"></ion-icon>' +
            main_1.start + '\t\t\t</button>';
    }
    constructor() {
        super();
    }
}
exports.IonicStyle = IonicStyle;
