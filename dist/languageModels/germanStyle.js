"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GermanLanguageStyle {
    edit(className) {
        return "Bearbeiten";
    }
    add(className) {
        return className + " hinzufügen";
    }
    delete(className) {
        return "Löschen";
    }
    save(className) {
        return "Speichern";
    }
    close(className) {
        return "Abbrechen";
    }
    constructor() { }
}
exports.GermanLanguageStyle = GermanLanguageStyle;
