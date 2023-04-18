dataEnero = d3.dsv(';', '/data/dataset.csv', d3.autoType)
dataDiciembre = d3.dsv(';', '/data/dataset_dic.csv', d3.autoType)

Promise.all([dataEnero, dataDiciembre]).then(([data_ene, data_dic]) => {
  // Combinar los dos conjuntos de datos en uno solo
  const data = d3.merge([data_ene, data_dic]);
  var parseTime = d3.timeParse('%d/%m/%Y');
  data.forEach(function(d) {
  d.fecha_ingreso = parseTime(d.fecha_ingreso);
});

var formatMonth = d3.timeFormat('%m');
  data.forEach(function(d) {
  d.mes = formatMonth(d.fecha_ingreso);
});

var formatDay = d3.timeFormat('%d');
  data.forEach(function(d) {
  d.dia = formatDay(d.fecha_ingreso);
});

  let enero = data.filter(d => d.mes == '01');
  let dic = data.filter(d => d.mes == '12');
  console.log(enero.filter(d => d.estado_del_contacto == 'Abierto'))
  let chart = Plot.plot({
    marks: [
      Plot.ruleX([0]),
      Plot.ruleY([0]),
      Plot.line(enero.filter(d => d.estado_del_contacto == 'Abierto'), Plot.binX({y:'sum'} ,{
        x: 'dia',
        stroke: 'mes',
        strokeWidth: 3.2,
      })),
      // Plot.line(enero.filter(d => d.estado_del_contacto == 'Cerrado'), Plot.binX({y:'sum'} ,{
      //   x: 'dia',
      // })),
      Plot.line(dic.filter(d => d.estado_del_contacto == 'Abierto'), Plot.binX({y:'count'}, {
        x: 'dia',
        stroke: 'mes',
        strokeWidth: 3.2,
      })),
      // Plot.line(dic.filter(d => d.estado_del_contacto == 'Cerrado'), Plot.binX({y:'sum'}, {
      //   x: 'dia',
      // })),
      Plot.axisX({
        label: 'Días del mes →',
        labelOffset: 35,
        fontSize: 12,
        ticks: 20,
      }),
      Plot.axisY({
        label: 'Cantidad de denuncias abiertas ↑',
        labelOffset: 27,
        fontSize: 12,
        ticks: 6,
      }),
    ],
    x: {
      domain: [1, 31],
    },
    color: {
      range: ['YellowGreen', 'CornflowerBlue'],
    },
    fontFamily: 'sans-serif',
    width: 500,
    height: 300,
    insetLeft: 10,
    insetRight: 10,
    insetTop: 10,
    marginBottom: 40,
    marginLeft: 30,
    })
    d3.select('#chart_3').append(() => chart)
})



  
  
  
  
  