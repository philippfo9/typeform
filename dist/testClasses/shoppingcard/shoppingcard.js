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
const forms_1 = require("@angular/forms");
const core_1 = require("@angular/core");
let ShoppingcardComponent = class ShoppingcardComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.ShoppingcardForm = this.formBuilder.group({
            deliveryDate: ['', forms_1.Validators.compose([])],
            items: ['', forms_1.Validators.compose([])],
            note: ['', forms_1.Validators.compose([])],
            name: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            mainItem: ['', forms_1.Validators.compose([forms_1.Validators.required])],
        });
    }
};
ShoppingcardComponent = __decorate([
    core_1.Component({
        selector: 'shoppingCard',
        templateUrl: 'shoppingcard.html',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _a || Object])
], ShoppingcardComponent);
exports.ShoppingcardComponent = ShoppingcardComponent;
var _a;
