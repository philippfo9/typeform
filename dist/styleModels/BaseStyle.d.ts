export declare class BaseStyle {
    prefix: string;
    beginning(classTitle: string, formGroupActivated: boolean, formGroupName: string): any;
    ending(formGroupActivated: boolean, listActivated: boolean): any;
    replace(htmlOutput: string): string;
    replaceTags(htmlOutput: string, regexStr: string): string;
    generateModule(classTitle: string): string;
    generateModuleHelper(classTitle: string, imports: string, declarations: string, exports: string, providers: string): string;
    acceptBtn(className: string, acceptText: string): string;
    closeBtn(className: string, closeText: string): string;
    constructor();
}
