import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUploader = () => {
  const [pdfFile, setPDFFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPDFFile(e.target.files[0]);
    }
  };
  async function handleFileUpload() {
    if (!pdfFile) return;
    setStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("statement", pdfFile);
    try {
      await axios.post("https://httpbin.org/post", formData, {
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
      <div className="w-3/4 h-1/2 border border-white flex flex-col justify-center items-center">
        <input type="file" onChange={handleFileChange} />
        {pdfFile && (
          <div>
            <p>{pdfFile.name.slice(0,20)}</p>
            <p>{(pdfFile.size / 1024).toFixed(2)}</p>
            <p>{pdfFile.type}</p>
          </div>
        )}
        {pdfFile && status != "uploading" && (
          <Button onClick={handleFileUpload}>Upload Button</Button>
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
