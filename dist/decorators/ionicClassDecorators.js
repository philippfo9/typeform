"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
require("reflect-metadata");
function Ionic(target) {
    target.prototype['ionic'] = true;
    target.prototype['html-beginning'] = utils_1.ionicBeginning(target.constructor.name);
    target.prototype['html-ending'] = utils_1.ionicEnding();
    utils_1.tagsToReplace.forEach(tagToReplace => {
        let replaceText = "ion-" + tagToReplace;
        if (tagToReplace == "button")
            replaceText = "button ion-button";
        else if (tagToReplace == "date")
            replaceText = "ion-datetime displayFormat='DD.MMM.YYYY'";
        else if (tagToReplace == "time")
            replaceText = "ion-datetime displayFormat='HH:mm'";
        target.prototype[tagToReplace] = replaceText;
    });
    if (target.prototype['html-output']) {
        utils_1.tagsToReplace.forEach(tagToReplace => {
            let replaceText = "ion-" + tagToReplace;
            if (tagToReplace == "button")
                replaceText = "button ion-button";
            else if (tagToReplace == "date")
                replaceText = "ion-datetime displayFormat='DD.MMM.YYYY'";
            else if (tagToReplace == "time")
                replaceText = "ion-datetime displayFormat='HH:mm'";
            target.prototype['html-output'] = utils_1.replaceAll(target.prototype['html-output'], ":" + tagToReplace, replaceText);
        });
        target.prototype['html-output'] = utils_1.replaceAll(target.prototype['html-output'], ":tag-datetime", "ion-datetime");
    }
}
exports.Ionic = Ionic;
