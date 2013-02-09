var data = [];

var time_parser = d3.time.format.iso.parse;

var margin = {top: 20,
	      right: 20,
	      bottom: 30,
	      left: 50}

var width = 1000 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width]);
var y = d3.scale.linear()
    .range([height, 0]);

var x_axis = d3.svg.axis().scale(x).orient("bottom");
var y_axis = d3.svg.axis().scale(y).orient("left");

function get_load() {
    d3.json("/load.json", function (error, root) {
        root.timestamp = time_parser(root.timestamp);
        data.push(root);
	if (data.length > 60) {
	    data = data.slice(1, 61);
	}
        x.domain(d3.extent(data, function (d) { return d.timestamp; }));
        y.domain(d3.extent(data, function (d) { return d.load; }));

	d3.select("svg").remove();

	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var line = d3.svg.line()
	    .x(function (d) { return x(d.timestamp); })
	    .y(function (d) { return y(d.load); });

        svg.append("g")
	    .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(x_axis);
        svg.append("g")
	    .attr("class", "y axis")
            .call(y_axis);
        svg.append("path")
            .datum(data)
	    .attr("class", "line")
            .attr("d", line);
    });
}

setInterval( function() {
    get_load();
    console.log("added data");
}, 250);

