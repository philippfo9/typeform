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
const propertyDecorators_1 = require("../decorators/propertyDecorators");
const classDecorators_1 = require("../decorators/classDecorators");
let TestClass = class TestClass {
    constructor() {
        this.testProp = 2;
    }
};
__decorate([
    propertyDecorators_1.Col(3, true, "label", "placeholder"),
    __metadata("design:type", Number)
], TestClass.prototype, "testProp", void 0);
TestClass = __decorate([
    classDecorators_1.Ionic,
    classDecorators_1.List,
    __metadata("design:paramtypes", [])
], TestClass);
exports.TestClass = TestClass;
function generateClass() {
    return new TestClass();
}
exports.generateClass = generateClass;
