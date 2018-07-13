import * as fs from 'fs';
import {
    createAddElementFunction, createCancelChangeFunction, createEnableChangeFunction, createRemoveElementFunction,
    createUpdateElementFunction,
    generateFormGroupDefinitions,
    generatePlural, generateStandardTsOutput,
    preAppendix, removeDisabledAttributes, removeFormControlNameAttributes
} from "./utils/utils";
import "reflect-metadata";
import {BaseStyle} from "./styleModels/BaseStyle";
import {IonicStyle} from "./styleModels/IonicStyle";
import {BasicLanguageStyle} from "./languageModels/basicLanguageStyle";

export const start = "\n\t\t\t\t";
let filePath = process.argv[2];
let className = "";
if(process.argv[3])
    className = process.argv[3];

generateFormComponent(filePath, className);

async function generateFormComponent(filePath, className) {
    console.log("starting generation ...");
    if(fs.existsSync(filePath+".ts")) {
        //dynamic import of file
        let file = await <any>import(filePath);
        let splitFilePathArr = filePath.split("/");
        let fileName = splitFilePathArr[splitFilePathArr.length-1];
        let pathTo = filePath.substring(0,filePath.length-fileName.length);

        if(className == "") {
            let fileSrc = fs.readFileSync(filePath+".ts").toString();
            className = fileSrc.substring(fileSrc.indexOf("export class") + "export class".length).split(' ')[1];
        }
        console.log("generating form component for class: " + className + " ...");
        let classToGenerate: any = new file[className]();
        let lwcClassTitle = className.toLowerCase();
        let pluralClassTitle = generatePlural(lwcClassTitle);
        let selector = (classToGenerate[':selector'])?classToGenerate[':selector']:lwcClassTitle+"-component";
        let listActivated = classToGenerate[':ngFor'];
        let styleClass: BaseStyle = classToGenerate[':styleClass'];
        let languageStyleClass: BasicLanguageStyle = classToGenerate[':languageStyle'];
        if(!styleClass)
            throw new Error("You have to define own class as style class through using a decorator like @Ionic");

        let formGroupActivated = classToGenerate[":formGroup"];
        let formGroupProperty = className+"Form";
        let formGroupDefinitions = "";

        let ngFor = "",
            formArrayDiv = "",
            editBtn = "",
            deleteBtn = "",
            actionBtns = "",
            addFunc = "",
            removeFunc = "",
            updateFunc = "",
            enableChangeFunc = "",
            cancelChangeFunc = "",
            propertyDefinitionType = "",
            propertyDefintionName = "",
            formGroup = "";

        if(listActivated) {
            propertyDefintionName = pluralClassTitle;
            if(formGroupActivated) {
                propertyDefinitionType = "any[] = []";
                ngFor = ` formArrayName='${pluralClassTitle}' *ngFor='let ${lwcClassTitle} of ${formGroupProperty}.get("${pluralClassTitle}").controls; let i = index'`;
                formGroupDefinitions+=`\n\t\t\t${pluralClassTitle}: [[]]`;
                formArrayDiv = `\n\t\t\t<div class='formWrapper' [formGroupName]='i'>`;
            } else {
                propertyDefinitionType = `${className}[] = []`;
                ngFor = ` *ngFor='let ${className.toLowerCase()} of ${pluralClassTitle}; let i = index'`;
            }

            editBtn = start+"<:col *ngIf='!"+lwcClassTitle+".changeActivated' col-2 class=\"centeredContent\">" +
                start+"\t<:button class='standardBtn editBtn' (click)='enableChange("+lwcClassTitle+")'>"+languageStyleClass.edit(className)+"</:button>" +
                start+"</:col>";
            deleteBtn = start+'<:col col-2 class="centeredContent">' +
                start+'\t<:button class="standardBtn deleteBtn" (click)="delete'+className+'('+((formGroupActivated)?"i":lwcClassTitle)+')">'+languageStyleClass.delete(className)+'</:button>' +
                start+'</:col>';
            actionBtns =
                start+'<:col class="centeredContent actionBtnsCol" col-2 *ngIf="'+lwcClassTitle+'.changeActivated">'+
                start+'\t<:row>'+
                start+'\t\t<:col col-6 class="centeredContent">'+
                styleClass.acceptBtn(className, languageStyleClass.save(className)) +
                start+'\t\t</:col>'+
                start+'\t\t<:col col-6 class="centeredContent">'+
                styleClass.closeBtn(className, languageStyleClass.close(className)) +
                start+'\t\t</:col>'+
                start+'\t</:row>'+
                start+'</:col>';

            addFunc = createAddElementFunction(className, pluralClassTitle, classToGenerate, formGroupActivated);
            removeFunc = createRemoveElementFunction(className, pluralClassTitle, formGroupActivated);
            updateFunc = createUpdateElementFunction(className);
            enableChangeFunc = createEnableChangeFunction(lwcClassTitle);
            cancelChangeFunc = createCancelChangeFunction(className);
        } else {
            propertyDefintionName = lwcClassTitle;
            propertyDefinitionType = className;
        }

        let tsOutput = generateStandardTsOutput(className, selector, classToGenerate[":classPrefix"], lwcClassTitle+".html");
        let htmlOutput = styleClass.beginning(className, listActivated, formGroupActivated, formGroupProperty, languageStyleClass.add(className))
            + `\n\t\t<:row`
            // check if *ngFor should be applied
            + ngFor
            +" class='itemRow'>"
            +formArrayDiv
            +editBtn
            +actionBtns;
        let scssOutput = selector + " {\n\n}";

        tsOutput += `\n\n\tpublic ${propertyDefintionName}: ${propertyDefinitionType};`;
        tsOutput = preAppendix(tsOutput, `import { ${className} } from "../${fileName}";\n`);

        htmlOutput += classToGenerate[':html-output'] + deleteBtn;

        htmlOutput += styleClass.ending(formGroupActivated, listActivated);

        htmlOutput = styleClass.replace(htmlOutput);

        if(formGroupActivated) {
            let formGroupPropertyDeclaration = formGroupProperty+": FormGroup;";
            tsOutput = preAppendix(tsOutput, "import { FormBuilder, FormGroup, Validators "+((listActivated)?", FormArray":"")+"} from '@angular/forms';\n");
            tsOutput += "\n\t"+formGroupPropertyDeclaration+"\n";
            tsOutput += "\n\tconstructor(public formBuilder: FormBuilder) {" +
                `\n\t\tthis.${formGroupProperty} = this.formBuilder.group({`+
                ((listActivated)?formGroupDefinitions:generateFormGroupDefinitions(classToGenerate)) +
                "\n\t\t});" +
                "\n\t}"
        } else {
            tsOutput += "\n\tconstructor(){}";
            htmlOutput = removeFormControlNameAttributes(htmlOutput);
        }

        if(!listActivated)
            htmlOutput = removeDisabledAttributes(htmlOutput, lwcClassTitle);

        tsOutput += addFunc
                    + removeFunc
                    + updateFunc
                    + enableChangeFunc
                    + cancelChangeFunc;
        tsOutput += "\n}";
        if(!fs.existsSync(pathTo+lwcClassTitle))
            fs.mkdirSync(pathTo+lwcClassTitle);
        let fullPath = pathTo+lwcClassTitle+"/"+lwcClassTitle;
        fs.writeFileSync(fullPath+".html", htmlOutput);
        fs.writeFileSync(fullPath+".scss", scssOutput);

        if(classToGenerate[':generateModule']) {
            let tsModuleOutput = "";
            if(classToGenerate[':ionicPage'] && classToGenerate[":ionic"]) {
                tsModuleOutput = (<IonicStyle>styleClass).generatePageModule(className);
                tsOutput = preAppendix(tsOutput, "import { IonicPage } from 'ionic-angular';\n");
            }
            else
                tsModuleOutput = styleClass.generateModule(className);

            fs.writeFileSync(fullPath+".module.ts", tsModuleOutput);
        }

        fs.writeFileSync(fullPath+".ts", tsOutput);
    } else {
        throw new Error("File doesn't exist");
    }
}







