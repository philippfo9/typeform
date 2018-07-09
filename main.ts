import * as fs from 'fs';
import {angularBeginning, generatePlural, getType, ionicBeginning, ionicEnding} from "./utils/utils";
import {Item} from "./testClasses/item";
import "reflect-metadata";
import {Shoppingcard} from "./testClasses/shoppingcard";

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
        let pathTo = filePath.substring(0, filePath.length-(splitFilePathArr[splitFilePathArr.length-1]).length);
        if(className == "") {
            let fileSrc = fs.readFileSync(filePath+".ts").toString();
            className = fileSrc.substring(fileSrc.indexOf("export class") + "export class".length).split(' ')[1];
        }
        console.log("generating form component for class: " + className + " ...");
        let classToGenerate: any = new file[className]();
        let classTitle = classToGenerate.constructor.name;
        let pluralClassTitle = generatePlural(classTitle.toLowerCase());

        let tsOutput = "";
        let htmlOutput = classToGenerate['html-beginning']
            + `\n\t\t<${classToGenerate['row']}`+
            // check if *ngFor should be applied
            ((classToGenerate['ngFor'])?` *ngFor='let ${classTitle.toLowerCase()} of  ${pluralClassTitle}; let i = index'`: "")
            +" class='itemRow'>";

        htmlOutput += classToGenerate['html-output'];

        htmlOutput += classToGenerate['html-ending'];
        let lwcClassTitle = classTitle.toLowerCase();
        if(!fs.existsSync(pathTo+lwcClassTitle))
            fs.mkdirSync(pathTo+lwcClassTitle);
        let fullPath = pathTo+lwcClassTitle+"/"+lwcClassTitle;
        fs.writeFileSync(fullPath+".html", htmlOutput);
    } else {
        throw new Error("File doesn't exist");
    }
}







