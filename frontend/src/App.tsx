import { useState } from "react";
import "./App.css";
import UploadPage from "./components/UploadPage";
import Analysis from "./components/Analysis";
import { AppContext } from "./components/context/AppContext";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("Home");
  const [userName, setUserName] = useState<string | null>(null);
  const userContext = { userName, setUserName };
  const pagingContext = { currentPage, setCurrentPage };
  const dataContext = { userContext };
  const appContextValues = { pagingContext, dataContext };

  return (
    <AppContext.Provider value={appContextValues}>
      <div className="font-quicksand text-white flex items-center justify-center h-screen bg-zinc-950 dark:bg-white">
        {currentPage == "Home" ? <UploadPage /> : <Analysis />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
