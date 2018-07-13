import {FormGroup, Ionic, IonicPage, List, Module, Normal} from "../decorators/classDecorators";
import {Col, OnlyVisibleInEditMode, Title} from "../decorators/propertyDecorators";

@List
@Module
@Ionic
@FormGroup
@IonicPage({
    name: 'item-page'
})
export class Item {
    id: number = 0;

    @Col(4, true, "Item-Name", "e.g. Pokeball")
    @Title
    name: string = "";

    @Col(4, true, "Item-Price", "e.g. 4.90")
    price: number = 0;

    @Col(6, true, "Is sold out?")
    @OnlyVisibleInEditMode
    isSoldOut: boolean = false;

    constructor(){}


}