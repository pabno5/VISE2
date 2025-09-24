import { CompraRequest, Persona } from "./vise.interface";
export declare class ViseService {
    private readonly personas;
    private readonly descuentos;
    create(persona: Persona): Persona;
    findAll(): Persona[];
    findOne(id: number): Persona;
    applyDiscount(compra: CompraRequest): {
        status: string;
        purchase: {
            clientId: number;
            originalAmount: number;
            discountApplied: number;
            finalAmount: number;
            benefit: string;
        };
        error?: undefined;
    } | {
        status: string;
        error: any;
        purchase?: undefined;
    };
}
