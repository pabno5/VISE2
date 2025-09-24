import { Persona } from "../vise.interface";
interface RequestData {
    timestamp: string;
    persona: Persona;
    result: {
        clientId?: number;
        name: string;
        cardType: string;
        status: string;
        message: string;
    };
}
export declare class StorageService {
    private readonly dataDirectory;
    private readonly requestsFile;
    private readonly clientsFile;
    constructor();
    private ensureDataDirectory;
    private ensureFile;
    saveRequest(requestData: RequestData): void;
    saveClient(cliente: Persona): void;
    loadRequests(): RequestData[];
    loadClients(): Persona[];
    getStats(): Promise<{
        totalRequests: number;
        approvedClients: number;
        rejectedRequests: number;
        cardTypes: Record<string, number>;
    }>;
}
export {};
