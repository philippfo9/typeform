

import {BaseStyle} from "./BaseStyle";
import {preAppendix, replaceAll} from "../utils/utils";
import {start} from "../main";

export class IonicStyle extends BaseStyle {

    replace(htmlOutput: string): string {
            htmlOutput = replaceAll(htmlOutput,":tag-datetime", "ion-datetime");
            htmlOutput = replaceAll(htmlOutput,":button", "button ion-button");
            htmlOutput = replaceAll(htmlOutput,":date", "ion-datetime displayFormat='DD.MMM.YYYY'");
            htmlOutput = replaceAll(htmlOutput,":time", "ion-datetime displayFormat='HH:mm'");
            return super.replaceTags(htmlOutput, "ion-:tagToReplace");
    }

    generateModule(classTitle: string): string {
        return super.generateModule(classTitle);
    }

    generatePageModule(classTitle: string) {
        let pageModuleImport = "import { IonicPageModule } from 'ionic-angular';\n";
        let imports = `,\n\t\tIonicPageModule.forChild(${classTitle}Component)`;
        return preAppendix(super.generateModuleHelper(classTitle, imports, "", "", ""), pageModuleImport);
    }

    acceptBtn(className: string): string {
        return start+'\t\t\t<button ion-button icon-only class="standardBtn updateBtn" (click)="update'+className+'('+className.toLowerCase()+')">'+
        start+'\t\t\t\t<ion-icon name="checkmark-circle"></ion-icon>'+
        start+'\t\t\t</button>';
    }

    closeBtn(className: string): string {
        return start+'\t\t\t<button ion-button icon-only class="cancelChangeBtn standardBtn" (click)="cancelChange('+className.toLowerCase()+')">'+
        start+'\t\t\t\t<ion-icon name="close-circle"></ion-icon>'+
        start+'\t\t\t</button>';
    }

    constructor() {
        super();
    }
}