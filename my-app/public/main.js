function renderCalcs(event) {
	console.log('Engineering Tools');
	var x = d3.select('#btnsrow');
	x.html('');
	d3.select('#ClearGraphBtn')
		.html('').remove();
		d3.select('#svgDiv')
		.html('').remove();
		d3.select('#EducationRow').attr('style','display: none !important;');
		d3.select('#DataVizRow').attr('style','display: none !important;');
		d3.select('#TechSkillsRow').attr('style','display: none !important;');

	
};

function openDataViz(event) {

	console.log('Data Viz Tools');


	var x = d3.select('#btnsrow');
	x.html('');
	d3.select('#ClearGraphBtn')
	.html('').remove();

	d3.select('#svgDiv')
	.html('').remove();
		d3.select('#EducationRow').attr('style','display: none !important;');
		d3.select('#TechSkillsRow').attr('style','display: none !important;');

	d3.select('#DataVizRow').attr('style','display: flex !important;');

};

function createSCatterPlot(event) {
	
	var ScatterPlotData = [ {x: 35, y: 94},
						{x: 43, y: 19},
						{x: 51, y: 70},
						{x: 30, y: 39},
						{x: 80, y: 81},
						{x: 64, y: 61},
						{x: 34, y: 49},
						{x: 71, y: 67},
						{x: 15, y: 85},
						{x: 56, y: 34}

    ];
     var scatterplotdomainx = d3.max(ScatterPlotData, function(d) { return d.x; });

	var scatterplotdomainy = d3.max(ScatterPlotData, function (d) { return d.y;});


	var xscale = d3.scaleLinear()
								.domain([0, scatterplotdomainx ])
								.range([0,450 ]);

	var yscale = d3.scaleLinear()
								.domain([0, scatterplotdomainy ])
								.range([450  , 0]);	

	d3.select("#ScatterPlot").append('svg')
		.selectAll("empty")
		.data(ScatterPlotData)
		.enter()
		.append("circle")
		.attr("r", 5)
		.attr("cx", function (d) {return xscale(d.x)})
		.attr("cy", function (d) {return yscale(d.y)})
		.attr("transform","translate(30,20)");

	d3.select("#ScatterPlot").select('svg')
		.selectAll("empty")
		.data(ScatterPlotData)
		.enter()
		.append("text")
		.text(function(d) { return d.x + "," + d.y;})
		.attr("x", function (d) {return xscale(d.x)})
		.attr("y", function (d) {return yscale(d.y)})
		.attr("fill", "blue")
		.attr("transform", "translate(0,15)");

	d3.select("#ScatterPlot").select('svg')
		.append("g")
		.call(d3.axisBottom(xscale))	
		.attr("transform", "translate(30,470)")
		.attr("font-size", "16px");

	d3.select("#ScatterPlot").select('svg')
		.append("g")
		.call(d3.axisLeft(yscale))
		.attr("transform", "translate(30,20)")
		.attr("font-size", "16px");

};

function createBarChart(event) {

	var BarGraphData = [10,15,8,7,25,12];
	var BarGraphLabels = ["A","B","C","D","E","F"];

	var barchartscaleband = d3.scaleBand()
							.domain(BarGraphLabels)
							.range([0,450])
							.padding(0.1);


	var barchartmax = d3.max(BarGraphData);
	var barchartscale = d3.scaleLinear()
									.domain([0, barchartmax])
									.range([450, 0]);

	d3.select("#BarChart").append('svg')
		.selectAll("empty")
		.data( BarGraphData.sort(function(a, b){return a-b}))
		.enter()
		.append("rect")
		.attr("x", function(d,i) {
			return i * barchartscaleband.step() +40
		})
		.attr("y", function(d) {
			return barchartscale(d);
		})
		.attr("width", barchartscaleband.bandwidth())
		.attr("height", function(d) {
			return 450 -barchartscale(d);
		})
		.attr("fill","#01665e")
		.attr("stroke", "black")
		.attr("stroke-width","2")
		.attr("transform", "translate(0,20)");
	d3.select("#BarChart").select('svg')
		.append("g")
		.call(d3.axisBottom(barchartscaleband))	
		.attr("transform", "translate(30,470)")
		.attr("font-size", "20px");

	d3.select("#BarChart").select('svg')
		.append("g")
		.call(d3.axisLeft(barchartscale))
		.attr("transform", "translate(30,20)")
		.attr("font-size", "16px");

	d3.select("#BarChart").select('svg')
	.selectAll("empty")
	.data( BarGraphData.sort(function(a, b){return a-b}))
	.enter()
	.append("text")
	.attr("x", function(d,i) {
			return i * barchartscaleband.step() + 25 + barchartscaleband.bandwidth()/2
		})
	.attr("y",  function(d) {
			return barchartscale(d);
		})
	.attr("fill", "#ffffb3")
	.attr("font-size", "20px")
	.attr("transform", "translate(7,35)")
	.text(function(d) {return d;});

};

