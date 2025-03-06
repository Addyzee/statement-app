import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UploadPage from "./components/Upload/UploadPage";
import Analysis from "./components/Analysis/Analysis";
import AnalysisPDF from "./components/AnalysisPDF/AnalysisPDF";
import NotFound from "./NotFound";
import { ResponseProvider } from "./components/context/ResponseProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UploadPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/analysis",
    element: <Analysis />,
    errorElement: <NotFound />,
  },
  {
    path: "/analysis/pdf",
    element: <AnalysisPDF />,
    errorElement: <NotFound />,
  },
]);

function App() {
  return (
    <ResponseProvider>
      <div className="font-quicksand text-white flex flex-col items-center h-screen bg-zinc-950 dark:bg-white py-5 px-5 overflow-hidden">
        <h2 className="text-xl font-bold mb-2 w-full">Statements App</h2>
        <RouterProvider router={router} />
      </div>
    </ResponseProvider>
  );
}

export default App;
