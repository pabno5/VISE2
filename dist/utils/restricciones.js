"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Restriciones {
    static getRestricion(person) {
        if (person.cardType === "Classic") {
            return true;
        }
        if (person.cardType === "Gold") {
            if (person.monthlyIncome >= 500) {
                return true;
            }
            else {
                return false;
            }
        }
        if (person.cardType === "Platinum") {
            if (person.monthlyIncome >= 1000 && person.viseClub) {
                return true;
            }
            else {
                return false;
            }
        }
        if (person.cardType === "Black" || person.cardType === "White") {
            const notAllowCountries = ["China", "Vietnam", "India", "Irán"];
            if (person.monthlyIncome >= 2000 && person.viseClub) {
                if (!notAllowCountries.includes(person.country)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
}
exports.default = Restriciones;
//# sourceMappingURL=restricciones.js.map