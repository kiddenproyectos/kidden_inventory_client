export const calcularMesesRestantes = () => {
  const mesesDelAnio = [
    {
      nombre: 'enero',
      num: 1
    },
    {
      nombre: 'febrero',
      num: 2
    },
    {
      nombre: 'marzo',
      num: 3
    },
    {
      nombre: 'abril',
      num: 4
    },
    {
      nombre: 'mayo',
      num: 5
    },
    {
      nombre: 'junio',
      num: 6
    },
    {
      nombre: 'julio',
      num: 7
    },
    {
      nombre: 'agosto',
      num: 8
    },
    {
      nombre: 'septiembre',
      num: 9
    },
    {
      nombre: 'octubre',
      num: 10
    },
    {
      nombre: 'noviembre',
      num: 11
    },
    {
      nombre: 'diciembre',
      num: 12
    }
  ];

  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1; // 0 para enero, 1 para febrero, ...
  const mesesRestantes = mesesDelAnio.slice(mesActual - 1, 12).map((item) => ({
    mes: item.nombre,
    index: item.num,
    activo: item.num <= mesActual
  }));

  return mesesRestantes;
};
