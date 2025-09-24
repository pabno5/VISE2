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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViseController = void 0;
const common_1 = require("@nestjs/common");
const vise_service_1 = require("./vise.service");
const common_2 = require("@nestjs/common");
let ViseController = class ViseController {
    viseService;
    constructor(viseService) {
        this.viseService = viseService;
    }
    create(persona) {
        try {
            const result = this.viseService.create(persona);
            return {
                clientId: result.id,
                name: result.name,
                cardType: result.cardType,
                status: result.status,
                message: `Cliente apto para tarjeta ${result.cardType}`,
            };
        }
        catch (error) {
            return {
                status: error.status || "Rejected",
                message: error.message || "An unknown error occurred",
            };
        }
    }
    findAll() {
        return this.viseService.findAll();
    }
    applyDiscount(compra) {
        return this.viseService.applyDiscount(compra);
    }
};
exports.ViseController = ViseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViseController.prototype, "create", null);
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ViseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("purchase"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViseController.prototype, "applyDiscount", null);
exports.ViseController = ViseController = __decorate([
    (0, common_1.Controller)("client"),
    __metadata("design:paramtypes", [vise_service_1.ViseService])
], ViseController);
//# sourceMappingURL=vise.controller.js.map