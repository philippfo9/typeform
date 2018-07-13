import {BasicLanguageStyle} from "./basicLanguageStyle";

export class EnglishLanguageStyle implements BasicLanguageStyle {
    edit(className: string): string {
        return "Edit";
    }

    add(className: string): string {
        return "Add "+className;
    }

    delete(className: string):string {
        return "Delete";
    }

    save(className: string):string {
        return "Save";
    }

    close(className: string):string {
        return "Close";
    }

    constructor(){}
}