d3.csv("./data/2018income restricted projects.csv").then(function(data) {
    console.log(data);
    /*
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS
    */
    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var margin = {top: 100, left: 200, right: 100, bottom: 100};
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

   
    /*
    DETERMINE DATA TtlProjUnits + TtlIncomeR
    */

   var nested1 = d3.nest()
   .key(function(d){return d.Neighborhood;})
   .rollup(function(v) { return d3.sum(v, function(d) { return d.TtlProjUnits; }); })
   .entries(data);
   console.log(nested1);
   var filltered1 = nested1.slice(0,15);
    console.log(filltered1);

    var nested2 = d3.nest()
   .key(function(d){return d.Neighborhood;})
   .rollup(function(v) { return d3.sum(v, function(d) { return d.TtlIncomeR; }); })
   .entries(data);
   console.log(nested2);
   var filltered2 = nested2.slice(0,15);
    console.log(filltered2);

   /*
    DRAW PIE CHART
    */

   var g = svg.append("g")
        .attr("transform",`translate(${width/2},${height/2})`);

   var pie = d3.pie()
        .value(function(d){return d.value;});

   var color = d3.scaleOrdinal(d3.schemeCategory10);
    /*
    CLICK EVENT1
    */
   d3.select("#1").on("click",function(){
       
   })
   
   var arc = d3.arc()
        .innerRadius(50)
        .outerRadius(250);
        console.log(pie(filltered1));

   var arcs = g.selectAll(".arc")
        .data(pie(filltered1))
        .enter()
        .append("g")
        .attr("class","arc");

    arcs.append("path")
        .attr("d",function (d){return arc(d);})
        .attr("fill",function (d,i){
            return color (i);
        });  

    

    /*
        tooltip for the chart!
    */
        var tooltip = d3.select ("#chart")
        .append("div")
        .attr("class","tooltip");

        arcs.on("mousemove",function(d){
            console.log(d);

            
            var mouse = d3.mouse(this);
            console.log(mouse);
            var cx = mouse [0] + width/4;
            var cy = mouse [1] + height/4;

            tooltip.style("visibility","visible")
            .style("left", cx+ "px")
            .style("top", cx+ "px")
            .text(d.data.key);
        });

        arcs.on("mouseout",function(){
            tooltip.style("visibility","hidden")

        })




    });
