class Descuentos {
  getDescuento(
    card: string,
    payment: number,
    countryRecidence?: string,
    countryPayment?: string,
    day?: string
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

      // Solo compras en el exterior (no acumulativo con otros descuentos)
      if (
        countryRecidence !== countryPayment &&
        !notAllowCountries.includes(countryRecidence)
      ) {
        return 0.05;
      }

      if (allowDays.includes(day) && payment >= 100) {
        discount += 0.2;
      }
      if (day === "sabado" && payment >= 200) {
        discount += 0.3;
      }

      return discount;
    }

    if (card === "Black") {
      const allowDays: string[] = ["lunes", "martes", "miercoles"];
      const notAllowCountries: string[] = ["China", "Vietnam", "India", "Irán"];
      let discount = 0;

      // Solo compras en el exterior (no acumulativo con otros descuentos)
      if (
        countryRecidence !== countryPayment &&
        !notAllowCountries.includes(countryRecidence)
      ) {
        return 0.05;
      }

      if (allowDays.includes(day) && payment >= 100) {
        discount += 0.25;
      }
      if (day === "sabado" && payment >= 200) {
        discount += 0.35;
      }

      return discount;
    }

    if (card === "White") {
      const notAllowCountries: string[] = ["China", "Vietnam", "India", "Irán"];
      const weekDays: string[] = [
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
      ];
      let discount = 0;

      // Solo compras en el exterior (no acumulativo con otros descuentos)
      if (
        countryRecidence !== countryPayment &&
        !notAllowCountries.includes(countryRecidence)
      ) {
        return 0.05;
      }

      // Del lunes a viernes, compras mayores a 100 USD tienen 25% descuento
      if (weekDays.includes(day) && payment >= 100) {
        discount += 0.25;
      }

      // Los sábados y domingos, compras mayores a 200 USD tienen 35% descuento
      if ((day === "sabado" || day === "domingo") && payment >= 200) {
        discount += 0.35;
      }

      return discount;
    }
  }
}

export default Descuentos;
