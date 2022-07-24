import * as React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <div className="h-screen  overflow-auto flex min-h-screen flex-col justify-between ">
    <div className="flex flex-col items-center justify-center pt-0 p-12">
      <Navbar />
      <Main />
    </div>
    <Footer />
  </div>
);
