import {Ionic} from "../decorators/ionicClassDecorators";
import {List} from "../decorators/classDecorators";
import {Col, Title} from "../decorators/propertyDecorators";

@List
@Ionic
export class Item {
    id: number = 0;

    @Col(6, true, "Item-Name", "e.g. Pokeball")
    @Title
    name: string = "";

    @Col(6, true, "Item-Price", "e.g. 4.90")
    price: number = 0;

    @Col(6, true, "Is sold out?")
    isSoldOut: boolean;

    constructor(){}


}