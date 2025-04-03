import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import UploadPage from "./components/Upload/UploadPage";
import Analysis from "./components/Analysis/Analysis";
import AnalysisPDF from "./components/AnalysisPDF/AnalysisPDF";
import NotFound from "./NotFound";
import Footer from "./components/Footer";
import { ResponseProvider } from "./components/context/ResponseProvider";

const Layout = () => {
  return (
    <>
      <Link to="/" className="text-xl font-bold mb-2 w-full">Statements App</Link>
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
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
    ],
  },
]);

function App() {
  return (
    <ResponseProvider>
      <div className="font-quicksand text-white flex flex-col items-center h-screen bg-zinc-950 dark:bg-white py-5 px-5 overflow-y-scroll">
        <RouterProvider router={router} />
      </div>
    </ResponseProvider>
  );
}

export default App;
