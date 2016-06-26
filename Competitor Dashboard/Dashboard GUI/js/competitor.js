//multiplatformViews
var engagementData = [{
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
}, {
	"interest_rate": "SEVENTEEN",
	"Facebook": 550,
	"Twitter": 10,
	"Pinterest": 76,
	"Instagram": 100
}, {
	"interest_rate": "GLAMOUR",
	"Facebook": 300,
	"Twitter": 150,
	"Pinterest": 56,
	"Instagram": 50
}, {
	"interest_rate": "REFINERY29",
	"Facebook": 500,
	"Twitter": 300,
	"Pinterest": 26,
	"Instagram": 500
}, {
	"interest_rate": "COSMO",
	"Facebook": 400,
	"Twitter": 100,
	"Pinterest": 66,
	"Instagram": 20
}, {
	"interest_rate": "MARIE CLAIRE",
	"Facebook": 500,
	"Twitter": 100,
	"Pinterest": 66,
	"Instagram": 20
}];

//multiplatformViews
var reachData = [{
	"interest_rate": "HC.COM",
	"Facebook": 500,
	"Twitter": 100,
	"Pinterest": 66,
	"Instagram": 20
}, {
	"interest_rate": "GLAMOUR",
	"Facebook": 500,
	"Twitter": 100,
	"Pinterest": 66,
	"Instagram": 20
}, {
	"interest_rate": "TEEN VOGUE",
	"Facebook": 500,
	"Twitter": 100,
	"Pinterest": 66,
	"Instagram": 20
}, {
	"interest_rate": "REFINERY29",
	"Facebook": 500,
	"Twitter": 100,
	"Pinterest": 66,
	"Instagram": 20
}, {
	"interest_rate": "COSMO",
	"Facebook": 500,
	"Twitter": 100,
	"Pinterest": 66,
	"Instagram": 20
}, {
	"interest_rate": "MARIE CLAIRE",
	"Facebook": 500,
	"Twitter": 100,
	"Pinterest": 66,
	"Instagram": 20
}, {
	"interest_rate": "SEVENTEEN",
	"Facebook": 500,
	"Twitter": 100,
	"Pinterest": 66,
	"Instagram": 20
}];

function createMultiPlatformViews(data, idArea) {
	var platform = document.getElementById(idArea);
	var title = document.createElement("div");
	title.innerHTML = "";
	title.id = "multiPlat_" + idArea;
	platform.appendChild(title);

	var uniqueColors = ["#6640CC ", "#FF0066", "#FCBD12", "#00D6C2"];
	var margin = {
			top: 20,
			right: 100,
			bottom: 40,
			left: 80
		},
		width = 500 - margin.left - margin.right,
		height = 230 - margin.top - margin.bottom,
		that = this;


	var x = d3.scale.ordinal().rangeRoundBands([0, width], .3);

	var y = d3.scale.linear().rangeRound([height, 0]);

	var color = d3.scale.ordinal()
		.range(uniqueColors);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format(".0%"));

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			var total_amt;
			total_amt = d.amount;
			return total_amt;

		})

	var svg = d3.select("#multiPlat_" + idArea)
		.append("svg")
		.attr("id", "multiPlatSVG_" + idArea)
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(tip);

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

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height) + ")")
		.call(xAxis)
		.selectAll(".tick text")
		.call(wrap, x.rangeBand());

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	var interest_rate = svg.selectAll(".interest-rate")
		.data(data)
		.enter()
		.append("g")
		.attr("class", "interest-rate")
		.attr("transform", function(d) {
			return "translate(" + x(d.interest_rate) + ",0)";
		})

	interest_rate.selectAll("rect").data(function(d) {
			return d.rates;
		}).enter().append("rect").attr("width", x.rangeBand()).attr("y", function(d) {
			return y(d.y1);
		}).attr("height", function(d) {
			return y(d.y0) - y(d.y1);
		}).style("fill", function(d) {
			return color(d.name);
		})
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide);

	var legend = svg.selectAll(".legend").data(color.domain().slice().reverse()).enter().append("g").attr("class", "legend").attr("transform", function(d, i) {
		return "translate(330," + i * 50 + ")";
	});


	legend.append("rect").attr("x", width - 340).attr("width", 10).attr("height", 10).style("fill", color);

	legend.append("text")
		.attr("x", width - 40)
		.attr("y", 5)
		.attr("width", 50)
		.attr("dy", ".35em")
		.style("text-anchor", "start")
		.text(function(d) {
			return d;
		})
		.call(wrap, 80);



}

