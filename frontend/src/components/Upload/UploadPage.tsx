import { useState } from "react";
import FileUploader from "./FileUploader";
import { Button } from "../ui/button";
import { useResponse } from "../context/ResponseContext";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingButton } from "../ui/loadingbutton";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const UploadPage = () => {
  const navigate = useNavigate()
  const { setData, setError } = useResponse();
  const [loading, setIsLoading] = useState(false);

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
      localStorage.setItem("sessionId", response.data.session_id);
      return navigate("/analysis")
      
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
        <Button onClick={requestSample}>
          Or... try with our sample statement
        </Button>
        {loading && <LoadingButton />}
      </div>
    </div>
  );
};

export default UploadPage;
