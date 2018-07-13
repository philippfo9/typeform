import {Item} from "./item";
import {Col, Title, ArrayType, Relation, Required} from "../decorators/propertyDecorators";
import {FormGroup, German, Ionic, List, Module, Selector} from "../decorators/classDecorators";

@Ionic
@FormGroup
@Module
@Selector("shoppingCard")
export class Shoppingcard {
    @Col(12, true, "Items")
    @Relation("id", "name")
    @ArrayType(Item)
    public items: Item[];

    @Col(12, true, "Main-Item")
    @Relation("id", "name")
    @Required
    public mainItem: Item;

    @Col(12, true, "Description", "this shopping card is used for ...")
    public note: string;

    @Col(6, true, "Shopping cart name", "e.g. Louis Bakery")
    @Title
    @Required
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