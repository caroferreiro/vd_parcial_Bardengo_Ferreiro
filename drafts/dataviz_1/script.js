// // config. números español
// const locale = {
//   decimal: ',',
//   thousands: '.',
//   grouping: [3],
// }
// d3.formatDefaultLocale(locale)

// d3.dsv(';', 'dataset.csv', d3.autoType).then(data => {
//     console.log(data);
//     let chart = Plot.plot({
//       width: 600,
//       height: 600,
//       marks: [
//         Plot.dot(data, {
//           x: d => +d.lon,
//           y: d => +d.lat,
//           // title: 'canal'
//           // r: 10,
//           //sort: { y: 'x', reverse: true, limit: 10 },
//         }),
//       ],
//       x: {
//         grid: true,
//       },
//       // marginLeft: 10,
//     })
//     d3.select('#chart').append(() => chart)
//   })

const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'dataset.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      scheme: 'ylorbr',
    },
    marks: [
      Plot.density(data, { x: 'lon', y: 'lat', fill: 'density', bandwidth: 15, thresholds: 30 }),
      Plot.geo(barrios, {
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
    ],
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart').append(() => chartMap)
})