"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function WorldMap() {
  const divRef = useRef();
  const [coordinates, setCoordinates] = useState({ lon: 0, lat: 0 });

  useEffect(() => {
    d3.xml(
      "https://upload.wikimedia.org/wikipedia/commons/9/9f/BlankMap-World-Equirectangular.svg"
    ).then((data) => {
      const divNode = divRef.current;
      divNode.innerHTML = "";
      divNode.appendChild(data.documentElement);

      const svg = d3.select(divNode).select("svg");
      const svgWidth = divNode.getBoundingClientRect().width;
      const svgHeight = divNode.getBoundingClientRect().height;

      svg.on("mousemove", (event) => {
        // Get the mouse coordinates
        const [x, y] = d3.pointer(event);

        // Calculate the longitude and latitude
        const lon = (x / svgWidth) * 360 - 180;
        const lat = 90 - (y / svgHeight) * 180;
        setCoordinates({ lon, lat });

        // Create a circle at the mouse position
        const circle = svg
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 1)
          .style("fill", "none")
          .style("stroke", "red")
          .style("stroke-opacity", 1);

        // Animate the circle to grow and fade out
        circle
          .transition()
          .duration(1000)
          .attr("r", 50)
          .style("stroke-opacity", 0)
          .remove();
      });
    });
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ width: "100%", height: "auto" }} />
      <p>
        Longitude: {coordinates.lon.toFixed(2)}, Latitude:{" "}
        {coordinates.lat.toFixed(2)}
      </p>
    </div>
  );
}
