import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Bag from "./routes/Bag.jsx";
import Home from "./routes/Home.jsx";
import CategoryPage from "./routes/CategoryPage.jsx";
import { Provider } from "react-redux";
import myntraStore from "./store/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/bag",
        element: <Bag />,
      },
      {
        path: "/men",
        element: <CategoryPage category="men" />,
      },
      {
        path: "/women",
        element: <CategoryPage category="women" />,
      },
      {
        path: "/kids",
        element: <CategoryPage category="kids" />,
      },
      {
        path: "/home-living",
        element: <CategoryPage category="home-living" />,
      },
      {
        path: "/beauty",
        element: <CategoryPage category="beauty" />,
      },
      {
        path: "/studio",
        element: <CategoryPage category="studio" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