function createLineGraph(event) {
	

	var LineGraphData = [10,15,8,7,25,12];
	var lineGraphLabels = ["A","B","C","D","E","F"];
	var lineGraphMax = d3.max(LineGraphData);
	var lineGraphmin = d3.min(LineGraphData);
	var lineGraphx = d3.scaleBand()
		.domain(LineGraphData.sort(function(a, b){return a-b}))
		.range([0, 450]);
	var lineGraphxlabels = d3.scaleBand()
		.domain(lineGraphLabels)
		.range([0, 450]);
	var lineGraphy = d3.scaleLinear()
						.domain([0, lineGraphMax])
						.range([450,0]);


	var lineGraph = d3.line()
						.x(function (d,i) {
							return i*lineGraphx.step()+lineGraphx.bandwidth()/2 +30})
						.y(function (d){ return lineGraphy(d)});

	d3.select('#LineGraph').append('svg')
		.append("path")
		.attr("d", lineGraph(LineGraphData.sort(function(a, b){return a-b})))
		.attr("fill", "none")
		.attr("style", "stroke:black; stroke-width:5px;")
		.attr("transform", "translate(0,20)");

	d3.select("#LineGraph").select('svg')
		.append("g")
		.call(d3.axisBottom(lineGraphxlabels))	
		.attr("transform", "translate(30,470)")
		.attr("font-size", "20px");

	d3.select("#LineGraph").select('svg')
		.append("g")
		.call(d3.axisLeft(lineGraphy))
		.attr("transform", "translate(30,20)")
		.attr("font-size", "16px");

};

function showResume(event) {

	console.log('My Resume');
	var x = d3.select('#btnsrow');
	x.html('');
	d3.select('#ClearGraphBtn')
	.html('').remove();
	d3.select('#svgDiv')
	.html('').remove();
	d3.select('#EducationRow').attr('style','display: none !important;');
			d3.select('#DataVizRow').attr('style','display: none !important;');
		d3.select('#TechSkillsRow').attr('style','display: none !important;');


	x.append('button')
		.classed('btn btn-info m-1', true)
		.attr('id', 'educationBTN')
		.attr('type', 'button')
		.style('font-size','20px')
		.style('font-weight', '500')
		.on('click', showEducation)
		.append('i')
		.classed('fas fa-graduation-cap fa-lg',true);

	d3.select('#educationBTN')
		.append('span').text(' Education');

	x.append('button')
		.classed('btn btn-info m-1', true)
		.attr('type', 'button')
		.attr('id', 'TechSkillsBtn')
		.style('font-size','20px')
		.style('font-weight', '500')
		.on('click', showTechSkills)
		.append('i')
		.classed('fas fa-cogs fa-lg',true);

	d3.select('#TechSkillsBtn')
		.append('span').text(' Technical Skills');

	x.append('button')
		.classed('btn btn-info m-1', true)
		.attr('type', 'button')
		.attr('id', 'EXPbtn')
		.style('font-size','20px')
		.style('font-weight', '500')
		.on('click', showEXP)
		.append('i')
		.classed('fas fa-briefcase fa-lg',true);

	d3.select('#EXPbtn')
		.append('span').text(' Experience');
};

function showEducation(event) {

	d3.select('#EducationRow').attr('style','display: flex !important;');
	d3.select('#TechSkillsRow').attr('style','display: none !important;');


};

