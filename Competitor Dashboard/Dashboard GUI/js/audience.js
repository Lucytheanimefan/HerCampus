var colors = ["#6640CC ", "#FF0066", "#FCBD12", "#00D2C1"]
var aquablue = d3.rgb(0, 214, 194);
var hotpink = d3.rgb(255, 0, 102);
var indigo = d3.rgb(102, 64, 204);

//------------------------------Newsletter-------------------------




//------------------------------MONTHLY UNIQUES/PAGEVIEW-------------------------
var newData = [{
    "interest_rate": "HC.COM",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}, {
    "interest_rate": "TEEN VOGUE",
    "Facebook": 300,
    "Twitter": 150,
    "Pinterest": 206,
    "Instagram": 60
}];



var dataset = [{
    data: [{
        month: 'May Uniques',
        count: 123
    }, {
        month: 'May Pageviews',
        count: 234
    }],
    name: 'Her Campus'
}, {
    data: [{
        month: 'May Uniques',
        count: 235
    }, {
        month: 'May Pageviews',
        count: 267
    }],
    name: 'InfluenceHer Collective'
}, {
    data: [{
        month: 'May Uniques',
        count: 235
    }, {
        month: 'May Pageviews',
        count: 267
    }],
    name: 'BetchesLoveThis.com'
}];

var chart = c3.generate({
    bindto: '#monthlyUniquesdiv',
    data: {
        x: 'x',
        columns: [
            ['x', 'Uniques', 'Pageviews'],
            ['Her Campus', 30, 200, 100, 400],
            ['InfluenceHer Collective', 90, 100, 140, 200],
            ['BetchesLoveThis.com', 50, 120, 130, 210]
        ],
        groups: [
            ['Her Campus', 'InfluenceHer Collective', 'BetchesLoveThis.com']
        ],
        colors: {
            'Her Campus': '#FF0066',
            'InfluenceHer Collective': '#00D6C2',
            'BetchesLoveThis.com': '#6640CC',

        },
        type: 'bar'
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});

//------------------------------SOCIAL MEDIA REACH-------------------------------

/*
################ formats ##################
-------------------------------------------
*/


var formatAsPercentage = d3.format("%"),
    formatAsPercentage1Dec = d3.format(".1%"),
    formatAsInteger = d3.format(","),
    fsec = d3.time.format("%S s"),
    fmin = d3.time.format("%M m"),
    fhou = d3.time.format("%H h"),
    fwee = d3.time.format("%a"),
    fdat = d3.time.format("%d d"),
    fmon = d3.time.format("%b");

/*
############# pie chart ###################
-------------------------------------------
*/

function dsPieChart() {

    var dataset = [{
        category: "BETCHES",
        measure: 0.30
    }, {
        category: "NATIONAL",
        measure: 0.25
    }, {
        category: "CHAPTERS",
        measure: 0.25
    }, {
        category: "INFLUENCEHER",
        measure: 0.2
    }];

    var width = 400,
        height = 400,
        outerRadius = Math.min(width, height) / 2,
        innerRadius = outerRadius * .999,
        // for animation
        innerRadiusFinal = outerRadius * .5,
        innerRadiusFinal3 = outerRadius * .45,
        color = d3.scale.ordinal()
        .range(["#6640CC ", "#FF0066", "#FCBD12", "#00D2C1"]); //builtin range of colors
    ;

    var vis = d3.select("#pieChart")
        .append("svg:svg") //create the SVG element inside the <body>
        .data([dataset]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")") //move the center of the pie chart from 0, 0 to radius, radius
    ;

    /**
        vis.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill",function(d){return "#2C3546";})
    **/
    var arc = d3.svg.arc() //this will create <path> elements for us using arc data
        .outerRadius(outerRadius).innerRadius(innerRadius);

    // for animation
    var arcFinal = d3.svg.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
    var arcFinal3 = d3.svg.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

    var pie = d3.layout.pie() //this will create arc data for us given a list of values
        .value(function(d) {
            return d.measure;
        }); //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice") //allow us to style things in the slices (like text)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("click", up);

    arcs.append("svg:path")
        .attr("fill", function(d, i) {
            return color(i);
        }) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc) //this creates the actual SVG path using the associated data (pie) with the arc drawing function
        .append("svg:title") //mouseover title showing the figures
        .text(function(d) {
            return d.data.category + ": " + formatAsPercentage(d.data.measure);
        });

    d3.selectAll("g.slice").selectAll("path").transition()
        .duration(750)
        .delay(10)
        .attr("d", arcFinal);

    // Add a label to the larger arcs, translated to the arc centroid and rotated.
    // source: http://bl.ocks.org/1305337#index.html
    arcs.filter(function(d) {
            return d.endAngle - d.startAngle > .2;
        })
        .append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")";
        })
        //.text(function(d) { return formatAsPercentage(d.value); })
        .text(function(d) {
            return d.data.category;
        });

    // Computes the label angle of an arc, converting from radians to degrees.
    function angle(d) {
        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
    }

    // Pie chart title          
    vis.append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text("TOTAL: 14,991,104")
        .attr("class", "title")
        .attr("fill", "white");


    function mouseover() {
        d3.select(this).select("path").transition()
            .duration(750)
            //.attr("stroke","red")
            //.attr("stroke-width", 1.5)
            .attr("d", arcFinal3);
    }

    function mouseout() {
        d3.select(this).select("path").transition()
            .duration(750)
            //.attr("stroke","blue")
            //.attr("stroke-width", 1.5)
            .attr("d", arcFinal);
    }

    function up(d, i) {

        /* update bar chart when user selects piece of the pie chart */
        //updateBarChart(dataset[i].category);
        updateBarChart(d.data.category, color(i));
        updateLineChart(d.data.category, color(i));

    }
}

