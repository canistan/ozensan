"use client";

import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const activeCountries = [
  "Turkey",
  "Iraq",
  "Afghanistan",
  "Libya",
  "Djibouti",
  "Indonesia"
];

const markers = [
  { name: "Türkiye", coordinates: [35.2433, 38.9637], flag: "🇹🇷" },
  { name: "Irak", coordinates: [43.6793, 33.2232], flag: "🇮🇶" },
  { name: "Afganistan", coordinates: [67.7100, 33.9391], flag: "🇦🇫" },
  { name: "Libya", coordinates: [17.2283, 26.3351], flag: "🇱🇾" },
  { name: "Cibuti", coordinates: [42.5903, 11.8251], flag: "🇩🇯" },
  { name: "Endonezya", coordinates: [113.9213, -0.7893], flag: "🇮🇩" }
];

export default function WorldMap() {
  return (
    <div className="w-full max-w-5xl mx-auto relative mt-8">
      <ComposableMap
        projectionConfig={{
          scale: 160,
          center: [50, 20] // Adjusted center to show Indonesia and Europe/MENA better
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
                    hover: { fill: isExported ? "#9D1414" : "#CBD5E1", outline: "none" },
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
