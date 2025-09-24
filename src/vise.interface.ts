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
  userId: number;
  payment: number;
  countryPayment: string;
  day: string;
}