dsPieChart();

/*
############# BAR CHART ###################
-------------------------------------------
*/



var datasetBarChart = [{
    group: "All",
    category: "Facebook",
    measure: 63850.4963
}, {
    group: "All",
    category: "Twitter",
    measure: 78258.0845
}, {
    group: "All",
    category: "Instagram",
    measure: 60610.2355
}, {
    group: "All",
    category: "Pinterest",
    measure: 30493.1686
}, {
    group: "All",
    category: "Youtube",
    measure: 56097.0151
}, {
    group: "All",
    category: "Tumblr",
    measure: 56097.0151
}, {
    group: "All",
    category: "Snapchat",
    measure: 56097.0151
}, {
    group: "All",
    category: "Bloglovin",
    measure: 56097.0151
}, {
    group: "INFLUENCEHER",
    category: "Facebook",
    measure: 19441.5648
}, {
    group: "INFLUENCEHER",
    category: "Twitter",
    measure: 25922.0864
}, {
    group: "INFLUENCEHER",
    category: "Instagram",
    measure: 9720.7824
}, {
    group: "INFLUENCEHER",
    category: "Pinterest",
    measure: 6480.5216
}, {
    group: "INFLUENCEHER",
    category: "Youtube",
    measure: 19441.5648
}, {
    group: "INFLUENCEHER",
    category: "Tumblr",
    measure: 22913.2728
}, {
    group: "INFLUENCEHER",
    category: "Snapchat",
    measure: 0
}, {
    group: "INFLUENCEHER",
    category: "Bloglovin",
    measure: 7637.7576
}, {
    group: "NATIONAL",
    category: "Facebook",
    measure: 23549.7526
}, {
    group: "NATIONAL",
    category: "Twitter",
    measure: 1909.4394
}, {
    group: "NATIONAL",
    category: "Instagram",
    measure: 7637.7576
}, {
    group: "NATIONAL",
    category: "Pinterest",
    measure: 1041.5124
}, {
    group: "NATIONAL",
    category: "Youtube",
    measure: 0
}, {
    group: "NATIONAL",
    category: "Tumblr",
    measure: 0
}, {
    group: "NATIONAL",
    category: "Snapchat",
    measure: 2430.1956
}, {
    group: "NATIONAL",
    category: "Bloglovin",
    measure: 0
}, {
    group: "CHAPTERS",
    category: "Facebook",
    measure: 15275.5152
}, {
    group: "CHAPTERS",
    category: "Twitter",
    measure: 4166.0496
}, {
    group: "CHAPTERS",
    category: "Instagram",
    measure: 11803.8072
}, {
    group: "CHAPTERS",
    category: "Pinterest",
    measure: 0
}, {
    group: "CHAPTERS",
    category: "Youtube",
    measure: 0
}, {
    group: "CHAPTERS",
    category: "Tumblr",
    measure: 0
}, {
    group: "CHAPTERS",
    category: "Snapchat",
    measure: 0
}, {
    group: "CHAPTERS",
    category: "Bloglovin",
    measure: 0
}, {
    group: "BETCHES",
    category: "Facebook",
    measure: 7406.3104
}, {
    group: "BETCHES",
    category: "Twitter",
    measure: 2545.9192
}, {
    group: "BETCHES",
    category: "Instagram",
    measure: 1620.1304
}, {
    group: "BETCHES",
    category: "Pinterest",
    measure: 8563.5464
}, {
    group: "BETCHES",
    category: "Youtube",
    measure: 0
}, {
    group: "BETCHES",
    category: "Tumblr",
    measure: 0
}, {
    group: "BETCHES",
    category: "Snapchat",
    measure: 0
}, {
    group: "BETCHES",
    category: "Bloglovin",
    measure: 0
}];

