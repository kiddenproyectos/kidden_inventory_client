export function procesarData(dataArray) {
  // Recorre cada objeto en el array
  dataArray?.forEach((obj) => {
    // Obtén las claves del objeto
    const keys = Object.keys(obj);

    // Verifica si el objeto solo tiene una clave
    if (keys.length === 1) {
      const unicaClave = keys[0];
      // Cambia el nombre de la clave a "Descripción"
      obj.Descripción = obj[unicaClave];
      delete obj[unicaClave]; // Elimina la clave anterior
    }
  });

  return dataArray;
}
