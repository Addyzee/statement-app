import { ChangeEvent, useRef, useState } from "react";
import { ArchiveX } from "lucide-react";
import { AxiosError } from "axios";
import { Button } from "../ui/button";
import { LoadingButton } from "../ui/loadingbutton";
import axios from "axios";
import { useResponse } from "../context/ResponseContext";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_BACKEND_URL;

type UploadStatus = "idle" | "instate" | "uploading" | "success" | "error";
type ErrorResponse = {
  detail: string;
};

const FileUploader = () => {
  const navigate = useNavigate();
  const { setFileUploaded, setData, isLoading, setIsLoading, error, setError } =
    useResponse();

  const [pdfFile, setPDFFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPDFFile(e.target.files[0]);
      setFileUploaded(true);
    }
  };

  const recordPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value || null);
  };

  const clearFileField = () => {
    setPDFFile(null);
    setFileUploaded(false);
    setStatus("idle");
    setUploadProgress(0);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFileUpload = async () => {
    if (!pdfFile) {
      setError(new Error("Please select a file"));
      return;
    }
    setStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", pdfFile);
    if (password) formData.append("password", password);

    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(`${baseURL}decrypt/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const progress = event.total
            ? Math.round((event.loaded * 100) / event.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setStatus("success");
      setUploadProgress(100);
      setData(response.data);
      localStorage.setItem("sessionId", response.data.session_id);
      return navigate("/analysis");
    } catch (err) {
      setStatus("error");
      setUploadProgress(0);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          setError(new Error(axiosError.response.data.detail));
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <div
        className={`border border-white flex flex-col  justify-center items-center p-3 gap-2 ${
          !pdfFile ? "hover:bg-slate-800 cursor-pointer" : ""
        }`}
      >
        <div className="flex gap-5">
          {!pdfFile && (
            <input
              ref={fileRef}
              type="file"
              onChange={handleFileChange}
              className="flex justify-center"
            />
          )}

          {pdfFile && status !== "uploading" && (
            <div className="border border-white px-2 flex gap-5 hover:bg-yellow-300 hover:text-black">
              <label>
                {pdfFile.name.slice(0, 20)}
                <input
                  ref={fileRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {pdfFile && status !== "uploading" && (
            <div className="flex justify-end">
              <ArchiveX onClick={clearFileField} />
            </div>
          )}
        </div>

        {pdfFile && (
          <>
            {status === "uploading" && (
              <p className="text-green-600">Upload status: {uploadProgress}%</p>
            )}
            {status === "success" && (
              <p className="text-green-600">File upload successful!</p>
            )}
            {status === "error" && error && (
              <p className="text-red-700">{String(error)}</p>
            )}
            {isLoading && uploadProgress === 100 && <LoadingButton />}
          </>
        )}

        {pdfFile && status !== "uploading" && (
          <div className="flex gap-3">
            <label htmlFor="password">Enter statement password</label>
            <input
              type="text"
              name="password"
              className="border border-white text-right h-9"
              onChange={recordPassword}
            />
          </div>
        )}
      </div>

      {pdfFile && status !== "uploading" && (
        <div className="flex flex-col gap-3">
          <Button variant="default" onClick={handleFileUpload}>
            Upload PDF
          </Button>
          <Button variant="default" onClick={handleFileUpload}>
            Upload without password
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
