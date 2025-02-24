import { useContext } from "react";
import FileUploader from "./FileUploader";
import { DataContext } from "./context/DataContext";
const UploadPage = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error("DataContext must be used within a DataContextProvider");
  const {userName } = context.userContext


  return (
    <div className="w-full h-full py-10 px-5">
      <h2 className="text-lg">{`${
        userName ? userName : "Upload your M-PESA statement pdf"
      }`}</h2>
      <FileUploader />
    </div>
  );
};

export default UploadPage;
