import { useState } from "react";
import * as React from "react";
import { SearchContext } from "./hooks/searchContext";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./index.css";

function App() {
  const [searchedQuery, setSearchedQuery] = useState(null);
  return (
    <>
      <SearchContext.Provider value={{ searchedQuery, setSearchedQuery }}>
        <div className="h-screen overflow-auto flex min-h-screen flex-col justify-between ">
          <div data-testid="container" className="flex flex-col items-center justify-center pt-0 p-12">
            <Navbar />
            <Main />
          </div>
          <Footer />
        </div>
      </SearchContext.Provider>
    </>
  );
}

export default App;
