import { BaseStyle } from "./BaseStyle";
export declare class IonicStyle extends BaseStyle {
    replace(htmlOutput: string): string;
    generateModule(classTitle: string): string;
    generatePageModule(classTitle: string): string;
    acceptBtn(className: string, acceptText: string): string;
    closeBtn(className: string, closeText: string): string;
    constructor();
}
