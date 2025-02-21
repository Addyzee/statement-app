import { useState } from "react";
import "./App.css";
import UploadPage from "./components/UploadPage";
import Analysis from "./components/Analysis";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("Home");
  return (
    <div className="font-quicksand text-white flex items-center justify-center h-screen bg-zinc-950 dark:bg-white">
      {currentPage == "Home" ? <UploadPage /> : <Analysis />}
    </div>
  );
}

export default App;
