import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemComponent} from "./item";

@NgModule({
	declarations: [ 
		ItemComponent  
	],
	imports: [ 
		CommonModule,
		IonicPageModule.forChild(ItemComponent)
	],
	exports: [],
	providers: []
})
export class ItemComponentModule {}