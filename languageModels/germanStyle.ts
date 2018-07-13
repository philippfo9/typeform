import {BasicLanguageStyle} from "./basicLanguageStyle";

export class GermanLanguageStyle implements BasicLanguageStyle {
    edit(className: string): string {
        return "Bearbeiten";
    }

    add(className: string): string {
        return className + " hinzufügen";
    }

    delete(className: string):string {
        return "Löschen";
    }

    save(className: string):string {
        return "Speichern";
    }

    close(className: string):string {
        return "Abbrechen";
    }

    constructor(){}
}