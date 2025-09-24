import { Injectable } from "@nestjs/common";
import Restriciones from "./utils/restricciones";
import { CompraRequest, Persona } from "./vise.interface";
import beneficios from "./utils/beneficios";

@Injectable()
export class ViseService {
  private readonly personas: Persona[] = [];
  private readonly descuentos = new beneficios();
  create(persona: Persona) {
    if (Restriciones.getRestricion(persona)) {
      persona.id = this.personas.length + 1;

      this.personas.push(persona);
      return persona;
    } else {
      const error = new Error(
        `El cliente no cumple con los requisitos necesarios para la tarjeta ${persona.cardType}`
      );

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
  findOne(id: number) {
    const persona = this.personas.find((p) => p.id === id);
    if (!persona) {
      const error = new Error(`Cliente con id ${id} no encontrado`);
      Object.defineProperty(error, "status", { value: "NotFound" });
      throw error;
    }
    return persona;
  }
  aplyDiscount(compra: CompraRequest) {
    const cliente = this.findOne(compra.userId);
    const descuento = this.descuentos.getDescuento(
      cliente.cardType,
      compra.payment,
      cliente.country,
      compra.countryPayment,
      compra.day.toLowerCase()
    );
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
}
