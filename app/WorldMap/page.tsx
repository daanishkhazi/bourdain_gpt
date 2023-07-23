"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Spinner from "@/components/spinner";

export default function WorldMap() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [coordinates, setCoordinates] = useState({ lon: 0, lat: 0 });
  const [popup, setPopup] = useState<{
    visible: boolean;
    text: string;
    city: string;
  }>({
    visible: false,
    text: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);

  const handleMouseClick = async (lon: number, lat: number) => {
    console.log(lon, lat);
    setLoading(true);
    const response = await fetch("/api/story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lon, lat }),
    });
    setLoading(false);
    if (!response.ok) {
      console.log(response);
      setPopup({
        visible: true,
        text: "No nearby cities found. Try choosing a different location",
        city: "",
      });
      return;
    }
    const data = await response.json();
    console.log("data", data);
    if (!data.story || !data.city) {
      setPopup({
        visible: true,
        text: "No nearby cities found. Try choosing a different location",
        city: "",
      });
      return;
    }
    setPopup({
      visible: true,
      text: data.story,
      city: data.city,
    });
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

        svg.on("click", () => handleMouseClick(lon, lat)); // Send coordinates on click

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
    <div className="flex-col py-24">
      <div ref={divRef} className="w-full h-auto" />

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {popup.visible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl text-center max-w-lg mx-auto">
            <h1 className="text-xl font-bold pb-4">{popup.city}</h1>
            <p className="line">{popup.text}</p>
            <button
              onClick={() => setPopup({ visible: false, text: "", city: "" })}
              className="absolute top-5 right-5 text-2xl font-bold hover:scale-110 transition ease-in-out delay-50 rounded-2"
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
