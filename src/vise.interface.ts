export interface Persona {
  id?: number;
  name: string;
  country: string;
  monthlyIncome: number;
  viseClub: boolean;
  status: "Rejected" | "Registered";
  cardType: "Classic" | "Gold" | "Platinum" | "Black" | "White";
}
export interface CompraRequest {
  clientId: number;
  amount: number;
  currency: string;
  purchaseDate: string;
  purchaseCountry: string;
}
