import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation
} from "react-simple-maps";
import './AboutUs.css';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = () => {
  return (
    <div>
        <div className="TextStorage">
            <h1>About Storagemate</h1>
            <p>An award-winning company that has a great outlook!</p>
            <p>Storage is the leading provider of storage units for your personal, business and vehicle needs with best location in world. 
                We offer a wide variety of units and sizes available with no obligation and no long-term commitment.
                Our office is located in Estonia capital of Tallinn.
            </p>
            <h2>
            Location: Vihma 39, 3244, Tallinn<br />
            Phone: +372 3302394<br />
            Skype: Storagemate@skype.ee<br />
            E-mail: storagemate@sales.ee<br />
            Address: Tallinn maantee 2, 43293 Tallinn
            </h2>

        </div>
            <div className="map">
                <ComposableMap  
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [-20.0, -51.0, 0],
                    scale: 1200
                }}
                >
                <Geographies
                    geography={geoUrl}
                    fill="#D6D6DF"
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                >
                    {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                    }
                </Geographies>
                <Annotation
                    subject={[25.5975, 58.8566]}
                    dx={-40}
                    dy={-30}
                    connectorProps={{
                    stroke: "#000080",
                    strokeWidth: 3,
                    strokeLinecap: "round"
                    }}
                >
                    <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#000080" font-size="20px">
                    {"Estonia"}
                    </text>
                </Annotation>
                </ComposableMap>
            </div>
    </div>
  );
};

export default MapChart;


