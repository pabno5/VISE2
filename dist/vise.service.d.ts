import { CompraRequest, Persona } from "./vise.interface";
export declare class ViseService {
    private readonly personas;
    private readonly descuentos;
    create(persona: Persona): Persona;
    findAll(): Persona[];
    findOne(id: number): Persona;
    aplyDiscount(compra: CompraRequest): {
        userId: number;
        name: string;
        cardType: "Classic" | "Gold" | "Platinum" | "Black" | "White";
        originalAmount: number;
        discountPercent: number;
        finalAmount: number;
    };
}
