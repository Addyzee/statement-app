import { useState } from "react";
import "./App.css";
import UploadPage from "./components/UploadPage";
import Analysis from "./components/Analysis/Analysis";
import { AppContext } from "./components/context/AppContext";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("Analysis");
  const [userName, setUserName] = useState<string | null>(null);
  const userContext = { userName, setUserName };
  const pagingContext = { currentPage, setCurrentPage };
  const dataContext = { userContext };
  const appContextValues = { pagingContext, dataContext };

  return (
    <AppContext.Provider value={appContextValues}>
      <div className="font-quicksand text-white flex flex-col items-center  h-screen bg-zinc-950 dark:bg-white py-5 px-5">
        <h2 className="text-xl font-bold mb-2 w-full">Statements App</h2>
        {currentPage == "Home" ? <UploadPage /> : <Analysis />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
