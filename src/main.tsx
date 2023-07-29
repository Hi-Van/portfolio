import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.tsx";
import { About } from "./pages/About.tsx";
import { Landing } from "./pages/Landing.tsx";
import { Experience } from "./pages/Experience.tsx";
import { Projects } from "./pages/Projects.tsx";

const override = extendTheme({
  fonts: {
    body: "Inter Tight, sans-serif",
    heading: "Inter Tight, sans-serif",
    poppins: "Poppins",
  },

  styles: {
    global: {
      body: {
        color: "#221E41",
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/experience",
        element: <Experience />,
      },
      {
        path: "/projects",
        element: <Projects />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={override}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
