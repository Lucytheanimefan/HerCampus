var colors = ["#6640CC ", "#FF0066", "#FCBD12", "#00D6C2"]
var aquablue = d3.rgb(0, 214, 194);
var hotpink = d3.rgb(255, 0, 102);
var indigo = d3.rgb(102, 64, 204);


createLineChart("#monthlyUniques");

function formatCurrency(d) {
        return "$" + d;
    }

function createLineChart(appendDiv) {
    var m = [80, 80, 80, 80];
    var w = 850 - m[1] - m[3];
    var h = 400 - m[0] - m[2];

    var data = [24509, 19466, 18004, 18381, 17312, 19926, 24761, 24815, 24333, 29117, 24527, 17478];


    var xLabels = d3.time.scale().domain([new Date(2013, 0, 1), new Date(2013, 11, 31)]).range([0, w]);
    var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
    var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

    var line = d3.svg.line()
        .x(function(d, i) {
            console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
            return x(i);
        })
        .y(function(d) {
            console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
            return y(d);
        })

    var graph = d3.select(appendDiv).append("svg:svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .append("svg:g")
        .attr("transform", "translate(" + 120 + "," + m[0] + ")");

    var xAxis = d3.svg.axis().scale(xLabels).ticks(d3.time.months).tickFormat(d3.time.format("%B")).tickSize(-h).tickSubdivide(true);
    graph.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    var yAxisLeft = d3.svg.axis().scale(y).ticks(7).tickFormat(formatCurrency).orient("left");
    graph.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(-25,0)")
        .call(yAxisLeft);

    graph.append("svg:path")
        .attr("d", line(data))
        .attr('class', 'line');

}
