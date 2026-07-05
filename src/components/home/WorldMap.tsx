"use client";

import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// The countries ÖZENSAN exported to
const activeCountries = [
  "Turkey",
  "Poland",
  "Ukraine",
  "Iraq",
  "Libya",
  "Syria",
  "Afghanistan",
  "Egypt"
];

export default function WorldMap() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <ComposableMap
        projectionConfig={{
          scale: 140,
          center: [20, 30] // Centers the map roughly around the Middle East/Europe to show the active countries best
        }}
        width={800}
        height={400}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isExported = activeCountries.includes(geo.properties.name);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isExported ? "#C61A1A" : "#E2E8F0"}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: isExported ? "#9D1414" : "#CBD5E1", outline: "none", cursor: "pointer" },
                    pressed: { outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
