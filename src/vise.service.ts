import { Injectable } from "@nestjs/common";
import Restriciones from "./utils/restricciones";
import { Persona } from "./vise.interface";

@Injectable()
export class ViseService {
  private readonly personas: Persona[] = [];

  create(persona: Persona) {
    if (Restriciones.getRestricion(persona)) {
      persona.id = this.personas.length + 1;

      this.personas.push(persona);
      return persona;
    } else {
      const error = new Error(
        `El cliente no cumple con los requisitos necesarios para la tarjeta ${persona.cardType}`,
      );

      Object.defineProperty(error, "status", { value: "Rejected" });
      Object.defineProperty(error, "error", {
        value: "VISE_RESTRICTION_FAILED",
      });

      throw error;
    }
  }
}
