d3.dsv(';', 'dataset.csv', d3.autoType).then(data => {
    console.log(data);
    let chart = Plot.plot({
      marks: [
        Plot.dot(data, {
          x: 'lon',
          y: 'lat',
          //sort: { y: 'x', reverse: true, limit: 10 },
        }),
      ],
      x: {
        grid: true,
      },
      marginLeft: 100,
    })
    d3.select('#chart').append(() => chart)
  })