// set initial group value
var group = "All";

function datasetBarChosen(group) {
    var ds = [];
    for (x in datasetBarChart) {
        if (datasetBarChart[x].group == group) {
            ds.push(datasetBarChart[x]);
        }
    }
    return ds;
}


function dsBarChartBasics() {

    var margin = {
            top: 30,
            right: 5,
            bottom: 20,
            left: 50
        },
        width = 500 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom,
        //colorBar = d3.scale.category20(),
        colorBar = d3.scale.ordinal()
        .range(["#6640CC ", "#FF0066", "#FCBD12", "#00D2C1"]);
    barPadding = 1;
    console.log(colorBar)
    return {
        margin: margin,
        width: width,
        height: height,
        colorBar: colorBar,
        barPadding: barPadding
    };
}

function dsBarChart() {

    var firstDatasetBarChart = datasetBarChosen(group);

    var basics = dsBarChartBasics();

    var margin = basics.margin,
        width = basics.width,
        height = basics.height,
        colorBar = basics.colorBar,
        barPadding = basics.barPadding;

    var xScale = d3.scale.linear()
        .domain([0, firstDatasetBarChart.length])
        .range([0, width]);

    // Create linear y scale 
    // Purpose: No matter what the data is, the bar should fit into the svg area; bars should not
    // get higher than the svg height. Hence incoming data needs to be scaled to fit into the svg area.  
    var yScale = d3.scale.linear()
        // use the max funtion to derive end point of the domain (max value of the dataset)
        // do not use the min value of the dataset as min of the domain as otherwise you will not see the first bar
        .domain([0, d3.max(firstDatasetBarChart, function(d) {
            return d.measure;
        })])
        // As coordinates are always defined from the top left corner, the y position of the bar
        // is the svg height minus the data value. So you basically draw the bar starting from the top. 
        // To have the y position calculated by the range function
        .range([height, 0]);

    //Create SVG element

    var svg = d3.select("#barChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "barChartPlot");

    /**
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill",function(d){return "#2C3546";})
    **/
    var plot = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    plot.selectAll("rect")
        .data(firstDatasetBarChart)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("width", width / firstDatasetBarChart.length - barPadding)
        .attr("y", function(d) {
            return yScale(d.measure);
        })
        .attr("height", function(d) {
            return height - yScale(d.measure);
        })
        .attr("fill", "lightgrey");


    // Add y labels to plot 

    plot.selectAll("text")
        .data(firstDatasetBarChart)
        .enter()
        .append("text")
        .text(function(d) {
            return formatAsInteger(d3.round(d.measure));
        })
        .attr("text-anchor", "middle")
        // Set x position to the left edge of each bar plus half the bar width
        .attr("x", function(d, i) {
            return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
        })
        .attr("y", function(d) {
            return yScale(d.measure) + 14;
        })
        .attr("class", "yAxis")
        /* moved to CSS            
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        */
    ;

    // Add x labels to chart    

    var xLabels = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")");

    xLabels.selectAll("text.xAxis")
        .data(firstDatasetBarChart)
        .enter()
        .append("text")
        .text(function(d) {
            return d.category;
        })
        .attr("text-anchor", "middle")
        // Set x position to the left edge of each bar plus half the bar width
        .attr("x", function(d, i) {
            return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
        })
        .attr("y", 15)
        .attr("class", "xAxis")
        .style('fill', 'white')
        //.attr("style", "font-size: 12; font-family: Helvetica, sans-serif")
    ;

    // Title

    svg.append("text")
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", 15)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr('fill', 'white')
        .text("Overall Breakdown 2016");
}

