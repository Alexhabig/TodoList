import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Todo from "./pages";
import Fixload from "./pages/fixload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todo />,
  },
  {
    path: "/Fix",
    element: <Fixload />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
