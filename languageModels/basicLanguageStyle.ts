export const wordsToReplace = "§edit, §add, §delete, §save";

export interface BasicLanguageStyle {
    edit(className: string): string;

    add(className: string): string;

    delete(className: string):string;

    save(className: string):string;

    close(className: string):string;
}