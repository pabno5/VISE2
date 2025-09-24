"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViseModule = void 0;
const common_1 = require("@nestjs/common");
const vise_controller_1 = require("./vise.controller");
const vise_service_1 = require("./vise.service");
let ViseModule = class ViseModule {
};
exports.ViseModule = ViseModule;
exports.ViseModule = ViseModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [vise_controller_1.ViseController],
        providers: [vise_service_1.ViseService],
    })
], ViseModule);
//# sourceMappingURL=vise.module.js.map