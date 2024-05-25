import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import App from "./App.js";
import Dashboard from "./Pages/Dashboard.jsx";
import Asset1 from "./Pages/Asset1.jsx";
import Asset2 from "./Pages/Asset2.jsx";
import Asset3 from "./Pages/Asset3.jsx";
// import Asset4 from './Pages/Asset4.jsx';
// import Asset5 from './Pages/Asset5.jsx';
// import Asset6 from './Pages/Asset6.jsx';

const router = createBrowserRouter(
  createRoutesFromChildren([
    <Route path="/" element={<App />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Asset1" element={<Asset1 />} />
      <Route path="/Asset2" element={<Asset2 />} />
      <Route path="/Asset3" element={<Asset3 />} />
      {/* <Route path='/Asset4' element={<Asset4/>}/>
      <Route path='/Asset5' element={<Asset5/>}/>
      <Route path='/Asset6' element={<Asset6/>}/> */}
    </Route>,
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
