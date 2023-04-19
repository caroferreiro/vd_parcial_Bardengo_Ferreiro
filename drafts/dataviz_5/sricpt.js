const mapa = d3.json('barrios-caba.geojson')
dataEnero = d3.dsv(';', '/data/dataset.csv', d3.autoType)
dataDiciembre = d3.dsv(';', '/data/dataset_dic.csv', d3.autoType)

Promise.all([dataEnero, dataDiciembre]).then(([data_ene, data_dic]) => {
    /* Agrupamos los datasets de enero y diciembre */
    const datos_total = d3.merge([data_ene, data_dic]);

    var parseTime = d3.timeParse('%d/%m/%Y');
    datos_total.forEach(function(d) {
        d.fecha_ingreso = parseTime(d.fecha_ingreso);
    });
    console.log(data)

    var formatMonth = d3.timeFormat('%m');
        datos_total.forEach(function(d) {
        d.mes = formatMonth(d.fecha_ingreso);
    });

    Promise.all([mapa, datos_total]).then(([barrios, data]) => {

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
        facet: {
            data: data,
            x: 'mes',
        },
    //   fx: {
    //     domain: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']
    //   },
        width: 1000,
        height: 400,
        })
        d3.select('#chart_1').append(() => chartMap)
    })
})
