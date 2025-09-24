import { Controller, Post, Body } from "@nestjs/common";
import { ViseService } from "./vise.service";
import type { Persona } from "./vise.interface";

@Controller("vise")
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
}
