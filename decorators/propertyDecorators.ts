import {appendix, generatePlural, getType, getTypeFromTarget, preAppendix, replaceAll} from "../utils/utils";
import "reflect-metadata";
import {type} from "os";

const start = "\n\t\t\t\t";
export function Title(target: any, key: string) {
    let preText = "\n\t\t\t<:col col-12>" +
        start+"<:title text-center>{{"+target.constructor.name.toLowerCase()+"."+key+"}}</:title>" +
        "\n\t\t\t</:col>";
    target['html-output'] = preAppendix(target['output'], preText);
}

export function ArrayType(type: any) {
    function actualTypeDecorator(target: any, key: string) {
        //declare type for the array
        target[key+"-type"] = getType(new type()).toLowerCase();
    }

    return actualTypeDecorator;
}

export function Relation(valueProperty: string, displayProperty: string) {
    function actualRelationDecorator(target: any, key: string) {
        //declare specifier and display for the relation
        target[key+"-specifier"] = valueProperty;
        target[key+"-display"] = displayProperty;
    }
    return actualRelationDecorator;
}

export function Col(cols: number, centered?: boolean, label?: string, placeholder?: string) {

    function actualColDecorator(target: any, key: string) {
        let preText = "\n\t\t\t<:col col-"+cols+" "+((centered)?"class='centeredContent'":"")+">";
        let className = target.constructor.name.toLowerCase();
        target[key+'-html-output'] = preAppendix(target[key+'-html-output'], preText);
        if(label && label != "")
            target[key+'-html-output'] += start+`<:label text-center>${label}</:label>`;
        let ngModel = `[(ngModel)]='${className}.${key}'`;
        let disabled = `[disabled]='${className}.changeActivated'`;
        let placeholderText = ((placeholder)?`placeholder='${placeholder}'`:"");
        //input placeholder text
        let inpText = start+`<:input type='inputType' ${ngModel} ${placeholderText} ${disabled}></:input>`;
        //type of target[key]
        let typeOfVar = getTypeFromTarget(target, key);
        switch(typeOfVar) {
            case "String": {
                inpText = replaceAll(inpText, "inputType", "text");
                target[key+"-html-output"] += inpText;
                break;
            }
            case "Number": {
                inpText = replaceAll(inpText, "inputType", "number");
                target[key+"-html-output"] += inpText;
                break;
            }
            case "Boolean": {
                target[key+"-html-output"] += start+`<:checkbox ${ngModel} ></:checkbox>`;
                break;
            }
            case "Array": {
                let type = target[key+"-type"];
                let relationClassTitle = type.toLowerCase();
                if(!type) throw new Error("You need to specify the @ArrayType annotation for an array");
                target[key+"-html-output"] +=
                    createSelectText(relationClassTitle, target, key, "multiple='true'", ngModel, disabled, placeholderText);
                break;
            }
            case "Date": {
                target[key+"-html-output"] += start+`<:date ${ngModel}></:tag-datetime>`;
                break;
            }
            default: {
                let relationClassTitle = typeOfVar.toLowerCase();
                target[key+"-html-output"] +=
                    createSelectText(relationClassTitle, target, key, "", ngModel, disabled, placeholderText);
                break;
            }
        }

        target[key+"-html-output"] += "\n\t\t\t</:col>";
        target['html-output'] = appendix(target['html-output'], target[key+"-html-output"]);
    }

    return actualColDecorator;
}

function createSelectText(relationClassTitle, target, key, multiple, ngModel, disabled, placeholderText) {
    if(!target[key+'-specifier'] || !target[key+'-display']) throw new Error("You need to specify the relation between the two entities with the @Relation annotation");
    let selectText = start+`<:select ${ngModel} ${placeholderText} ${disabled} ${multiple}>`+
        start + `\t<:option *ngFor='let ${relationClassTitle} of ${generatePlural(relationClassTitle)}' ` +
        `[value]='${relationClassTitle}.${target[key+'-specifier']}'>`+
        `{{ ${relationClassTitle}.${target[key+'-display']} }}</:option>`+
        start + `</:select>`;
    return selectText;
}

