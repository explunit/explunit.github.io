var margin = {top: 20, right: 30, bottom: 30, left: 50},
    width = 250 - margin.left - margin.right,
    height = 175 - margin.top - margin.bottom;

	var svg = d3.select("body").append("svg")
		.attr('class', 'chart')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
	.append('g')
		.attr('transform', "translate(" + margin.left + "," + margin.top + ")");

   	var stateData = [
		{ state: 'PA', category: 'A', value: 25 },
		{ state: 'PA', category: 'B', value: 75 },
		{ state: 'PA', category: 'C', value: 40 },

		{ state: 'NJ', category: 'A', value: 25 },
		{ state: 'NJ', category: 'B', value: 140 },
		{ state: 'NJ', category: 'C', value: 100 },

		{ state: 'NY', category: 'B', value: 20 },
		{ state: 'NY', category: 'C', value: 75 },
	]
	var uniqueCategories = _(stateData).pluck('category').uniq().value();

	var yScale = d3.scale.linear()
		.domain([0, d3.max(stateData, function(d) {return d.value;})])
		.range([height, 0]);
	var xScale = d3.scale.ordinal()
		.domain(uniqueCategories)
		.rangeRoundBands([0, width], 0.2, 0.2);

	var yAxis = d3.svg.axis().scale(yScale).orient('left');
	var xAxis = d3.svg.axis().scale(xScale).orient('bottom');

	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	update();

	function update() {
		var duration = 1500;
		var selectedState = 'NJ';

		var data = _(stateData).filter({ state: selectedState }).value();

		var bars = svg.selectAll('rect').data(data, function(d) { return d.category; }); 

		bars.transition().duration(duration)
			.attr('y', function(d) { return height - yScale(d.value); })
			.attr('height', function(d) { return yScale(d.value); })

		bars.enter().append('rect')
			.attr('x', function(d) { return xScale(d.category); })
			.attr('y', function(d) { return yScale(d.value); })
			.attr('height', function(d) { return height- yScale(d.value); })
			.attr('width', xScale.rangeBand())

		bars.exit().transition().duration(200)
			.attr('y', height)
			.attr('height', 0)
	}



