"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const ionic_angular_1 = require("ionic-angular");
const forms_1 = require("@angular/forms");
const core_1 = require("@angular/core");
let ItemComponent = class ItemComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.items = [];
        this.ItemForm = this.formBuilder.group({
            items: [[]]
        });
    }
    createElement() {
        return this.formBuilder.group({
            name: ['', forms_1.Validators.compose([])],
            price: ['', forms_1.Validators.compose([])],
            isSoldOut: ['', forms_1.Validators.compose([])],
        });
    }
    addItem() {
        this.items = this.ItemForm.get('items');
        this.items.push(this.createElement());
    }
    removeItem(index) {
        this.items = this.ItemForm.get('items');
        this.items.removeAt(index);
    }
    updateItem(item) {
        item.changeActivated = false;
        if (item.hasOwnProperty('id')) {
            // update/put
        }
        else {
            // post & set id if successful
        }
    }
    enableChange(item) {
        item.backup = JSON.parse(JSON.stringify(item));
        item.changeActivated = true;
    }
    cancelChange(item) {
        if (item.hasOwnProperty('id')) {
            for (let prop in Object.keys(item)) {
                if (item.hasOwnProperty(prop)) {
                    for (let backupProp in Object.keys(item.backup)) {
                        if (item.backup.hasOwnProperty(backupProp)) {
                            if (prop == backupProp) {
                                item[prop] = item.backup[backupProp];
                            }
                        }
                    }
                }
                item.changeActivated = false;
            }
        }
        else {
            this.removeItem(item);
        }
    }
};
ItemComponent = __decorate([
    ionic_angular_1.IonicPage({
        name: 'item-page'
    }),
    core_1.Component({
        selector: 'item-component',
        templateUrl: 'item.html',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _a || Object])
], ItemComponent);
exports.ItemComponent = ItemComponent;
var _a;
