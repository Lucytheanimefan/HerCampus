var colors = ["#6640CC ", "#FF0066", "#FCBD12", "#00D6C2"]
var aquablue = d3.rgb(0, 214, 194);
var hotpink = d3.rgb(255, 0, 102);
var indigo = d3.rgb(102, 64, 204);


createLineChart("#chapterGrowth");
addImage("Chapter", "chapterGrowth"); 
createLineChart("#totalMonthlyViews");
addImage("Laptop", "totalMonthlyViews"); 
createLineChart("#newsletterSubscribers");
addImage("Newsletter", "newsletterSubscribers"); 


var chart1 = c3.generate({
    bindto: '#monthlyUniquesChart',
    data: {
        x: 'x',
        columns: [
            ['x', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
            //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            ['HC.com Monthly Uniques', 30, 200, 100, 400, 150, 250],
            ['HC.com Monthly Pageviews', 130, 340, 200, 500, 250, 350]
        ],
        groups: [
            ['download', 'loading']
        ],
        type: 'line',
        colors: {
            'HC.com Monthly Uniques': '#FF0066',
            'HC.com Monthly Pageviews': '#00D6C2'
        }
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});

var chart = c3.generate({
    bindto: '#nationalChart',
    data: {
        x: 'x',
        columns: [
            ['x', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
            //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            ['Facebook', 30, 200, 100, 400, 150, 250],
            ['Twitter', 130, 340, 200, 500, 250, 350],
            ['Pinterest', 50, 140, 150, 600, 200, 300],
            ['Instagram', 100, 200, 100, 550, 100, 400]
        ],
        groups: [
            ['download', 'loading']
        ],
        type: 'line',
         colors: {
            Facebook: '#FF0066',
            Twitter: '#00D6C2',
            Pinterest:'#FCBD12',
            Instagram: '#6640CC'
        },
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});


function formatCurrency(d) {
    return "$" + d;
}

function createLineChart(appendDiv) {
    var m = [20, 80, 20, 80];
    var w = 500 - m[1] - m[3];
    var h = 190 - m[0] - m[2];

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

function addImage(imageName, divArea) {
    var area = document.getElementById(divArea);
    var img = document.createElement("img");
    img.src = "css/Images/History_" + imageName + ".svg";
    img.width = "110";
    img.height = "110";
    img.className = "svg_image";
    area.appendChild(img);
}