dsBarChart();

/* ** UPDATE CHART ** */

/* updates bar chart on request */

function updateBarChart(group, colorChosen) {

    var currentDatasetBarChart = datasetBarChosen(group);

    var basics = dsBarChartBasics();

    var margin = basics.margin,
        width = basics.width,
        height = basics.height,
        colorBar = basics.colorBar,
        barPadding = basics.barPadding;

    var xScale = d3.scale.linear()
        .domain([0, currentDatasetBarChart.length])
        .range([0, width]);


    var yScale = d3.scale.linear()
        .domain([0, d3.max(currentDatasetBarChart, function(d) {
            return d.measure;
        })])
        .range([height, 0]);

    var svg = d3.select("#barChart svg");

    var plot = d3.select("#barChartPlot")
        .datum(currentDatasetBarChart);

    /* Note that here we only have to select the elements - no more appending! */
    plot.selectAll("rect")
        .data(currentDatasetBarChart)
        .transition()
        .duration(750)
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("width", width / currentDatasetBarChart.length - barPadding)
        .attr("y", function(d) {
            return yScale(d.measure);
        })
        .attr("height", function(d) {
            return height - yScale(d.measure);
        })
        .attr("fill", colorChosen);

    plot.selectAll("text.yAxis") // target the text element(s) which has a yAxis class defined
        .data(currentDatasetBarChart)
        .transition()
        .duration(750)
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
        })
        .attr("y", function(d) {
            return yScale(d.measure) + 14;
        })
        .text(function(d) {
            return formatAsInteger(d3.round(d.measure));
        })
        .style("fill", 'white')
        .attr("class", "yAxis");


    svg.selectAll("text.title") // target the text element(s) which has a title class defined
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", 15)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text(group + "'s Overall Breakdown 2016")
        .style('fill', 'white');
}


/*
############# LINE CHART ##################
-------------------------------------------
*/
var datasetLineChart = [{
    group: "All",
    category: 2008,
    measure: 289309
}, {
    group: "All",
    category: 2009,
    measure: 234998
}, {
    group: "All",
    category: 2010,
    measure: 310900
}, {
    group: "All",
    category: 2011,
    measure: 223900
}, {
    group: "All",
    category: 2016,
    measure: 234500
}, {
    group: "INFLUENCEHER",
    category: 2008,
    measure: 81006.52
}, {
    group: "INFLUENCEHER",
    category: 2009,
    measure: 70499.4
}, {
    group: "INFLUENCEHER",
    category: 2010,
    measure: 96379
}, {
    group: "INFLUENCEHER",
    category: 2011,
    measure: 64931
}, {
    group: "NATIONAL",
    category: 2008,
    measure: 63647.98
}, {
    group: "NATIONAL",
    category: 2009,
    measure: 61099.48
}, {
    group: "NATIONAL",
    category: 2010,
    measure: 87052
}, {
    group: "NATIONAL",
    category: 2011,
    measure: 58214
}, {
    group: "CHAPTERS",
    category: 2008,
    measure: 23144.72
}, {
    group: "CHAPTERS",
    category: 2009,
    measure: 14099.88
}, {
    group: "CHAPTERS",
    category: 2010,
    measure: 15545
}, {
    group: "CHAPTERS",
    category: 2011,
    measure: 11195
}, {
    group: "BETCHES",
    category: 2016,
    measure: 11725
}, {
    group: "BETCHES",
    category: 2008,
    measure: 34717.08
}, {
    group: "BETCHES",
    category: 2009,
    measure: 30549.74
}, {
    group: "BETCHES",
    category: 2010,
    measure: 34199
}, ];
// set initial category value
var group = "All";

