"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const utils_1 = require("./utils/utils");
require("reflect-metadata");
const test_1 = require("./testClasses/test");
const englishStyle_1 = require("./languageModels/englishStyle");
exports.start = "\n\t\t\t\t";
let test = new test_1.TestClass();
let filePath = process.argv[2];
let className = "";
if (process.argv[3])
    className = process.argv[3];
generateFormComponent(filePath, className);
async function generateFormComponent(filePath, className) {
    console.log("starting generation ...");
    if (fs.existsSync(filePath)) {
        //dynamic import of file
        let file = await Promise.resolve().then(function () { return require(filePath); });
        let splitFilePathArr = filePath.split("/");
        let fileName = splitFilePathArr[splitFilePathArr.length - 1];
        let pathTo = filePath.substring(0, filePath.length - fileName.length);
        if (className == "") {
            let fileSrc = fs.readFileSync(filePath).toString();
            className = fileSrc.substring(fileSrc.indexOf("class ") + "class ".length).split(' ')[0];
        }
        console.log("generating form component for class: " + className + " ...");
        let classToGenerate = new file[className]();
        let lwcClassTitle = className.toLowerCase();
        let pluralClassTitle = utils_1.generatePlural(lwcClassTitle);
        let selector = (classToGenerate[':selector']) ? classToGenerate[':selector'] : lwcClassTitle + "-component";
        let listActivated = classToGenerate[':ngFor'];
        let styleClass = classToGenerate[':styleClass'];
        if (!styleClass)
            throw new Error("You have to define own class as style class through using a decorator like @Ionic");
        let languageStyleClass = classToGenerate[':languageStyle'] || new englishStyle_1.EnglishLanguageStyle();
        console.log(languageStyleClass);
        let formGroupActivated = classToGenerate[":formGroup"];
        let formGroupProperty = className + "Form";
        let formGroupDefinitions = "";
        let ngFor = "", formArrayDiv = "", addBtn = "", editBtn = "", deleteBtn = "", actionBtns = "", addFunc = "", removeFunc = "", updateFunc = "", enableChangeFunc = "", cancelChangeFunc = "", propertyDefinitionType = "", propertyDefintionName = "", formGroup = "";
        if (listActivated) {
            propertyDefintionName = pluralClassTitle;
            if (formGroupActivated) {
                propertyDefinitionType = "any[] = []";
                ngFor = ` formArrayName='${pluralClassTitle}' *ngFor='let ${lwcClassTitle} of ${formGroupProperty}.get("${pluralClassTitle}").controls; let i = index'`;
                formGroupDefinitions += `\n\t\t\t${pluralClassTitle}: [[]]`;
                formArrayDiv = `\n\t\t\t<div class='formWrapper' [formGroupName]='i'>`;
            }
            else {
                propertyDefinitionType = `${className}[] = []`;
                ngFor = ` *ngFor='let ${className.toLowerCase()} of ${pluralClassTitle}; let i = index'`;
            }
            addBtn = "\n\t\t<:row class='addElementRow'>" +
                "\n\t\t\t<:button class='standardBtn' (click)='add" + className + "()'>" + languageStyleClass.add(className) + "</button>" +
                "\n\t\t</:row>";
            editBtn = exports.start + "<:col *ngIf='!" + lwcClassTitle + ".changeActivated' col-2 class=\"centeredContent\">" +
                exports.start + "\t<:button class='standardBtn editBtn' (click)='enableChange(" + lwcClassTitle + ")'>" + languageStyleClass.edit(className) + "</:button>" +
                exports.start + "</:col>";
            deleteBtn = exports.start + '<:col col-2 class="centeredContent">' +
                exports.start + '\t<:button class="standardBtn deleteBtn" (click)="delete' + className + '(' + ((formGroupActivated) ? "i" : lwcClassTitle) + ')">' + languageStyleClass.delete(className) + '</:button>' +
                exports.start + '</:col>';
            actionBtns =
                exports.start + '<:col class="centeredContent actionBtnsCol" col-2 *ngIf="' + lwcClassTitle + '.changeActivated">' +
                    exports.start + '\t<:row>' +
                    exports.start + '\t\t<:col col-6 class="centeredContent">' +
                    styleClass.acceptBtn(className, languageStyleClass.save(className)) +
                    exports.start + '\t\t</:col>' +
                    exports.start + '\t\t<:col col-6 class="centeredContent">' +
                    styleClass.closeBtn(className, languageStyleClass.close(className)) +
                    exports.start + '\t\t</:col>' +
                    exports.start + '\t</:row>' +
                    exports.start + '</:col>';
            addFunc = utils_1.createAddElementFunction(className, pluralClassTitle, classToGenerate, formGroupActivated);
            removeFunc = utils_1.createRemoveElementFunction(className, pluralClassTitle, formGroupActivated);
            updateFunc = utils_1.createUpdateElementFunction(className);
            enableChangeFunc = utils_1.createEnableChangeFunction(lwcClassTitle);
            cancelChangeFunc = utils_1.createCancelChangeFunction(className);
        }
        else {
            propertyDefintionName = lwcClassTitle;
            propertyDefinitionType = className;
        }
        let tsOutput = utils_1.generateStandardTsOutput(className, selector, classToGenerate[":classPrefix"], lwcClassTitle + ".html");
        let htmlOutput = styleClass.beginning(className, formGroupActivated, formGroupProperty)
            + addBtn
            + `\n\t\t<:row`
            + ngFor
            + " class='itemRow'>"
            + formArrayDiv
            + editBtn
            + actionBtns;
        let scssOutput = selector + " {\n\n}";
        tsOutput += `\n\n\tpublic ${propertyDefintionName}: ${propertyDefinitionType};`;
        tsOutput = utils_1.preAppendix(tsOutput, `import { ${className} } from "../${fileName}";\n`);
        htmlOutput += classToGenerate[':html-output'] + deleteBtn;
        htmlOutput += styleClass.ending(formGroupActivated, listActivated);
        htmlOutput = styleClass.replace(htmlOutput);
        if (formGroupActivated) {
            let formGroupPropertyDeclaration = formGroupProperty + ": FormGroup;";
            tsOutput = utils_1.preAppendix(tsOutput, "import { FormBuilder, FormGroup, Validators " + ((listActivated) ? ", FormArray" : "") + "} from '@angular/forms';\n");
            tsOutput += "\n\t" + formGroupPropertyDeclaration + "\n";
            tsOutput += "\n\tconstructor(public formBuilder: FormBuilder) {" +
                `\n\t\tthis.${formGroupProperty} = this.formBuilder.group({` +
                ((listActivated) ? formGroupDefinitions : utils_1.generateFormGroupDefinitions(classToGenerate)) +
                "\n\t\t});" +
                "\n\t}";
        }
        else {
            tsOutput += "\n\tconstructor(){}";
            htmlOutput = utils_1.removeFormControlNameAttributes(htmlOutput);
        }
        if (!listActivated)
            htmlOutput = utils_1.removeDisabledAttributes(htmlOutput, lwcClassTitle);
        tsOutput += addFunc
            + removeFunc
            + updateFunc
            + enableChangeFunc
            + cancelChangeFunc;
        tsOutput += "\n}";
        if (!fs.existsSync(pathTo + lwcClassTitle))
            fs.mkdirSync(pathTo + lwcClassTitle);
        let fullPath = pathTo + lwcClassTitle + "/" + lwcClassTitle;
        fs.writeFileSync(fullPath + ".html", htmlOutput);
        fs.writeFileSync(fullPath + ".scss", scssOutput);
        if (classToGenerate[':generateModule']) {
            let tsModuleOutput = "";
            if (classToGenerate[':ionicPage'] && classToGenerate[":ionic"]) {
                tsModuleOutput = styleClass.generatePageModule(className);
                tsOutput = utils_1.preAppendix(tsOutput, "import { IonicPage } from 'ionic-angular';\n");
            }
            else
                tsModuleOutput = styleClass.generateModule(className);
            fs.writeFileSync(fullPath + ".module.ts", tsModuleOutput);
        }
        fs.writeFileSync(fullPath + ".ts", tsOutput);
    }
    else {
        throw new Error("File doesn't exist");
    }
}
