import "reflect-metadata";

export function replaceAll(target: string, search: string, replacement: string): string {
    target = target.replace(new RegExp("<"+search, 'g'), "<"+replacement);
    target = target.replace(new RegExp("</"+search, 'g'), "</"+replacement.split(' ')[0]);
    return target.replace(new RegExp(search, 'g'), replacement);
}

export function getTypeFromTarget(target: any, key: string): string {
    let value = new (Reflect.getMetadata("design:type", target, key))();
    return getType(value);
}

export function getType(value: any): string {
    let type = typeof value;
    if (type === 'object') {
        return value ? value.constructor.name : 'null';
    }
    return type;
}


export function preAppendix(transformStr: string, preText: string): string {
    if(transformStr) {
        transformStr =
            preText +
            transformStr;
    } else {
        transformStr = preText;
    }
    return transformStr;
}

export function appendix(transformStr: string, appendText: string): string {
    if(transformStr) {
        transformStr =
            transformStr + appendText;
    } else {
        transformStr = appendText;
    }
    return transformStr;
}


export function generatePlural(word: string): string {
    return word+((word[word.length-1] == 's')?"es": "s");
}

export function generateStandardTsOutput(classTitle, selector, classPrefix, templateUrl): string {
    let imports = "import { Component } from '@angular/core';";
    let decorator =
        ((classPrefix)?classPrefix:"")+
        "\n@Component({\n" +
        "\tselector: '"+selector+"',\n" +
        "\ttemplateUrl: '"+templateUrl+"',\n" +
        "})";
    let tsClass =   "\nexport class "+classTitle+"Component {";
    return imports+decorator+tsClass;
}

export function generateFormGroupDefinitions(classToGenerate: object) {
    let formGroupDefinitions = "";
    for(let prop of Object.keys(classToGenerate)) {
        if(!prop.includes(":") && prop != "id") {
            let required = classToGenerate[":"+prop+"-required"];
            let type = getType(classToGenerate[prop]);
            formGroupDefinitions += `\n\t\t\t${prop}: [${(type=='Array')?"[]":"''"}, Validators.compose([${(required)?"Validators.required":""}])],`;
        }
    }
    return formGroupDefinitions;
}

export function mapClassTags(strInput: string) {
    let outputStr = "";
    strInput.split("\n").map(line => {
        if(line.includes("class")) {
            let classStr = "";
            let amountOfClass = 0;
            line.split(' ').forEach(textPiece => {
                if(textPiece.includes("class")) {
                    amountOfClass++;
                    let len = textPiece.length-1;
                    if(textPiece.includes(">"))len--;
                    let className = textPiece.substring(7, len);
                    classStr += (classStr=="")?className:" "+className;
                }
            });
            if(amountOfClass >= 2) {
                let regex = new RegExp(/class='[a-zA-Z0-9:;\.\s\(\)\-\,]*'/g);
                line = line.replace(regex, "");
                line = line.substring(0, line.length-1) + "class='"+classStr+"'" + ">";
            }
        }
        outputStr += line+"\n";
    });
    return outputStr;
}

export function removeDisabledAttributes(strInput: string, lwcClassTitle) {
    let search = "\\[disabled\\]='"+lwcClassTitle+".changeActivated'".trim();
    return replaceAll(strInput, search, "");
}

export function removeFormControlNameAttributes(strInput: string) {
    let search = "formControlName='[a-zA-Z0-9:;\.\s\(\)\-\,]*'";
    return replaceAll(strInput, search, "");
}

