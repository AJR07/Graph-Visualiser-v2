import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Graph from "./graph/graph";

// root of the app
// renders the entire app in the div with id "root"
ReactDOM.render(
    <React.StrictMode>
        <Graph />
    </React.StrictMode>,
    document.getElementById("root")
);
