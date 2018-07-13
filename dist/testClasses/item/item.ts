import { IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import { Item } from "../item.js";
import { Component } from '@angular/core';

@IonicPage({
	name: 'item-page'
})
@Component({
	selector: 'item-component',
	templateUrl: 'item.html',
})
export class ItemComponent {

	public items: any[] = [];
	ItemForm: FormGroup;

	constructor(public formBuilder: FormBuilder) {
		this.ItemForm = this.formBuilder.group({
			items: [[]]
		});
	}

	createElement() {
		return this.formBuilder.group({
			name: ['', Validators.compose([])],
			price: ['', Validators.compose([])],
			isSoldOut: ['', Validators.compose([])],
		});
	}

	addItem() {
		this.items = this.ItemForm.get('items') as FormArray;
		this.items.push(this.createElement());
	}
	removeItem(index: number){
		this.items = this.ItemForm.get('items') as FormArray;
		(<FormArray>this.items).removeAt(index);
	}

	updateItem(item){
		item.changeActivated = false;
		if(item.hasOwnProperty('id')) {
			// update/put
		} else {
			// post & set id if successful
		}
	}

	enableChange(item) {
		item.backup = JSON.parse(JSON.stringify(item));
		item.changeActivated = true;
	}

	cancelChange(item) {
		if(item.hasOwnProperty('id')) {
			for(let prop in Object.keys(item)) {
				if(item.hasOwnProperty(prop)) {
					for(let backupProp in Object.keys(item.backup)) {
						if(item.backup.hasOwnProperty(backupProp)) {
							if(prop == backupProp) {
								item[prop] = item.backup[backupProp];
							}
						}
					}
				}
				item.changeActivated = false;
			}
		} else {
			this.removeItem(item);
		}
	}

}