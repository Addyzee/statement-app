import { ChangeEvent, useRef, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

type UploadStatus = "idle" | "instate" | "uploading" | "success" | "error";

const FileUploader = () => {
  const [pdfFile, setPDFFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement |null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPDFFile(e.target.files[0]);
    }
  };
  const clearFileField = () => {
    setPDFFile(null);
    setStatus("idle");
    setUploadProgress(0);
    if (fileRef.current){
        fileRef.current.value = ''
    }
  }
  async function handleFileUpload() {
    if (!pdfFile) return;
    setStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", pdfFile);
    try {
      await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ProgressEvent) => {
          const progress = ProgressEvent.total
            ? Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setStatus("success");
      setUploadProgress(100);
    } catch {
      setStatus("error");
      setUploadProgress(0);
    }
  }

  return (
    <div className="text-white h-full w-full flex justify-center items-center">
      <div className=" border border-white flex flex-col items-center p-3 gap-2">
        {pdfFile && status != "uploading" && (
          <div className="flex justify-end w-full">
            <button onClick={clearFileField}>X</button>
          </div>
        )}


        <input ref={fileRef} type="file" onChange={handleFileChange} className=""/>
        {pdfFile && (
          <div>
            <p>
              {pdfFile.name.slice(0, 10)}
            </p>
          </div>
        )}
        {pdfFile && status != "uploading" && (
          <div>

            <Button onClick={handleFileUpload}>Upload Button</Button>
          </div>
        )}
        {pdfFile && status === "uploading" && (
          <p className="text-green-600">Upload status: {uploadProgress}%</p>
        )}
        {pdfFile && status === "success" && (
          <p className="text-green-600">File upload successful!</p>
        )}
        {pdfFile && status === "error" && (
          <p className="text-red-700">Upload failed. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
