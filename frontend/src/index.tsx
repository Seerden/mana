require("file-loader?name=[name].[ext]!./index.html");

import App from "components/App";
import { createRoot } from "react-dom/client";
import "./index.scss";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
