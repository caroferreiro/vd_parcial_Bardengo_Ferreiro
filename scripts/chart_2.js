d3.dsv(';', '/data/dataset.csv', d3.autoType).then(data => {
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

  let data2 = d3.bin()
    .value(d => d.diff)(data)
    .map(d => {
      return {cant: d.length, diffDesde: d.x0, diffHasta: d.x1}
    })
    .sort((a, b) => b.diffHasta - a.diffDesde)
  console.log(data2)
  let chart = Plot.plot({
    marks: [
      Plot.ruleY([90]),
      Plot.barX(data2.filter(d => d.diffHasta > 10), { 
        x: 'diffHasta',
        y: 'cant',
        thresholds: 8,
        fill: 'diffHasta',
        fillOpacity: 0.6,
        stroke: 'diffHasta',
        strokeOpacity: 1,
        strokeWidth: 0.6,
        // title: (d) => `${d.diffDesde}, ${d.diffHasta}`,
        sort: {y: 'y', reverse:true},
      }),
      Plot.barX(data2.filter(d => d.diffHasta > 90), { 
        x: 'diffHasta',
        y: 'cant',
        thresholds: 8,
        fill: 'diffHasta',
        fillOpacity: 0.3,
        stroke: 'diffHasta',
        strokeOpacity: 1,
        strokeWidth: 0.6,
        title: (d) => `${d.diffDesde}, ${d.diffHasta}`,
        sort:(a,b) => d3.descending(a.diffHasta, b.diffHasta)
      }),
      Plot.axisX({
        label: 'Días que tardó en resolverse →',
        labelOffset: 40,
        fontSize: 12,
        ticks: 8,
      }),
      Plot.axisY({
        label: 'Cantidad de denuncias →',
        labelOffset: 44,
        fontSize: 12,
        ticks: 6,
      }),
    ],
    x: {
      domain: [1, d3.max(data2, d => d.diffHasta)],
    },
    color: {
      scheme: 'gnbu',
      // pivot: 10,
      pivot: 55,
    },
    fontFamily: 'sans-serif',
    zero: false,
    width: 400,
    height: 400,
    insetLeft: 10,
    insetRight: 10,
    insetTop: 0,
    marginBottom: 40,
    marginLeft: 47,
    })
    d3.select('#chart_2').append(() => chart)
})