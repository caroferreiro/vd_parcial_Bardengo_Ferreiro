// function calcularIntervalo(fechaInicio, fechaCierre) {
//     // Convertir las fechas en objetos Date
//     const inicio = new Date(fechaInicio);
//     const cierre = new Date(fechaCierre);
//     // Restar la fecha de cierre de la fecha de inicio y obtener la diferencia en milisegundos
//     const diff = cierre.getTime() - inicio.getTime();
//     // Convertir los milisegundos en días redondeando hacia abajo
//     const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
//     // Retornar el intervalo de tiempo en días
//     return dias;
//   }

d3.dsv(';', 'dataset.csv', d3.autoType).then(data => {
  data = data.filter(d => d.estado_del_contacto == 'Cerrado')
  data.forEach(function(d) {
    if (d.fecha_cierre_contacto.includes(" ")) {
      d.fecha_cierre_contacto = d.fecha_cierre_contacto.substring(0, d.fecha_cierre_contacto.indexOf(" "));
    }
  });
  const parseTime = d3.timeParse('%d/%m/%Y')
  data.forEach(function(d) {
      d.fecha_ingreso = parseTime(d.fecha_ingreso);
      d.fecha_cierre_contacto = parseTime(d.fecha_cierre_contacto);
  });
  data.forEach(function(d) {
    d.diff = d3.timeDay.count(d.fecha_ingreso, d.fecha_cierre_contacto);
  });
  // Iterar sobre los datos y calcular el intervalo de tiempo para cada dato
  // data.forEach(dato => {
  //   const intervalo = calcularIntervalo(dato.fecha_ingreso, dato.fecha_cierre_contacto);
  //   console.log(`El intervalo de tiempo para el dato ${dato} es de ${intervalo} días.`);
  // });
  
  let chart = Plot.plot({
    marks: [
      Plot.rectY(data.filter(d => d.diff >= 20), Plot.binX({y:'count',}, {
        x: 'diff', 
        thresholds: 5,
        fill: 'prestacion',
        fillOpacity: 0.6,
        stroke: 'prestacion',
        strokeOpacity: 0.8,
        strokeWidth: 0.1,
        title: 'prestacion',
      })),
        //x: (d) => d.diff,
        //y: () => 1,
    ],
    color: {
      scheme: 'spectral',
    },
    width: 400,
    height: 400,
    })
    d3.select('#chart').append(() => chart)
})