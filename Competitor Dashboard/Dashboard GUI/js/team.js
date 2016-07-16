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
    [50, 'white'],
    [150, '#FF0066'],
    [200, '#FF0066'],
    [300, '#FCBD12'],
    [350, '#FCBD12'],
    [400, '#FCBD12'],
    [500, '#6640CC'],
    [550, '#6640CC'],
    [600, '#6640CC']
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
    .attr("y1", 50)
    .attr("x2", 130)
    .attr("y2", 600);

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

var teamData = [
    [150, 'FULL TIME EMPLOYEES', 22],
    [200, 'INTERNS', 40],
    [300, 'CHAPTER ADVISORS', 49],
    [350, 'CHAPTER EXPANSION ASSISTANTS', 28],
    [400, 'CHAPTER TEAM MEMBERS', 7000],
    [500, 'NATIONAL WRITERS/BLOGGERS', 113],
    [550, 'IHC ACTIVE MEMBERS', 1400],
    [600, 'HIGH SCHOOL AMBASSADORS', 545]
];

//team size text
leftCol.selectAll('text.teamSize')
    .data(teamData)
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

//team size stats
leftCol.selectAll('text.teamStats')
    .data(teamData)
    .enter().append('text')
    .attr('x', 80)
    .attr('y', function(d) {
        console.log(d);
        return d[0];
    })
    .attr('width', 130)
    .attr('height', 50)
    .attr('fill', 'white')
    .attr('class', 'teamSizeStats')
    .text(function(d) {
        console.log(d);
        return d[2];
    });


//main title
leftCol.append('text')
    .attr('x', 170)
    .attr('y', 50)
    .attr('font-size', '50px')
    .attr('fill', 'white')
    .text("9,000")

leftCol.append('text')
    .attr('x', 160)
    .attr('y', 74)
    .attr('font-size', '20px')
    .attr('fill', 'white')
    .text("TOTAL HCM TEAM SIZE")

//append svg image
var g = leftCol.append('g')
var img = g.append('svg:image')
img = g.append("svg:image")
    .attr("xlink:href", "css/Images/Team_Woman.svg")
    .attr("width", 80)
    .attr("height", 80)
    .attr('x', 40)
    .attr('y', 0)



/*---------------Total active chapters----------*/
var activeCh = d3.select("#activeChapters").append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 325")
    //class to make it responsive
    .classed("svg-content-responsive", true);


var line = activeCh.append("line")
    .style("stroke", "white")
    .attr("x1", 130)
    .attr("y1", 50)
    .attr("x2", 130)
    .attr("y2", 300);

var activeChCirceLocs = [
    [50, 'white'],
    [170, '#FCBD12'],
    [220, '#FCBD12']
];
activeCh.selectAll("circle")
    .data(activeChCirceLocs)
    .enter().append("circle")
    .style("stroke", function(d) {
        return d[1];
    })
    .style("r", 7)
    .style("fill", "#2C3546")
    .attr("cx", 130)
    .attr("cy", function(d) {
        return d[0];
    })

//main title
var totalActiveCh = "300+";
activeCh.append('text')
    .attr('x', 170)
    .attr('y', 50)
    .attr('font-size', '50px')
    .attr('fill', 'white')
    .text(totalActiveCh);

activeCh.append('text')
    .attr('x', 160)
    .attr('y', 74)
    .attr('font-size', '20px')
    .attr('fill', 'white')
    .text("TOTAL ACTIVE CHAPTERS")

var activeChData = [
    [170, 'US + PUERTO RICO', 270],
    [220, 'INTERNATIONAL', 30]
];

activeCh.selectAll('text.activeCh')
    .data(activeChData)
    .enter().append('text')
    .attr('x', 100)
    .attr('y', function(d) {
        console.log(d);
        return d[0];
    })
    .attr('width', 130)
    .attr('height', 50)
    .attr('fill', 'white')
    .attr('class', 'activeChText')
    .text(function(d) {
        console.log(d);
        return d[1];
    });

activeCh.selectAll('text.activeChStat')
    .data(activeChData)
    .enter().append('text')
    .attr('x', 80)
    .attr('y', function(d) {
        console.log(d);
        return d[0];
    })
    .attr('width', 130)
    .attr('height', 50)
    .attr('fill', 'white')
    .attr('class', 'activeChStats')
    .text(function(d) {
        console.log(d);
        return d[2];
    });

//append svg image
var g = activeCh.append('g')
var img = g.append('svg:image')
img = g.append("svg:image")
    .attr("xlink:href", "css/Images/Team_Chapters.svg")
    .attr("width", 80)
    .attr("height", 80)
    .attr('x', 40)
    .attr('y', 5)


/*--------------Overall avg team members--------------*/
var teamMem = d3.select("#teamMembers").append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 325")
    //class to make it responsive
    .classed("svg-content-responsive", true);


var line = teamMem.append("line")
    .style("stroke", "white")
    .attr("x1", 130)
    .attr("y1", 50)
    .attr("x2", 130)
    .attr("y2", 300);

var teamMemCirceLocs = [
    [50, 'white'],
    [170, "#FF0066"],
    [220, "#FF0066"]
];
teamMem.selectAll("circle")
    .data(teamMemCirceLocs)
    .enter().append("circle")
    .style("stroke", function(d) {
        return d[1];
    })
    .style("r", 7)
    .style("fill", "#2C3546")
    .attr("cx", 130)
    .attr("cy", function(d) {
        return d[0];
    })

//main title
var overallAvgNum = "26";
teamMem.append('text')
    .attr('x', 170)
    .attr('y', 50)
    .attr('font-size', '50px')
    .attr('fill', 'white')
    .text(overallAvgNum);

teamMem.append('text')
    .attr('x', 160)
    .attr('y', 74)
    .attr('font-size', '20px')
    .attr('fill', 'white')
    .text("OVERALL AVERAGE # TEAM MEMBERS")

var teamMemData = [
    [170, 'US + PUERTO RICO', 26],
    [220, 'INTERNATIONAL', 30]
];

teamMem.selectAll('text.teamMem')
    .data(teamMemData)
    .enter().append('text')
    .attr('x', 100)
    .attr('y', function(d) {
        console.log(d);
        return d[0];
    })
    .attr('width', 130)
    .attr('height', 50)
    .attr('fill', 'white')
    .attr('class', 'teamMemText')
    .text(function(d) {
        console.log(d);
        return d[1];
    });

teamMem.selectAll('text.teamMemStat')
    .data(teamMemData)
    .enter().append('text')
    .attr('x', 80)
    .attr('y', function(d) {
        return d[0];
    })
    .attr('width', 130)
    .attr('height', 50)
    .attr('fill', 'white')
    .attr('class', 'teamMemStats')
    .text(function(d) {
        console.log(d);
        return d[2];
    });

//append svg image
var g = teamMem.append('g')
var img = g.append('svg:image')
img = g.append("svg:image")
    .attr("xlink:href", "css/Images/Team_Cap.svg")
    .attr("width", 80)
    .attr("height", 80)
    .attr('x', 40)
    .attr('y', 5)
