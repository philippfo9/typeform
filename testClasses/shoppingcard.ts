import {Item} from "./item";
import {Col, Title, ArrayType, Relation} from "../decorators/propertyDecorators";
import {Ionic} from "../decorators/ionicClassDecorators";
import {List} from "../decorators/classDecorators";

@Ionic
export class Shoppingcard {
    @Col(12, true, "Items")
    @Relation("id", "name")
    @ArrayType(Item)
    public items: Item[];

    @Col(12, true, "Main-Item")
    @Relation("id", "name")
    public mainItem: Item;

    @Col(12, true, "Description", "this shopping card is used for ...")
    public note: string;

    @Col(6, true, "Shopping cart name", "e.g. Louis Bakery")
    @Title
    public name: string;

    @Col(12, true, "Delivery date")
    public deliveryDate: Date = new Date();

    constructor(items: Item[], note: string, dD: Date, name: string) {
        this.items = items;
        this.note = note;
        this.deliveryDate = dD;
        this.name = name;
        this.mainItem = null;
    }


}