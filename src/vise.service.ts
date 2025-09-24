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
  applyDiscount(compra: CompraRequest) {
    try {
      const cliente = this.findOne(compra.clientId);

      // Verificar restricciones para compras desde países no permitidos
      const notAllowCountries: string[] = ["China", "Vietnam", "India", "Irán"];
      if (
        (cliente.cardType === "Black" || cliente.cardType === "White") &&
        notAllowCountries.includes(compra.purchaseCountry)
      ) {
        return {
          status: "Rejected",
          error: `El cliente con tarjeta ${cliente.cardType} no puede realizar compras desde ${compra.purchaseCountry}`,
        };
      }

      // obtener el día de la semana a partir de purchaseDate
      const date = new Date(compra.purchaseDate);
      const days = [
        "domingo",
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
      ];
      const day = days[date.getUTCDay()];

      const descuentoPercent = this.descuentos.getDescuento(
        cliente.cardType,
        compra.amount,
        cliente.country,
        compra.purchaseCountry,
        day,
      );

      const discountApplied = compra.amount * descuentoPercent;
      const finalAmount = compra.amount - discountApplied;

      let benefit = "";
      if (descuentoPercent > 0) {
        const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);
        benefit = `${dayCapitalized} - Descuento ${Math.round(descuentoPercent * 100)}%`;
      }

      return {
        status: "Approved",
        purchase: {
          clientId: cliente.id,
          originalAmount: compra.amount,
          discountApplied: Math.round(discountApplied),
          finalAmount: Math.round(finalAmount),
          benefit: benefit || "Sin beneficio aplicado",
        },
      };
    } catch (error) {
      return {
        status: "Rejected",
        error: error.message,
      };
    }
  }
}
