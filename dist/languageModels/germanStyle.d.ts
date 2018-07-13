import { BasicLanguageStyle } from "./basicLanguageStyle";
export declare class GermanLanguageStyle implements BasicLanguageStyle {
    edit(className: string): string;
    add(className: string): string;
    delete(className: string): string;
    save(className: string): string;
    close(className: string): string;
    constructor();
}
