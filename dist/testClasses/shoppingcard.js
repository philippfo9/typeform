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
const item_1 = require("./item");
const propertyDecorators_1 = require("../decorators/propertyDecorators");
const classDecorators_1 = require("../decorators/classDecorators");
let Shoppingcard = class Shoppingcard {
    constructor(items, note, dD, name) {
        this.deliveryDate = new Date();
        this.items = items;
        this.note = note;
        this.deliveryDate = dD;
        this.name = name;
        this.mainItem = null;
    }
};
__decorate([
    propertyDecorators_1.Col(12, true, "Items"),
    propertyDecorators_1.Relation("id", "name"),
    propertyDecorators_1.ArrayType(item_1.Item),
    __metadata("design:type", Array)
], Shoppingcard.prototype, "items", void 0);
__decorate([
    propertyDecorators_1.Col(12, true, "Main-Item"),
    propertyDecorators_1.Relation("id", "name"),
    propertyDecorators_1.Required,
    __metadata("design:type", item_1.Item)
], Shoppingcard.prototype, "mainItem", void 0);
__decorate([
    propertyDecorators_1.Col(12, true, "Description", "this shopping card is used for ..."),
    __metadata("design:type", String)
], Shoppingcard.prototype, "note", void 0);
__decorate([
    propertyDecorators_1.Col(6, true, "Shopping cart name", "e.g. Louis Bakery"),
    propertyDecorators_1.Title,
    propertyDecorators_1.Required,
    __metadata("design:type", String)
], Shoppingcard.prototype, "name", void 0);
__decorate([
    propertyDecorators_1.Col(12, true, "Delivery date"),
    __metadata("design:type", Date)
], Shoppingcard.prototype, "deliveryDate", void 0);
Shoppingcard = __decorate([
    classDecorators_1.Ionic,
    classDecorators_1.FormGroup,
    classDecorators_1.Module,
    classDecorators_1.Selector("shoppingCard"),
    __metadata("design:paramtypes", [Array, String, Date, String])
], Shoppingcard);
exports.Shoppingcard = Shoppingcard;
