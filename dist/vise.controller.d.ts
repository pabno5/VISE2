import { ViseService } from "./vise.service";
import type { CompraRequest, Persona } from "./vise.interface";
export declare class ViseController {
    private viseService;
    constructor(viseService: ViseService);
    create(persona: Persona): {
        clientId: number;
        name: string;
        cardType: "Classic" | "Gold" | "Platinum" | "Black" | "White";
        status: "Rejected" | "Registered";
        message: string;
    } | {
        status: any;
        message: any;
        clientId?: undefined;
        name?: undefined;
        cardType?: undefined;
    };
    findAll(): Persona[];
    applyDiscount(compra: CompraRequest): {
        userId: number;
        name: string;
        cardType: "Classic" | "Gold" | "Platinum" | "Black" | "White";
        originalAmount: number;
        discountPercent: number;
        finalAmount: number;
    } | {
        status: any;
        message: any;
    };
}
