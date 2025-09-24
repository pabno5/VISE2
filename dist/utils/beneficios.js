"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Descuentos {
    getDescuento(card, payment, countryRecidence, countryPayment, day) {
        if (card === "Classic") {
            return 0;
        }
        if (card === "Gold") {
            const allowDays = ["lunes", "martes", "miercoles"];
            if (allowDays.includes(day) && payment >= 100) {
                return 0.15;
            }
            else {
                return 0;
            }
        }
        if (card === "Platinum") {
            const allowDays = ["lunes", "martes", "miercoles"];
            const notAllowCountries = ["China", "Vietnam", "India", "Irán"];
            let discount = 0;
            if (allowDays.includes(day) && payment >= 100) {
                discount += 0.2;
            }
            if (day === "sabado" && payment >= 200) {
                discount += 0.3;
            }
            if (countryRecidence !== countryPayment &&
                !notAllowCountries.includes(countryRecidence)) {
                discount += 0.05;
            }
            return discount;
        }
        if (card === "Black") {
            const allowDays = ["lunes", "martes", "miercoles"];
            const notAllowCountries = ["China", "Vietnam", "India", "Irán"];
            let discount = 0;
            if (allowDays.includes(day) && payment >= 100) {
                discount += 0.25;
            }
            if (day === "sabado" && payment >= 200) {
                discount += 0.35;
            }
            if (countryRecidence !== countryPayment &&
                !notAllowCountries.includes(countryRecidence)) {
                discount += 0.05;
            }
            return discount;
        }
        if (card === "White") {
            const notAllowCountries = ["China", "Vietnam", "India", "Irán"];
            const weekDays = [
                "lunes",
                "martes",
                "miercoles",
                "jueves",
                "viernes",
            ];
            let discount = 0;
            if (weekDays.includes(day) && payment >= 100) {
                discount += 0.25;
            }
            if ((day === "sabado" || day === "domingo") && payment >= 200) {
                discount += 0.35;
            }
            if (countryRecidence !== countryPayment &&
                !notAllowCountries.includes(countryRecidence)) {
                discount += 0.05;
            }
            return discount;
        }
    }
}
exports.default = Descuentos;
//# sourceMappingURL=beneficios.js.map