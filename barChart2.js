const margin2 = {top:65, right:100, bottom:60, left:60};
const width2 = 600;
const height2 = 400;

const chart2 = d3.select("#chart2").append("svg")
            .attr("width", width2 + margin2.left + margin2.right)
            .attr("height",height2 + margin2.top + margin2.bottom)
            .append("g")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + " )");

//const color = ['#d53e4f','#fc8d59','#fee08b'];
const color2 = ["#d53e4f","#d7495a","#fc8d59","#fc986a","#fee08b","#fee59f"];

const legendColor = ['#d7495a','#fc986a','#fee59f'];
const legendColor2 = ['#d53e4f','#fc8d59','#fee08b'];


const x2 = d3.scaleBand()
    .rangeRound([0, width2])
    .paddingInner(0.02)
    .align(0.1);

const y2 = d3.scaleLinear()
    .rangeRound([height2,0]);
    
const z2 = d3.scaleOrdinal()
    .range(color2);

const d2 = d3.scaleOrdinal()
    .range(legendColor)    

const e2 = d3.scaleOrdinal()
    .range(legendColor2)

    
d3.csv("data2.csv", function(d,i,columns){
    for(i = 1, t = 0; i < columns.length; ++i)
    t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
}, function(error,data){
    if (error) throw error; 

    /*
    data.forEach((d,i) => {
      d.id  = i +1;     
    });
*/
console.log(data)

  var keyskeys2 = ["Sökande","Antagna","Examen"];

    var keys2 = data.columns.slice(1);
    

    x2.domain(data.map(function(d){ return d.år}));
    y2.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
    z2.domain(keys2);
    d2.domain(keyskeys2);
    e2.domain(keyskeys2);

    const dataStacked2 = d3.stack().keys(keys2)(data);

    for(var i = 0; i < dataStacked2.length; i++){
      for(var j = 0; j < dataStacked2[i].length; j++){
        for(var k = 0; k < dataStacked2[i][k].length; k++){
          //console.log(data1[i][k])
          dataStacked2[i][j].id = i + 1
        }
      }
    }

  

    var bars2 = chart2.append("g")
    .selectAll("g")
    .data(dataStacked2)
    .enter().append("g")
    .attr("id",function(d,i){
      return data[d];
  })
      .attr("fill", function(d) { return z2(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x2(d.data.år); })
      .attr("y", function(d) { return y2(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x2.bandwidth())
      .attr("class","hej")
      .classed("test1",function(d) {if (d.id === 1  ){return true } else return false} )
      .attr("id",function(d,i){return  i})
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("mousemove",handleMouseMove)
      
        
        chart2.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 11)

          // (x.bandwidth()/2)

      chart2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2));

      chart2.append("text")             
      .attr("x",width2/2)
      .attr("y",height2 + 40)
      .style("text-anchor", "middle")
      .text("År");

      chart2.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y2).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y2(y2.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start");

      chart2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin2.left)
      .attr("x",0 - (height2 / 2))
      .attr("dy", "1em")
      .attr("font-family", "sans-serif")
      .style("text-anchor", "middle")
      .text("Antal");   


      var legend2 = chart2.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keyskeys2)
      .attr("id",function(d,i){return  i})
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(40," + i * 20 +  ")"; })
      .append("g").attr("transform","translate(-40,-60)");


      legend2.append("rect")
          .attr("x", width2 - 22) 
          .attr("width", 19)
          .attr("height", 19)
          .style("fill", d2 )

      legend2.append("text")
          .attr("x", width2 - 30)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .text(function(d) { return d; });

      var legend2 = chart2.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keyskeys2)
      .attr("id",function(d,i){return  i})
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(59," + i * 20 +  ")"; })
      .append("g").attr("transform","translate(-40,-60)");

      legend2.append("rect")
          .attr("x", width2 - 22) 
          .attr("width", 19)
          .attr("height", 19)
          .style("fill", e2 )


      var title2 = chart2.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 16)
        .attr("text-anchor", "middle")
        .append("text")
        .text("Civilingenjör Medieteknik Linköpings Universitet")
        .attr("x", width2/2)
        .attr("y", -25);
       
        var tooltip2 = chart2.append("g")
          .style("display", "none");
            
        tooltip2.append("rect")
          .attr("width", 130)
          .attr("height", 30)
          .attr("fill", "white")
          .style("opacity", 1)
          .attr("stroke-width", 0.5)
          .attr("stroke", "black")
        
        tooltip2.append("text")
          .attr("x", 2)
          .attr("y", 5)
          .attr("dy", "1.2em")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("font-weight", "bold")

           



      function handleMouseOver(d,key){
        d3.select(this) //.attr("fill", "black")
      //  console.log(d)
      //  console.log(this.id)
        
        tooltip2.style("display",null)
      
      }

      function handleMouseOut(d,i){
          d3.select(this)
          
          tooltip2.style("display", "none")
      }
      
      function handleMouseMove(d,i){
       //  console.log(typeof d3.select(this).attr("id"))
       //  console.log(d);
       // console.log( document.querySelector('rect').__data__ )
        d3.select(this)
        var xPosition = d3.mouse(this)[0] - 5;
        var yPosition = d3.mouse(this)[1] - 65;
            tooltip2.attr("transform", "translate(" + xPosition + "," + yPosition + ")");

            if(d.id === 1 ){
              tooltip2.select("text").text( "Sökande (män): " + d.data.Ms )
              
            }
            else if (d.id === 2){
              tooltip2.select("text").text( "Sökande (kvinna): " + d.data.Ks )
            }
            else if( d.id === 3){
              tooltip2.select("text").text( "Antagna (man): " + d.data.Ma )
            }
            else if( d.id === 4){
              tooltip2.select("text").text( "Antagna (kvinna): " + d.data.Ka )
            }
            else if( d.id === 5){
              tooltip2.select("text").text( "Examen (man): " + d.data.Me )
            }
            else {
              tooltip2.select("text").text( "Examen (kvinna): " + d.data.Ke )
            }
      }
})    