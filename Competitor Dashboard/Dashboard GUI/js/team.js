/*$('#leftColumn').timelineMe({
  items: [
    {
      type: 'milestone',
      label: 'my label 1'
    },
    {
      type: 'smallItem',
      label: 'my label 2',
      shortContent: 'short description',
      fullContent: 'big description <br> with more lines <br> than the short one. <br> <div style="text-align: center;"><img src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png" style="width: 50%;" /></div>',
      showMore: 'show more',
      showLess: 'show less'
    },
    {
      type: 'bigItem',
      label: '<span style="background-color: #2C3546;">my label 3</span>',
      shortContent: 'short description',
      fullContent: 'big description <br> with more lines <br> than the short one. <br> <div style="text-align: center;"><img src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png" style="width: 50%;" /></div>',
      showMore: 'show more',
      showLess: 'show less'
    }
  ]
});
*/

// Left column

var circleLocations = [
    [10, 'white'],
    [50, '#FF0066'],
    [100, '#FCBD12'],
    [150, '#6640CC']
];
var leftCol = d3.select("#leftColumn").append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 500")
    //class to make it responsive
    .classed("svg-content-responsive", true);

var line = leftCol.append("line")
    .style("stroke", "white")
    .attr("x1", 100)
    .attr("y1", 50)
    .attr("x2", 100)
    .attr("y2", 5000);

leftCol.selectAll("circle")
    .data(circleLocations)
    .enter().append("circle")
    .style("stroke", function(d, i) {
        console.log(d[1]);
        return d[1];
    })
    .style("r", 5)
    .style("fill", "none")
    .attr("cx", 100)
    .attr("cy", function(d, i) {
        console.log(d[0]);
        return d[0];
    })
