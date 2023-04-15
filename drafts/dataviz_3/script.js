// const data_ene = d3.dsv( ';','/data/dataset.csv', d3.autoType )
// const data_dic = d3.dsv(';', '/data/dataset_dic.csv', d3.autoType)


// Promise.all([data_ene, data_dic]).then(([enero, diciembre]) => {
//     let chart = Plot.plot({
//         marks: [
//             Plot.line(enero,diciembre, 
            
//             )
//         ]
//     })

// })

d3.csv('/data/dataset.csv', d3.autoType).then(data_ene => {
    d3.csv('/data/dataset_dic.csv', d3.autoType).then(data_dic => {
      
      // Combinar los dos conjuntos de datos en uno solo
    const data = data_ene.map((d, i) => Object.assign({}, d, data_dic[i]));
    
    let casos_abiertos = data.filter(
      d => d.estado_del_contacto == 'Abierto',
    )
  
      // Configurar la visualización
      const chart = Plot.plot({
        marks: [
          Plot.line(casos_abiertos, )
        ]
      });
      
    });
  });

  
  
  
  
  