function showTechSkills(event) {

		d3.select('#EducationRow').attr('style','display: none !important;');
		d3.select('#DataVizRow').attr('style','display: none !important;');
		d3.select('#TechSkillsRow').attr('style','display: flex !important;');

};


function showEXP(event) {

		d3.select('#DataVizRow').attr('style','display: none !important;');
		d3.select('#TechSkillsRow').attr('style','display: none !important;');

		d3.select('#EducationRow').attr('style','display: none !important;');

};
function resetPage(event) {
	var x = d3.select('#btnsrow');
	x.html('');
	d3.select('#ClearGraphBtn')
		.html('').remove();
	d3.select('#svgDiv')
		.html('').remove();
		d3.select('#EducationRow').attr('style','display: none !important;');
		d3.select('#DataVizRow').attr('style','display: none !important;');
		d3.select('#TechSkillsRow').attr('style','display: none !important;');

};

createSCatterPlot();
createBarChart();
createLineGraph();
d3.select('#resetPage')
	.on('mouseover',function (event) {
		d3.select('#resetSpinner').attr('style','display: visible;');
		d3.select('#resetNotSpin').attr('style','display: none;');
	})
	.on('mouseleave',function (event) {
		d3.select('#resetSpinner').attr('style','display: none;');
		d3.select('#resetNotSpin').attr('style','display: visible;');
	})
	.on('click', resetPage);

d3.select('#engTools')
	.on('click', renderCalcs);

d3.select('#dataviz')
	.on('click', openDataViz);

d3.select('#ProfesionalResume')
	.on('click', showResume);

d3.select('#registerBtn')
	.on('click', function () {
		var setupEmail = document.getElementById('exampleInputEmail1').value;
		var setupPasword = document.getElementById('exampleInputPassword1').value;
		var setupUsername = 'testone';
		register(setupUsername,setupEmail,setupPasword);

	});

d3.select('#titleColumnLeft')
 	.style('opacity', '0.1')
 	.transition()
 	.duration(1100)
 	.ease(d3.easeLinear)
 	.on('start',function repeat() {
        d3.active(this)
        	.style('opacity', '0.3')
            .text('Software')
        	.transition()
            .delay(150)
            .style('opacity', '0.6')
            .text('Software Engineering')
            .transition()
            .delay(75)
            .style('opacity', '1')
            .text('Software Engineering Projects');
});
	var drop = document.getElementById('drop');
    var list = document.getElementById('list');
    var apiBaseURL = "https://fxu8pfd9v1.execute-api.us-east-2.amazonaws.com/dev/fileUploadHandler";

    function cancel(e) {
      e.preventDefault();
      return false;
    };

    function handleDrop(e){
      e.preventDefault();
      var dt    = e.dataTransfer;
      var files = dt.files;
      for (var i=0; i<files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
        console.log(file.name);
        console.log(file.type);       
        reader.addEventListener('loadend', function(e){
        	console.log("fetch");
          fetch(apiBaseURL, {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: JSON.stringify({
              name: file.name,
              type: file.type
            })
          })
          .then(function(response){          	
            return response.json();
          })
          .then(function(json){
          	console.log(json.uploadURL);
            return fetch(json.uploadURL, {
              method: "PUT",
              body: new Blob([reader.result], {type: file.type})
            })
          });
        });
        reader.readAsArrayBuffer(file);
      }
      return false;
    };

    function UploadFile2(event) {
    	console.log(this.files);
    	console.log(this.value);
  
      
      for (var i=0; i<this.files.length; i++) {
        var file = this.files[i];
        var reader = new FileReader();
        console.log(file.name);
        console.log(file.type);       
        reader.addEventListener('loadend', function(e){
        	console.log("fetch");
          fetch(apiBaseURL, {
            method: "POST",
            headers: {            	
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: JSON.stringify({
              name: file.name,
              type: file.type
            })
          })
          .then(function(response){          	
            return response.json();
          })
          .then(function(json){
          	console.log(json.uploadURL);
            return fetch(json.uploadURL, {
              method: "PUT",
              body: new Blob([reader.result], {type: file.type})
            })
          });
        });
        reader.readAsArrayBuffer(file);
      }
      return false;
    
    };