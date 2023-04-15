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
      d.diff = d3.timeDay.count(d.fecha_ingreso, d.fecha_cierre_contacto);
  });

  console.log(data)
  // Iterar sobre los datos y calcular el intervalo de tiempo para cada dato
  // data.forEach(dato => {
  //   const intervalo = calcularIntervalo(dato.fecha_ingreso, dato.fecha_cierre_contacto);
  //   console.log(`El intervalo de tiempo para el dato ${dato} es de ${intervalo} días.`);
  // });
  
  // let chart = Plot.plot({
  //   marks: [
  //     Plot.ruleY([0]),
  //     Plot.rectY(data.filter(d => d.diff >= 10), Plot.binX({y:'count'},
  //       Plot.groupY({x:'sum'}, {
  //       x: 'diff', 
  //       thresholds: 8,
  //       fill: 'diff',
  //       fillOpacity: 0.6,
  //       stroke: 'prestacion',
  //       strokeOpacity: 0.8,
  //       strokeWidth: 0.1,
  //       title: 'prestacion',
  //     }))),
  let chart = Plot.plot({
    marks: [
      Plot.ruleY([0]),
      Plot.barX(data.filter(d => d.diff >= 10), Plot.binX({y:'count'},
        Plot.groupY({x:'sum'}, {
        x: 'diff', 
        thresholds: 8,
        fill: 'diff',
        fillOpacity: 0.6,
        stroke: 'prestacion',
        strokeOpacity: 0.8,
        strokeWidth: 0.1,
        title: 'prestacion',
      }))),
        //x: (d) => d.diff,
        //y: () => 1,
      Plot.axisX({
        label: 'Días que tardó en resolverse →',
        labelOffset: 35,
        ticks: 8,
      }),
      Plot.axisY({
        label: 'Cantidad de denuncias ↑',
        labelOffset: 27,
        ticks: 6,
      }),
    ],
    color: {
      scheme: 'gnbu',
    },
    width: 400,
    height: 400,
    insetLeft: 10,
    insetRight: 10,
    insetTop: 10,
    marginBottom: 40,
    })
    d3.select('#chart').append(() => chart)
})