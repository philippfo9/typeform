import {replaceAll, tagsToReplace} from "../utils/utils";
import {start} from "../main";

export class BaseStyle {
    prefix: string;
    beginning(classTitle: string, formGroupActivated: boolean, formGroupName: string): any {
            return "<:content>" +
                ((formGroupActivated)?"\n\t<form [formGroup]='"+formGroupName+"'>":"")+
                "\n\t<:grid>" +
                "\n\t\t<:row class='headlineRow'>" +
                "\n\t\t\t<:title>" + classTitle + "</:title>" +
                "\n\t\t</:row>";
    }

    ending(formGroupActivated: boolean, listActivated: boolean): any {
            return ((formGroupActivated && listActivated) ? "\n\t\t\t</div>":"")+
                "\n\t\t</:row>" +
                "\n\t</:grid>" +
                (formGroupActivated ? "\n\t</form>" : "") +
                "\n</:content>";
    }

    replace(htmlOutput: string): string {
        return htmlOutput;
    }

    replaceTags(htmlOutput: string, regexStr: string) {
        tagsToReplace.forEach(tagToReplace => {
            let replaceText = regexStr.replace(":tagToReplace", tagToReplace);
            htmlOutput = replaceAll(htmlOutput,":"+tagToReplace, replaceText);
        });
        return htmlOutput;
    }

    generateModule(classTitle: string): string {
        return this.generateModuleHelper(classTitle, "", "", "", "");
    }

    generateModuleHelper(classTitle: string, imports: string, declarations: string,
                         exports: string, providers: string): string {
        let componentName = classTitle+"Component";
        let moduleName = componentName+"Module";
        let output =    "import { NgModule } from '@angular/core';"+
            "\nimport {CommonModule} from '@angular/common';"+
            `\nimport {${componentName}} from "./${classTitle.toLowerCase()}";`;

        output += "\n\n"+
                    "@NgModule({"+
                        "\n\tdeclarations: "+
                        `[ \n\t\t${componentName} ${declarations} \n\t],`+
                        "\n\timports: "+
                        "[ \n\t\tCommonModule"+ imports + "\n\t]," +
                        "\n\texports: "+
                        "["+ exports+ "],"+
                        "\n\tproviders: "+
                        "["+ providers + "]"+
                    "\n})"+
                    `\nexport class ${moduleName} {}`;

        return output;
    }

    acceptBtn(className: string, acceptText: string): string {
        return start+'\t\t\t<:button class="standardBtn updateBtn" (click)="update'+className+'('+className.toLowerCase()+')">'+
            start+'\t\t\t\t'+acceptText+
            start+'\t\t\t</:button>';
    }

    closeBtn(className: string, closeText: string): string {
        return start+'\t\t\t<:button class="cancelChangeBtn standardBtn" (click)="cancelChange('+className.toLowerCase()+')">'+
        start+'\t\t\t\t'+closeText+
        start+'\t\t\t</:button>';
    }

    constructor() {}
}
