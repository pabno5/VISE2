import { Controller, Post, Body } from "@nestjs/common";
import { ViseService } from "./vise.service";
import type { CompraRequest, Persona } from "./vise.interface";
import { Get } from "@nestjs/common";
import { Param } from "@nestjs/common";

@Controller("client")
export class ViseController {
  constructor(private viseService: ViseService) {}

  @Post()
  create(@Body() persona: Persona) {
    try {
      const result = this.viseService.create(persona);
      return {
        clientId: result.id,
        name: result.name,
        cardType: result.cardType,
        status: result.status,
        message: `Cliente apto para tarjeta ${result.cardType}`,
      };
    } catch (error) {
      return {
        status: error.status || "Rejected",
        message: error.message || "An unknown error occurred",
      };
    }
  }
  @Get()
  findAll() {
    return this.viseService.findAll();
  }
  @Post("purchase")
  applyDiscount(@Body() compra: CompraRequest) {
    try {
      return this.viseService.aplyDiscount(compra);
    } catch (error) {
      return {
        status: error.status || "Error",
        message: error.message || "No se pudo aplicar el descuento",
      };
    }
  }
}
