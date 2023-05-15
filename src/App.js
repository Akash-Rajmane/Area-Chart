import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./styles.css";

export default function App() {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = [
      { year: 2010, sale: 10000 },
      { year: 2011, sale: 30000 },
      { year: 2012, sale: 15000 },
      { year: 2013, sale: 20000 },
      { year: 2014, sale: 35000 },
      { year: 2015, sale: 5000 }
    ];

    const svg = d3
      .select(svgRef.current)
      .attr("width", 500)
      .attr("height", 400)
      .style("margin", "20")
      .style("overflow", "visible");

    const x = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.year), d3.max(data, (d) => d.year)])
      .range([0, 480]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.sale)])
      .range([380, 0]);

    svg
      .append("g")
      .attr("transform", "translate(" + 20 + "," + 380 + ")")
      .call(d3.axisBottom(x).ticks(6));

    svg
      .append("g")
      .attr("transform", "translate(" + 20 + "," + 0 + ")")
      .call(d3.axisLeft(y));

    const area = d3
      .area()
      .x(function (d) {
        return x(d.year);
      })
      .y0(y(0))
      .y1(function (d) {
        return y(d.sale);
      });

    svg
      .append("g")
      .attr("transform", "translate(" + 20 + "," + 0 + ")")
      .append("path")
      .attr("class", "chart")
      .attr("d", area(data));

    // svg.append("path")
    // .datum(data)
    // .attr("fill", "#cce5df")
    // .attr("stroke", "#69b3a2")
    // .attr("stroke-width", 1.5)
    // .attr("transform", "translate("+20+","+0+")")
    // .attr("d", d3.area()
    //   .x(function(d) { return x(d.year) })
    //   .y0(y(0))
    //   .y1(function(d) { return y(d.sale) })
    // )
  }, []);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}
