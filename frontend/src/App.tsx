import { useState } from "react";
import "./App.css";
import UploadPage from "./components/UploadPage";
import Analysis from "./components/Analysis/Analysis";
import { PagingContext } from "./components/context/PagingContext";
import { DataContextProvider } from "./components/context/DataContextProvider";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("Home");
  const pagingContext = { currentPage, setCurrentPage };


  return (
    <PagingContext.Provider value={pagingContext}>
      <DataContextProvider>
      <div className="font-quicksand text-white flex flex-col items-center  h-screen bg-zinc-950 dark:bg-white py-5 px-5">
        <h2 className="text-xl font-bold mb-2 w-full">Statements App</h2>
        {currentPage == "Home" ? <UploadPage /> : <Analysis />}
      </div>
      </DataContextProvider>
    </PagingContext.Provider>
  );
}

export default App;
