import { BasicLanguageStyle } from "./basicLanguageStyle";
export declare class EnglishLanguageStyle implements BasicLanguageStyle {
    edit(className: string): string;
    add(className: string): string;
    delete(className: string): string;
    save(className: string): string;
    close(className: string): string;
    constructor();
}
