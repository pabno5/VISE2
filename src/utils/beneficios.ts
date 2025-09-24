class Descuentos {
  getDescuento(
    card: string,
    payment: number,
    countryRecidence?: string,
    countryPayment?: string,
    day?: string,
  ) {
    if (card === "Classic") {
      return 0;
    }

    if (card === "Gold") {
      const allowDays: string[] = ["lunes", "martes", "miercoles"];
      if (allowDays.includes(day) && payment >= 100) {
        return 0.15;
      } else {
        return 0;
      }
    }

    if (card === "Platinum") {
      const allowDays: string[] = ["lunes", "martes", "miercoles"];
      const notAllowCountries: string[] = ["China", "Vietnam", "India", "Irán"];
      let discount = 0;

      if (allowDays.includes(day) && payment >= 100) {
        discount += 0.2;
      }
      if (day === "sabado" && payment >= 200) {
        discount += 0.3;
      }
      if (
        countryRecidence !== countryPayment &&
        !notAllowCountries.includes(countryRecidence)
      ) {
        discount += 0.05;
      }

      return discount;
    }

    if (card === "Black") {
      const allowDays: string[] = ["lunes", "martes", "miercoles"];
      const notAllowCountries: string[] = ["China", "Vietnam", "India", "Irán"];
      let discount = 0;

      if (allowDays.includes(day) && payment >= 100) {
        discount += 0.25;
      }
      if (day === "sabado" && payment >= 200) {
        discount += 0.35;
      }
      if (
        countryRecidence !== countryPayment &&
        !notAllowCountries.includes(countryRecidence)
      ) {
        discount += 0.05;
      }

      return discount;
    }

    if (card === "White") {
      const notAllowCountries: string[] = ["China", "Vietnam", "India", "Irán"];
      let discount = 0;

      if ((day === "sabado" || day === "domingo") && payment >= 200) {
        discount += 0.35;
      } else {
        if (payment >= 100) {
          discount += 0.25;
        }
      }
      if (
        countryRecidence !== countryPayment &&
        !notAllowCountries.includes(countryRecidence)
      ) {
        discount += 0.05;
      }

      return discount;
    }
  }
}

export default Descuentos;
