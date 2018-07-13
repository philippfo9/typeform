import { Item } from "./item";
export declare class Shoppingcard {
    items: Item[];
    mainItem: Item;
    note: string;
    name: string;
    deliveryDate: Date;
    constructor(items: Item[], note: string, dD: Date, name: string);
}
