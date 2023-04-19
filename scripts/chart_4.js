const mapaFch = d3.json('../data/barrios-caba.geojson')
const dataFch = d3.dsv(';', '../data/dataset_dic.csv', d3.autoType)

Promise.all([mapaFch, dataFch]).then(([barrios, data]) => {
  
  /* Agrupamos reclamos x barrio */
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log('reclamosPorBarrio', reclamosPorBarrio)
  
  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 10,
      scheme: 'gnbu',
      type: 'cyclical',
      domain: [0, 1500],
      range: [0, 1],
      strokeWidth: 3,
      label: 'Cantidad de denuncias',
      legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO
          let cantReclamos = reclamosPorBarrio.get(nombreBarrio).length
          return cantReclamos
        },
        stroke: '#ccc',
        title: d => `${d.properties.BARRIO}\n${reclamosPorBarrio.get(d.properties.BARRIO).length} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          fill: "currentColor",
          stroke: null,
          textAnchor: "center",
          fontWeight: 'bold',
          dx: 4,
          filter: (d) => reclamosPorBarrio.get(d.properties.BARRIO).length > 500
        })
      )
    ],
    width: 300,
    height: 300,
  })
  d3.select('#chart_4').append(() => chartMap)
})
