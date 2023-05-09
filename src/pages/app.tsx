import { BrowserRouter, Route, Routes } from "react-router-dom";
import Graph from "./graph/graph";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Graph />} />
                <Route path="graph">
                    <Route path=":data" element={<Graph />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
