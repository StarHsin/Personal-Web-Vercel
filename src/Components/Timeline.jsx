import React from "react";
import TimelineItem from "./HomePage/TimelineItem";
import { competitions } from "../data/competitions";

export default function Timeline() {
  return (
    <div className="container mx-auto px-4 py-8 w-4/5 md:w-3/5 lg:w-3/5">
      <h2 className="text-4xl font-bold text-center text-gray-200 mb-4">
        競賽榮譽
      </h2>
      <div className="relative wrap overflow-hidden py-6 h-full">
        <div
          className="border-2-2 absolute border-opacity-20 border-gray-200 h-full border"
          style={{ left: "20%" }}
        ></div>
        {competitions.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
