// d3.dsv(';', 'dataset.csv', d3.autoType).then(data => {
//     let transito = data.filter(d => d.prestacion == 'VEHÍCULO MAL ESTACIONADO')
    
//     data.forEach(function(d) {
//         d.fecha = d3.timeParse("%d/%m/%Y")(d.fecha);
//         d.valor = +d.valor; // asegurarse de que el valor sea de tipo numérico
//       });

//       data.forEach(function(d) {
//         d.mes = d3.timeFormat("%b")(d.fecha);
//         console.log(d.mes)
//       });

//     //   var datosPorMes = d3.nest()
//     //     .key(function(d) { return d.mes; })
//     //     .rollup(function(v) { return d3.sum(v, function(d) { return d.valor; }); })
//     //     .entries(datos);
//     //     console.log(datosPorMes)
    
//     let chart = Plot.plot({
//         width: 600,
//         height: 600,
//         marks: [
//           Plot.lineY(data, {
//             x: datosPorMes,
//             y: () => 1,
//             bin: {
//               scale: "x",
//               step: 5,
//             },
//           }),
//         ]
//         })
//         d3.select('#chart').append(() => chart)
// })