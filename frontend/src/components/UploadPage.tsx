import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import { useResponse } from "./context/ResponseContext";
import { PagingContext } from "./context/PagingContext";
import { LoadingButton } from "./ui/loadingbutton";
import { useContext } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL

const UploadPage = () => {
  const { setData, isLoading,  setIsLoading, setError } = useResponse();
    const { setCurrentPage } = useContext(PagingContext);
  

  const requestSample = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(
        `${baseURL}sample-analysis/`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data);
      localStorage.setItem('sessionId', response.data.session_id);
      setCurrentPage("Analysis");
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full py-10 px-5 ">
      <h2 className="text-lg">Upload your M-PESA statement pdf</h2>
      <FileUploader />
      <div className="w-full flex items-center mt-6 flex-col">
        <Button onClick={requestSample}>Or... try with our sample statement</Button>
        {isLoading && <LoadingButton />}
        
      </div>
    </div>
  );
};

export default UploadPage;