function wrap(text, width) {
	text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.1, // ems
			y = text.attr("y"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node().getComputedTextLength() > width) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			}
		}
	});
}

function type(d) {
	d.value = +d.value;
	return d;
}

//create the titles 
function createTitles() {
	var comp_engagement = document.getElementById("comp_engagement");
	var comp_engagement_title = document.createElement("div");
	comp_engagement_title.id = "comp_engagement_title";
	comp_engagement_title.className = "titles";
	comp_engagement_title.innerHTML = "ENGAGEMENT";
	comp_engagement.appendChild(comp_engagement_title);

	var comp_reach = document.getElementById("comp_reach");
	var comp_reach_title = document.createElement("div");
	comp_reach_title.id = "comp_reach_title";
	comp_reach_title.className = "titles";
	comp_reach_title.innerHTML = "REACH";
	comp_reach.appendChild(comp_reach_title);
}


/*----------------------pie charts---------------------*/
var dataset = [{
	category: "TWITTER",
	measure: 150
}, {
	category: "INSTAGRAM",
	measure: 550
}, {
	category: "FACEBOOK",
	measure: 300
}, {
	category: "PINTEREST",
	measure: 100
}, {
	category: "YOUTUBE",
	measure: 200
}];

var formatAsPercentage = d3.format("%"),
	formatAsPercentage1Dec = d3.format(".1%"),
	formatAsInteger = d3.format(","),
	fsec = d3.time.format("%S s"),
	fmin = d3.time.format("%M m"),
	fhou = d3.time.format("%H h"),
	fwee = d3.time.format("%a"),
	fdat = d3.time.format("%d d"),
	fmon = d3.time.format("%b");

function dsPieChart(dataset, divID, total) {
	var width = 150,
		height = 150,
		outerRadius = Math.min(width, height) / 2,
		innerRadius = outerRadius * .999,
		// for animation
		innerRadiusFinal = outerRadius * .5,
		innerRadiusFinal3 = outerRadius * .45,
		color = d3.scale.ordinal()
		.range(["#6640CC ", "#FF0066", "#FCBD12", "#00D6C2"]); //builtin range of colors
	;

	var vis = d3.select("#" + divID)
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
		//.on("mouseover", mouseover)
		//.on("mouseout", mouseout)
		//.on("click", up);

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
	// Pie chart title			
	vis.append("svg:text")
		.attr("dy", ".35em")
		.attr("text-anchor", "middle")
		.text("TOTAL:" + total)
		.attr("class", "title")
		.attr("fill", "white");
}

// Computes the label angle of an arc, converting from radians to degrees.
function angle(d) {
	var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
	return a > 90 ? a - 180 : a;
}

var titleMappings = {
	0: "HERCAMPUS.COM",
	1: "TEEN VOGUE",
	2: "SEVENTEEN",
	3: "COSMOPOLITAN",
	4: "GLAMOUR",
	5: "REFINERY29"
};

function createPies() {
	for (var i = 0; i < 6; i++) {
		var pieDiv = document.getElementById("pieChart_" + i.toString());
		var title = document.createElement("div");
		title.className = "titles";
		title.innerHTML = titleMappings[i];

		pieDiv.appendChild(title);
		dsPieChart(dataset, "pieChart_" + i.toString(), "14,000,000");

	}
}

//calling all the functions here
createTitles();
createMultiPlatformViews(engagementData, "comp_engagement");
createMultiPlatformViews(reachData, "comp_reach");
createPies();