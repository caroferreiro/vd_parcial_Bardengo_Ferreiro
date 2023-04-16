
// d3.csv('/data/dataset.csv', d3.autoType).then(data_ene => {
//     d3.csv('/data/dataset_dic.csv', d3.autoType).then(data_dic => {
      
//     // Combinar los dos conjuntos de datos en uno solo
//     const data = data_ene.map((d, i) => Object.assign({}, d, data_dic[i]));
//     console.log(data)
//     let casos_abiertos = data.filter(
//       d => d.estado_del_contacto == 'Abierto',
//     )
  
//       // Configurar la visualización
//       const chart = Plot.plot({
//         marks: [
//           Plot.line(casos_abiertos, )
//         ]
//       });
      
//     });
//   });

dataEnero = d3.dsv(';', '/data/dataset.csv', d3.autoType)
dataDiciembre = d3.dsv(';', '/data/dataset_dic.csv', d3.autoType)

Promise.all([dataEnero, dataDiciembre]).then(([data_ene, data_dic]) => {
  // Combinar los dos conjuntos de datos en uno solo
  const data = d3.merge([data_ene, data_dic]);
  let casos_abiertos = data.filter(d => d.estado_del_contacto == 'Abierto');
  let chart = Plot.plot({
    marks: [
      Plot.ruleX([1]),
      Plot.line(data_ene, Plot.groupY({x:'sum'}, {
        y: 'estado_del_contacto',
      })),
      Plot.line(data_dic, Plot.groupY({x:'sum'}, {
        y: 'estado_del_contacto',
      })),
      // Plot.axisX({
      //   label: 'Días que tardó en resolverse →',
      //   labelOffset: 35,
      //   ticks: 8,
      // }),
      // Plot.axisY({
      //   label: 'Cantidad de denuncias ↑',
      //   labelOffset: 27,
      //   ticks: 6,
      // }),
    ],
    color: {
      scheme: 'gnbu',
    },
    width: 400,
    height: 200,
    insetLeft: 10,
    insetRight: 10,
    insetTop: 10,
    marginBottom: 40,
    marginLeft: 60,
    })
    d3.select('#chart').append(() => chart)
})



  
  
  
  
  