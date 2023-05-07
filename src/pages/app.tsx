import { BrowserRouter, Route, Routes } from "react-router-dom";
import GraphUI from "./graph/ui";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GraphUI />} />
                <Route path="graph">
                    <Route path=":data" element={<GraphUI />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
