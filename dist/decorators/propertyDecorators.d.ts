import "reflect-metadata";
export declare function Title(target: any, key: string): void;
export declare function ArrayType(type: any): (target: any, key: string) => void;
export declare function OnlyVisibleInEditMode(target: any, key: string): void;
export declare function Relation(valueProperty: string, displayProperty: string): (target: any, key: string) => void;
export declare function Required(target: any, key: string): void;
export declare function Col(cols: number, centered?: boolean, label?: string, placeholder?: string): (target: any, key: string) => void;
