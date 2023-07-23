"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function WorldMap() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [coordinates, setCoordinates] = useState({ lon: 0, lat: 0 });

  const handleMouseClick = async ({
    lon,
    lat,
  }: {
    lon: number;
    lat: number;
  }) => {
    const response = await fetch("/api/story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lon, lat }),
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    d3.xml(
      "https://upload.wikimedia.org/wikipedia/commons/5/51/BlankMap-Equirectangular.svg"
    ).then((data) => {
      const divNode = divRef.current;
      if (!divNode) return;
      divNode.innerHTML = "";
      divNode.appendChild(data.documentElement);

      const svg = d3.select(divNode).select("svg");
      const svgWidth = divNode.getBoundingClientRect().width;
      const svgHeight = divNode.getBoundingClientRect().height;
      svg.attr("width", svgWidth * 2).attr("height", svgHeight * 2);

      svg.on("mousemove", (event) => {
        const [x, y] = d3.pointer(event);
        const lon = (x / svgWidth) * 360 - 180;
        const lat = 90 - (y / svgHeight) * 180;
        setCoordinates({ lon, lat });

        const circle = svg
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 1)
          .style("fill", "none")
          .style("stroke", "#FCFDF7")
          .style("stroke-opacity", 1);

        circle
          .transition()
          .duration(2000)
          .attr("r", 20)
          .style("stroke-opacity", 0)
          .remove();
      });
    });
  }, []);

  return (
    <div className="flex-col py-36">
      <div ref={divRef} className="w-full h-auto" />
    </div>
  );
}
