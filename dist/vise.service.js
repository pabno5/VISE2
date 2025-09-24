"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViseService = void 0;
const common_1 = require("@nestjs/common");
const restricciones_1 = __importDefault(require("./utils/restricciones"));
const beneficios_1 = __importDefault(require("./utils/beneficios"));
let ViseService = class ViseService {
    personas = [];
    descuentos = new beneficios_1.default();
    create(persona) {
        if (restricciones_1.default.getRestricion(persona)) {
            persona.id = this.personas.length + 1;
            this.personas.push(persona);
            return persona;
        }
        else {
            const error = new Error(`El cliente no cumple con los requisitos necesarios para la tarjeta ${persona.cardType}`);
            Object.defineProperty(error, "status", { value: "Rejected" });
            Object.defineProperty(error, "error", {
                value: "VISE_RESTRICTION_FAILED",
            });
            throw error;
        }
    }
    findAll() {
        return this.personas;
    }
    findOne(id) {
        const persona = this.personas.find((p) => p.id === id);
        if (!persona) {
            const error = new Error(`Cliente con id ${id} no encontrado`);
            Object.defineProperty(error, "status", { value: "NotFound" });
            throw error;
        }
        return persona;
    }
    aplyDiscount(compra) {
        const cliente = this.findOne(compra.userId);
        const descuento = this.descuentos.getDescuento(cliente.cardType, compra.payment, cliente.country, compra.countryPayment, compra.day.toLowerCase());
        const totalDescuento = compra.payment - compra.payment * descuento;
        return {
            userId: cliente.id,
            name: cliente.name,
            cardType: cliente.cardType,
            originalAmount: compra.payment,
            discountPercent: descuento * 100,
            finalAmount: totalDescuento,
        };
    }
};
exports.ViseService = ViseService;
exports.ViseService = ViseService = __decorate([
    (0, common_1.Injectable)()
], ViseService);
//# sourceMappingURL=vise.service.js.map