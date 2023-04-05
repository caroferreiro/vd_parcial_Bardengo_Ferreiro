// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [3],
}
d3.formatDefaultLocale(locale)

d3.dsv(';', 'dataset.csv', d3.autoType).then(data => {
    console.log(data);
    let chart = Plot.plot({
      width: 600,
      height: 600,
      marks: [
        Plot.dot(data, {
          x: d => +d.lon,
          y: d => +d.lat,
          // title: 'canal'
          // r: 10,
          //sort: { y: 'x', reverse: true, limit: 10 },
        }),
      ],
      x: {
        grid: true,
      },
      // marginLeft: 10,
    })
    d3.select('#chart').append(() => chart)
  })