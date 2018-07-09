import {ionicBeginning, ionicEnding, replaceAll, tagsToReplace} from "../utils/utils";
import "reflect-metadata";

export function Ionic(target: any) {
    target.prototype['ionic'] = true;
    target.prototype['html-beginning'] = ionicBeginning(target.constructor.name);
    target.prototype['html-ending'] = ionicEnding();
    tagsToReplace.forEach(tagToReplace => {
        let replaceText = "ion-"+tagToReplace;
        if(tagToReplace == "button")
            replaceText = "button ion-button";
        else if(tagToReplace == "date")
            replaceText = "ion-datetime displayFormat='DD.MMM.YYYY'";
        else if(tagToReplace == "time")
            replaceText = "ion-datetime displayFormat='HH:mm'";

        target.prototype[tagToReplace] = replaceText;
    });
    if(target.prototype['html-output']) {
        tagsToReplace.forEach(tagToReplace => {
            let replaceText = "ion-"+tagToReplace;
            if(tagToReplace == "button")
                replaceText = "button ion-button";
            else if(tagToReplace == "date")
                replaceText = "ion-datetime displayFormat='DD.MMM.YYYY'";
            else if(tagToReplace == "time")
                replaceText = "ion-datetime displayFormat='HH:mm'";

            target.prototype['html-output'] = replaceAll(target.prototype['html-output'],":"+tagToReplace, replaceText);
        });
        target.prototype['html-output'] = replaceAll(target.prototype['html-output'],":tag-datetime", "ion-datetime");
    }
}