import { useContext } from "react";
import FileUploader from "./FileUploader";
import { AppContext } from "./context/AppContext";
const UploadPage = () => {
  const {userName} = useContext(AppContext).dataContext.userContext
  return (
    <div className="w-full h-full py-10 px-5">
      <h2 className="text-lg">{`${userName ? userName : "Upload your M-PESA statement pdf"}`}</h2>
      <FileUploader />
    </div>
  );
};

export default UploadPage;
