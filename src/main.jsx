import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import About from "./pages/About";
import FeaturedProjects from "./components/Projects/FeaturedProjects";
import ProjectsMain from "./components/Projects/ProjectsMain";
import NotesPage from "./pages/Notes";
import BlogsPage from "./pages/BlogsPage";
import AppLayout from "./App";
import "./index.css";
import "locomotive-scroll/dist/locomotive-scroll.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "projects", element: <ProjectsPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "notes", element: <NotesPage /> },
        { path: "blogs", element: <BlogsPage /> },
        { path: "featured-projects", element: <FeaturedProjects /> },
        { path: "all-projects", element: <ProjectsMain /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
