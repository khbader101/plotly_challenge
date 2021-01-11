d3.json('samples.json').then((data)=> {
    var string = data.names;
    console.log(data.metadata);
    var fixed = d3.selectAll('#selDataset');
    Object.entries(string).forEach(([i,j]) =>{
        fixed.append('option').text(j);
    })
})


function build(sampleData)
{
    d3.json("samples.json").then((dataset) => 
    {
        console.log(dataset);
        var sampleMetadata = dataset.metadata;

        var results = sampleMetadata.filter(s=>s.id == sampleData);
        console.log(results);

        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(results[0]).forEach(([key,value])=>
        {
            panel.append("h6").text(`${key}:${value}`);
        });
    });
};

function buildplots(sampleData) {
    d3.json('samples.json').then((data)=> {
        var samples = data.samples;

        var numbers = samples.map(row=>row.id).indexOf(sampleData);

        var topTenValue = samples.map(row=>row.sample_values);
        var topTenValue = topTenValue[numbers].slice(0,10).reverse();

        var topTenId = samples.map(row=>row.otu_ids);
        var topTenId = topTenId[numbers].slice(0,10);

        var labels = samples.map(row=>row.otu_labels);
        var labels = labels[numbers].slice(0,10);

        var trace = {
            x: topTenValue,
            y: topTenId.map(x=> `UTO ${x}`),
            text: labels,
            type: 'bar',
            orientation: 'h'
        };
        var barData = [trace]

      Plotly.newPlot('bar', barData);
    

        var sValue = samples.map(row=>row.sample_values);
        var sValue = sValue[numbers];

        var otuID = samples.map(row=>row.otu_ids);
        var otuID = otuID[numbers];

        var otuLabels = samples.map(row=>row.otu_labels);
        var otuLabels = otuLabels[numbers];

        var bubbleTrace = 
        {
          x: otuID,
          y: sValue,
          mode: "markers",
          marker: 
          {
              color: otuID,
              size: sValue
          },
          text: otuLabels
        };
        var bubbleData = [bubbleTrace];
        var bubbleLayout = 
        {
          title: "Bubble",
          xaxis: { title: "otu_id"},
          yaxis: { title: "sample_value"}
        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
};
    
    function optionChanged(sampleData)
    {
        build(sampleData)
        buildplots(sampleData);
    };


