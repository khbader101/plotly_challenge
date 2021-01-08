d3.json('sample.json').then((data)=> {
    var string = data.name;
    console.log(data.metadata);
    var fixed = d3.selectAll('#selDataset');
    Object.defineProperties(string).forEach(([i,j]) =>{
        fixed.append('option').text(j);
    })
})