export function createAddElementFunction(className: string, pluralClassTitle: string, classToGenerate: any, formGroupActivated: boolean) {
    let methodName = "add"+className;
    if(formGroupActivated) {
        return "\n\n\tcreateElement() {"+
            "\n\t\treturn this.formBuilder.group({"+
            generateFormGroupDefinitions(classToGenerate)+
            "\n\t\t});"+
            "\n\t}"+
            "\n\n\t"+methodName+"() {"+
            `\n\t\tthis.${pluralClassTitle} = this.${className}Form.get('${pluralClassTitle}') as FormArray;`+
            `\n\t\tthis.${pluralClassTitle}.push(this.createElement());`+
            "\n\t}";
    } else {
        return "\n\n\t"+methodName+"() {"+
            "\n\t\tthis."+pluralClassTitle+".push(new "+className+"());"+
            "\n\t}\n";
    }
}

export function createRemoveElementFunction(className: string, pluralClassTitle: string, formGroupActivated: boolean) {
    let methodName = "remove"+className;
    if(formGroupActivated) {
        return `\n\t${methodName}(index: number){`+
                `\n\t\tthis.${pluralClassTitle} = this.${className}Form.get('${pluralClassTitle}') as FormArray;`+
                `\n\t\t(<FormArray>this.${pluralClassTitle}).removeAt(index);`+
                `\n\t}\n`;
    } else {
        return  `\n\t${methodName}(${className.toLowerCase()}: ${className}) {`+
                `\n\t\tthis.${pluralClassTitle} = this.${pluralClassTitle}.filter(e => {`+
                `\n\t\t\treturn e != ${className.toLowerCase()}`+
                `\n\t\t});\n\t}\n`;
    }
}

export function createUpdateElementFunction(className: string) {
        let methodName = "update"+className;
        let lwcClassTitle = className.toLowerCase();
        return `\n\t${methodName}(${lwcClassTitle}){`+
                `\n\t\t${lwcClassTitle}.changeActivated = false;`+
                `\n\t\tif(${lwcClassTitle}.hasOwnProperty('id')) {`+
                `\n\t\t\t// update/put`+
                `\n\t\t} else {`+
                `\n\t\t\t// post & set id if successful` +
                `\n\t\t}\n\t}\n`;

}

export function createEnableChangeFunction(lwcClassTitle: string) {
    return `\n\tenableChange(${lwcClassTitle}) {`+
            `\n\t\t${lwcClassTitle}.backup = JSON.parse(JSON.stringify(${lwcClassTitle}));`+
            `\n\t\t${lwcClassTitle}.changeActivated = true;`+
            `\n\t}\n`;
}

export function createCancelChangeFunction(className: string) {
    let lwcClassTitle = className.toLowerCase();
    return "\n\tcancelChange("+lwcClassTitle+") {\n" +
            "\t\tif("+lwcClassTitle+".hasOwnProperty('id')) {\n" +
            "\t\t\tfor(let prop in Object.keys("+lwcClassTitle+")) {\n" +
            "\t\t\t\tif("+lwcClassTitle+".hasOwnProperty(prop)) {\n" +
            "\t\t\t\t\tfor(let backupProp in Object.keys("+lwcClassTitle+".backup)) {\n" +
            "\t\t\t\t\t\tif("+lwcClassTitle+".backup.hasOwnProperty(backupProp)) {\n" +
            "\t\t\t\t\t\t\tif(prop == backupProp) {\n" +
            "\t\t\t\t\t\t\t\t"+lwcClassTitle+"[prop] = "+lwcClassTitle+".backup[backupProp];\n" +
            "\t\t\t\t\t\t\t}\n" +
            "\t\t\t\t\t\t}\n" +
            "\t\t\t\t\t}\n" +
            "\t\t\t\t}\n" +
            "\t\t\t\t"+lwcClassTitle+".changeActivated = false;\n" +
            "\t\t\t}\n" +
            "\t\t} else {\n" +
            "\t\t\tthis.remove"+className+"("+lwcClassTitle+");\n" +
            "\t\t}\n" +
            "\t}\n";
}


let tagsToReplace = ['content','grid','row', 'col','button','input','label','select','option','checkbox', 'title', 'date', 'time'];
let normalTags = ['button', 'input', 'label', 'select', 'option'];
export {tagsToReplace, normalTags};