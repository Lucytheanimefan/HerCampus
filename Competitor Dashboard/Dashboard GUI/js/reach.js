//multiplatformViews
var multiPlatformData = [{
	"interest_rate": "",
	"Social content views": 500,
	"Pageviews": 100,
	"Chapter social follower count": 66
}];

createMultiPlatformViews(multiPlatformData);

function createMultiPlatformViews(data) {
	var uniqueColors = ["#6640CC ", "#FCBD12", "#00D6C2"];
	var margin = {
			top: 80,
			right: 10,
			bottom: 10,
			left: 140
		},
		width = 250 - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom,
		that = this;


	var x = d3.scale.ordinal().rangeRoundBands([0, width], .3);

	var y = d3.scale.linear().rangeRound([height, 0]);

	var color = d3.scale.ordinal()
        .range(uniqueColors);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format(".0%"));

	var svg = d3.select("#multiplatformViews").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	color.domain(d3.keys(data[0]).filter(function(key) {
		return key !== "interest_rate";
	}));


	data.forEach(function(d) {
		var y0 = 0;

		d.rates = color.domain().map(function(name) {
			console.log();;
			return {
				name: name,
				y0: y0,
				y1: y0 += +d[name],
				amount: d[name]
			};
		});
		d.rates.forEach(function(d) {
			d.y0 /= y0;
			d.y1 /= y0;
		});

		console.log(data);
	});

	data.sort(function(a, b) {
		return b.rates[0].y1 - a.rates[0].y1;
	});

	x.domain(data.map(function(d) {
		return d.interest_rate;
	}));

	svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

	svg.append("g").attr("class", "y axis").call(yAxis);

	var interest_rate = svg.selectAll(".interest-rate").data(data).enter().append("g").attr("class", "interest-rate").attr("transform", function(d) {
		return "translate(" + x(d.interest_rate) + ",0)";
	});

	interest_rate.selectAll("rect").data(function(d) {
		return d.rates;
	}).enter().append("rect").attr("width", x.rangeBand()).attr("y", function(d) {
		return y(d.y1);
	}).attr("height", function(d) {
		return y(d.y0) - y(d.y1);
	}).style("fill", function(d) {
		return color(d.name);
	}).on('mouseover', function(d) {
		var total_amt;
		total_amt = d.amount;



		console.log('----');
		d3.select(".chart-tip").style('opacity', '1').html('Amount: <strong>$' + total_amt.toFixed(2) + '</strong>');

	}).on('mouseout', function() {
		d3.select(".chart-tip").style('opacity', '0');
	});

	var legend = svg.selectAll(".legend").data(color.domain().slice().reverse()).enter().append("g").attr("class", "legend").attr("transform", function(d, i) {
		return "translate(" + i * -70 + ",200)";
	});


	legend.append("rect").attr("x", width + -53).attr("width", 10).attr("height", 10).style("fill", color);

	legend.append("text")
	.attr("x", width - 40)
	.attr("y", 0)
	.attr("width", 50)
	.attr("dy", ".35em")
	.style("text-anchor", "start")
	.text(function(d) {
		return d;
	});



}