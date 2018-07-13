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
const classDecorators_1 = require("../decorators/classDecorators");
const propertyDecorators_1 = require("../decorators/propertyDecorators");
let Item = class Item {
    constructor() {
        this.id = 0;
        this.name = "";
        this.price = 0;
        this.isSoldOut = false;
    }
};
__decorate([
    propertyDecorators_1.Col(4, true, "Item-Name", "e.g. Pokeball"),
    propertyDecorators_1.Title,
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    propertyDecorators_1.Col(4, true, "Item-Price", "e.g. 4.90"),
    __metadata("design:type", Number)
], Item.prototype, "price", void 0);
__decorate([
    propertyDecorators_1.Col(6, true, "Is sold out?"),
    propertyDecorators_1.OnlyVisibleInEditMode,
    __metadata("design:type", Boolean)
], Item.prototype, "isSoldOut", void 0);
Item = __decorate([
    classDecorators_1.List,
    classDecorators_1.Module,
    classDecorators_1.Ionic,
    classDecorators_1.FormGroup,
    classDecorators_1.German,
    classDecorators_1.IonicPage({
        name: 'item-page'
    }),
    __metadata("design:paramtypes", [])
], Item);
exports.Item = Item;
