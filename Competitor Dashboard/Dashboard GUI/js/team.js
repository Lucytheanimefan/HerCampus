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
/*var colors = ['white', '#FF0066', '#FF0066', '#FCBD12', '#FCBD12', '#FCBD12', '#6640CC', '#6640CC', '#6640CC']
var circleLocations = [];
for (var i = 0; i < colors.length; i++) {
    circleLocations[i] = [40 + i * 70, colors[i]];
}
*/

var circleLocations = [
    [40, 'white'],
    [140, '#FF0066'],
    [190, '#FF0066'],
    [290, '#FCBD12'],
    [340, '#FCBD12'],
    [390, '#FCBD12'],
    [490, '#6640CC'],
    [540, '#6640CC'],
    [590, '#6640CC']
];

console.log(circleLocations);

var leftCol = d3.select("#leftColumn").append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 650")
    //class to make it responsive
    .classed("svg-content-responsive", true);


var line = leftCol.append("line")
    .style("stroke", "white")
    .attr("x1", 130)
    .attr("y1", 40)
    .attr("x2", 130)
    .attr("y2", 590);

leftCol.selectAll("circle")
    .data(circleLocations)
    .enter().append("circle")
    .style("stroke", function(d, i) {
        console.log(d[1]);
        return d[1];
    })
    .style("r", 7)
    .style("fill", "#2C3546")
    .attr("cx", 130)
    .attr("cy", function(d, i) {
        console.log(d[0]);
        return d[0];
    })

var textCoords = [0, 1, 2.3];
var titles = ['OFFICE TEAM', 'CHAPTERS', 'HC NETWORK'];
leftCol.selectAll('rect')
    .data(textCoords)
    .enter().append('rect')
    .attr('x', 110)
    .attr('y', function(d) {
        return 70 + d * 150;
    })
    .attr('width', 150)
    .attr('height', 50)
    .attr('fill', '#2C3546')

leftCol.selectAll('text')
    .data(titles)
    .enter().append('text')
    .attr('x', 130)
    .attr('y', function(d, i) {
        var j;
        if (i == 2) {
            j = 2.3;
        } else {
            j = i;
        }
        return 100 + j * 150;
    })
    .attr('width', 130)
    .attr('height', 50)
    .attr('fill', 'white')
    .attr('class', 'teamSizeTitles')
    .text(function(d) {
        return d;
    });

var teamText = [
    [140, 'FULL TIME EMPLOYEES'],
    [190, 'INTERNS'],
    [290, 'CHAPTER ADVISORS'],
    [340, 'CHAPTER EXPANSION ASSISTANTS'],
    [390, 'CHAPTER TEAM MEMBERS'],
    [490, 'NATIONAL WRITERS/BLOGGERS'],
    [540, 'IHC ACTIVE MEMBERS'],
    [590, 'HIGH SCHOOL AMBASSADORS']
];
var teamNumbers = [22, 40, 49, 28, 7000, 113, 1400, 545];

//right text
leftCol.selectAll('text.teamSize')
    .data(teamText)
    .enter().append('text')
    .attr('x', 100)
    .attr('y', function(d) {
      console.log(d);
        return d[0];
    })
    .attr('width', 130)
    .attr('height', 50)
    .attr('fill', 'white')
    .attr('class', 'teamSizeText')
    .text(function(d) {
      console.log(d);
        return d[1];
    });
