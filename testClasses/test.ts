import {Col} from "../decorators/propertyDecorators";
import {Ionic, List} from "../decorators/classDecorators";

@Ionic
@List
export class TestClass {
    @Col(3, true, "label", "placeholder")
    testProp: number;

    constructor() {
        this.testProp = 2;
    }
}

export function generateClass() {
    return new TestClass();
}


