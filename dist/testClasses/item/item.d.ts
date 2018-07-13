import { FormBuilder, FormGroup } from '@angular/forms';
export declare class ItemComponent {
    formBuilder: FormBuilder;
    items: any[];
    ItemForm: FormGroup;
    constructor(formBuilder: FormBuilder);
    createElement(): any;
    addItem(): void;
    removeItem(index: number): void;
    updateItem(item: any): void;
    enableChange(item: any): void;
    cancelChange(item: any): void;
}
