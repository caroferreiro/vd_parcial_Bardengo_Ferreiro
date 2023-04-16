
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

Promise.all([
  d3.csv('/data/dataset.csv', d3.autoType),
  d3.csv('/data/dataset_dic.csv', d3.autoType)
  ]).then(([data_ene, data_dic]) => {
  
  // Combinar los dos conjuntos de datos en uno solo
  const data = d3.merge([data_ene, data_dic]);

  let casos_abiertos = data.filter(d => d.estado_del_contacto == 'Abierto');


  // Realiza un plot con el nuevo conjunto de datos
  // ...
  
});

  
  
  
  
  