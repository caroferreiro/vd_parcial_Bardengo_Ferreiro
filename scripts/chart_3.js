//dataEnero = d3.dsv(';', '../data/dataset.csv', d3.autoType)


// Promise.all([dataEnero, dataDiciembre]).then(([data_ene, data_dic]) => {
//   // Combinar los dos conjuntos de datos en uno solo
//   const data = d3.merge([data_ene, data_dic]);
//   var parseTime = d3.timeParse('%d/%m/%Y');
//   data.forEach(function(d) {
//   d.fecha_ingreso = parseTime(d.fecha_ingreso);
// });
// }

d3.dsv(';', '../data/dataset_dic.csv', d3.autoType).then(data_dic => {

  var parseTime = d3.timeParse('%d/%m/%Y');
  data_dic.forEach(function(d) {
  d.fecha_ingreso = parseTime(d.fecha_ingreso);
  })

  // let data_cant = d3.bin()
  // .value(d => d.dia)(data_dic.filter(d => d.estado_del_contacto == 'Abierto'))
  // .map(d => {
  //   return {cant: d.length,}
  // })
  // console.log(data_cant)

  var formatMonth = d3.timeFormat('%m');
    data_dic.forEach(function(d) {
    d.mes = formatMonth(d.fecha_ingreso);
  });

  var formatDay = d3.timeFormat('%d');
    data_dic.forEach(function(d) {
    d.dia = formatDay(d.fecha_ingreso);
  });

    //let enero = data.filter(d => d.mes == '01');
    //let dic = data.filter(d => d.mes == '12');
    //console.log(enero.filter(d => d.estado_del_contacto == 'Abierto'))
    let chart = Plot.plot({
      marks: [
        Plot.ruleX([0]),
        Plot.ruleY([0]),
        // Plot.line(enero.filter(d => d.estado_del_contacto == 'Abierto'), Plot.binX({y:'sum'} ,{
        //   x: 'dia',
        //   stroke: 'mes',
        //   strokeWidth: 3.2,
        // })),
        // Plot.line(enero.filter(d => d.estado_del_contacto == 'Cerrado'), Plot.binX({y:'sum'} ,{
        //   x: 'dia',
        // })),
        Plot.line(data_dic.filter(d => d.estado_del_contacto == 'Abierto'), Plot.binX({y:'count'}, {
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
        // Plot.text(data_cant.filter(d=>d.cant<150), {
        //   //x: d => d.dia + 2, // position the text to the right of the bar
        //   y: d => d.cant , // position the text at the center of the bar
        //   text: d => d3.format('.0f')(d.cant), // set the text to the value of mision_hs
        //   fill: 'black',
        //   textAnchor: 'start', // align the text to the left of the x position
        //   fontWeight: 'bold',
        //   fontSize: 14,
        // }),
      ],
      x: {
        domain: [1, 31],
      },
      color: {
        range: ['CornflowerBlue'],
          //'YellowGreen', 
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
