"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let StorageService = class StorageService {
    dataDirectory;
    requestsFile;
    clientsFile;
    constructor() {
        this.dataDirectory = path.join(process.cwd(), "data");
        this.requestsFile = path.join(this.dataDirectory, "requests.json");
        this.clientsFile = path.join(this.dataDirectory, "clients.json");
        this.ensureDataDirectory();
    }
    ensureDataDirectory() {
        if (!fs.existsSync(this.dataDirectory)) {
            fs.mkdirSync(this.dataDirectory, { recursive: true });
        }
    }
    ensureFile(filePath) {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "[]", "utf8");
        }
    }
    saveRequest(requestData) {
        try {
            this.ensureFile(this.requestsFile);
            const requests = this.loadRequests();
            requests.push(requestData);
            fs.writeFileSync(this.requestsFile, JSON.stringify(requests, null, 2), "utf8");
        }
        catch (error) {
            console.error("Error saving request:", error);
            throw new Error("Failed to save request to local storage");
        }
    }
    saveClient(cliente) {
        try {
            this.ensureFile(this.clientsFile);
            const clients = await this.loadClients();
            const existingIndex = clients.findIndex((c) => c.id === cliente.id);
            if (existingIndex !== -1) {
                clients[existingIndex] = cliente;
            }
            else {
                clients.push(cliente);
            }
            fs.writeFileSync(this.clientsFile, JSON.stringify(clients, null, 2), "utf8");
        }
        catch (error) {
            console.error("Error saving client:", error);
            throw new Error("Failed to save client to local storage");
        }
    }
    loadRequests() {
        try {
            this.ensureFile(this.requestsFile);
            const data = fs.readFileSync(this.requestsFile, "utf8");
            return JSON.parse(data);
        }
        catch (error) {
            console.error("Error loading requests:", error);
            return [];
        }
    }
    loadClients() {
        try {
            this.ensureFile(this.clientsFile);
            const data = fs.readFileSync(this.clientsFile, "utf8");
            return JSON.parse(data);
        }
        catch (error) {
            console.error("Error loading clients:", error);
            return [];
        }
    }
    async getStats() {
        try {
            const requests = await this.loadRequests();
            const approved = requests.filter(r => r.result.status === 'Registered');
            const rejected = requests.filter(r => r.result.status === 'Rejected');
            const cardTypes = {};
            approved.forEach(r => {
                const cardType = r.result.cardType;
                cardTypes[cardType] = (cardTypes[cardType] || 0) + 1;
            });
            return {
                totalRequests: requests.length,
                approvedClients: approved.length,
                rejectedRequests: rejected.length,
                cardTypes
            };
        }
        catch (error) {
            console.error('Error getting stats:', error);
            return {
                totalRequests: 0,
                approvedClients: 0,
                rejectedRequests: 0,
                cardTypes: {}
            };
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StorageService);
//# sourceMappingURL=storage.service.js.map