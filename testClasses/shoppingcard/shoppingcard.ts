import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shoppingcard } from "../shoppingcard";
import { Component } from '@angular/core';
@Component({
	selector: 'shoppingCard',
	templateUrl: 'shoppingcard.html',
})
export class ShoppingcardComponent {

	public shoppingcard: Shoppingcard;
	ShoppingcardForm: FormGroup;

	constructor(public formBuilder: FormBuilder) {
		this.ShoppingcardForm = this.formBuilder.group({
			deliveryDate: ['', Validators.compose([])],
			items: ['', Validators.compose([])],
			note: ['', Validators.compose([])],
			name: ['', Validators.compose([Validators.required])],
			mainItem: ['', Validators.compose([Validators.required])],
		});
	}
}