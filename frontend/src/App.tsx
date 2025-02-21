import "./App.css";
import FileUploader from "./components/FileUploader";
// import Home from "./components/Home";

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950 dark:bg-white">
      <FileUploader />
    </div>
  );
}

export default App;
