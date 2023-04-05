function calcularIntervalo(fechaInicio, fechaCierre) {
    // Convertir las fechas en objetos Date
    const inicio = new Date(fechaInicio);
    const cierre = new Date(fechaCierre);
    // Restar la fecha de cierre de la fecha de inicio y obtener la diferencia en milisegundos
    const diff = cierre.getTime() - inicio.getTime();
    // Convertir los milisegundos en días redondeando hacia abajo
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    // Retornar el intervalo de tiempo en días
    return dias;
  }

d3.dsv(';', 'dataset.csv', d3.autoType).then(data => {
  // Iterar sobre los datos y calcular el intervalo de tiempo para cada dato
  data.forEach(dato => {
    const intervalo = calcularIntervalo(dato.fecha_ingreso, dato.fecha_cierre_contacto);
    console.log(`El intervalo de tiempo para el dato ${dato} es de ${intervalo} días.`);
  });
  
  let chart = Plot.plot({
    width: 600,
    height: 600,
    marks: [
      Plot.barX(data, {
        x:
        y:
      })
    ]
    })
    d3.select('#chart').append(() => chart)
})
  
  
  
  
  