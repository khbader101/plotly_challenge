d3.json('samples.json').then((data)=> {
    var string = data.names;
    console.log(data.metadata);
    var fixed = d3.selectAll('#selDataset');
    Object.entries(string).forEach(([i,j]) =>{
        fixed.append('option').text(j);
    })
})


function graph(sampleData) {
    d3.json('samples.json').then((data)=> {
        var samples = data.samples;

        var numbers = samples.map(row=>row.id).indexOf(sampleData);

        var topTen = samples.map(row=>row.sample_values);
        var topTen = topTen[numbers].slice(0,10).reverse();

        var topTenId = samples.map(row=>row.otu_ids);
        var topTenId = topTenId[numbers].slice(0,10);

        var labels = samples.map(row=>row.otu_labels);
        var labels = labels[numbers].slice(0,10);

        var trace = {
            x: topTen,
            y: topTenId.map(x=> `UTO ${x}`),
            text: labels,
            type: 'bar',
            orientation: 'h'
        };
        var data = [trace]

      Plotly.newPlot('bar', data);
    });
        
    }
    
graph("940");


