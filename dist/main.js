"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const utils_1 = require("./utils/utils");
require("reflect-metadata");
let filePath = process.argv[2];
let className = "";
if (process.argv[3])
    className = process.argv[3];
generateFormComponent(filePath, className);
function generateFormComponent(filePath, className) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("starting generation ...");
        if (fs.existsSync(filePath + ".ts")) {
            //dynamic import of file
            let file = yield Promise.resolve().then(function () { return require(filePath); });
            let splitFilePathArr = filePath.split("/");
            let pathTo = filePath.substring(0, filePath.length - (splitFilePathArr[splitFilePathArr.length - 1]).length);
            if (className == "") {
                let fileSrc = fs.readFileSync(filePath + ".ts").toString();
                className = fileSrc.substring(fileSrc.indexOf("export class") + "export class".length).split(' ')[1];
            }
            console.log("generating form component for class: " + className + " ...");
            let classToGenerate = new file[className]();
            let classTitle = classToGenerate.constructor.name;
            let pluralClassTitle = utils_1.generatePlural(classTitle.toLowerCase());
            let tsOutput = "";
            let htmlOutput = classToGenerate['html-beginning']
                + `\n\t\t<${classToGenerate['row']}` +
                // check if *ngFor should be applied
                ((classToGenerate['ngFor']) ? ` *ngFor='let ${classTitle.toLowerCase()} of  ${pluralClassTitle}; let i = index'` : "")
                + " class='itemRow'>";
            htmlOutput += classToGenerate['html-output'];
            htmlOutput += classToGenerate['html-ending'];
            let lwcClassTitle = classTitle.toLowerCase();
            if (!fs.existsSync(pathTo + lwcClassTitle))
                fs.mkdirSync(pathTo + lwcClassTitle);
            let fullPath = pathTo + lwcClassTitle + "/" + lwcClassTitle;
            fs.writeFileSync(fullPath + ".html", htmlOutput);
        }
        else {
            throw new Error("File doesn't exist");
        }
    });
}