function datasetLineChartChosen(group) {
    var ds = [];
    for (x in datasetLineChart) {
        if (datasetLineChart[x].group == group) {
            ds.push(datasetLineChart[x]);
        }
    }
    return ds;
}

function dsLineChartBasics() {

    var margin = {
            top: 20,
            right: 10,
            bottom: 0,
            left: 50
        },
        width = 500 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    return {
        margin: margin,
        width: width,
        height: height
    };
}


function dsLineChart() {

    var firstDatasetLineChart = datasetLineChartChosen(group);

    var basics = dsLineChartBasics();

    var margin = basics.margin,
        width = basics.width,
        height = basics.height;

    var svg = d3.select("#lineChart").append("svg")
        .datum(firstDatasetLineChart)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    svg.append("text")
        .attr("id", "lineChartTitle1")
        .attr("x", margin.left + ((width + margin.right) / 2))
        .attr("y", 10);

}

dsLineChart();


/* ** UPDATE CHART ** */

/* updates bar chart on request */
function updateLineChart(group, colorChosen) {

    var currentDatasetLineChart = datasetLineChartChosen(group);

    var basics = dsLineChartBasics();

    var margin = basics.margin,
        width = basics.width,
        height = basics.height;

    var xScale = d3.scale.linear()
        .domain([0, currentDatasetLineChart.length - 1])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(currentDatasetLineChart, function(d) {
            return d.measure;
        })])
        .range([height, 0]);

    var line = d3.svg.line()
        .x(function(d, i) {
            return xScale(i);
        })
        .y(function(d) {
            return yScale(d.measure);
        });

    var plot = d3.select("#lineChartPlot")
        .datum(currentDatasetLineChart);

    /* descriptive titles as part of plot -- start */
    var dsLength = currentDatasetLineChart.length;

    plot.select("text")
        .text(currentDatasetLineChart[dsLength - 1].measure);
    /* descriptive titles -- end */

    plot
        .select("path")
        .transition()
        .duration(750)
        .attr("class", "line")
        .attr("d", line)
        // add color
        .attr("stroke", colorChosen);

    var path = plot
        .selectAll(".dot")
        .data(currentDatasetLineChart)
        .transition()
        .duration(750)
        .attr("class", "dot")
        .attr("fill", function(d) {
            return d.measure == d3.min(currentDatasetLineChart, function(d) {
                return d.measure;
            }) ? "red" : (d.measure == d3.max(currentDatasetLineChart, function(d) {
                return d.measure;
            }) ? "green" : "white")
        })
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        // add color
        .attr("stroke", colorChosen);

    path
        .selectAll("title")
        .text(function(d) {
            return d.category + ": " + formatAsInteger(d.measure);
        });

}

/*--------------------------Site traffic----------------*/

function setSitetraffic(mobileP, desktopP, tabletP) {
    var mobile = document.getElementById('mobilePercent');
    mobile.innerHTML = "MOBILE: " + mobileP;
    var desktop = document.getElementById('desktopPercent');
    desktop.innerHTML="DESKTOP: "+desktopP;
    var tablet = document.getElementById('tabletPercent');
    tablet.innerHTML="TABLET: "+tabletP;
}

setSitetraffic("66%", "27.70%", "5.50%");
