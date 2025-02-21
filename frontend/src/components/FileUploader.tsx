import { ChangeEvent, useRef, useState } from "react";
import { ArchiveX } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

type UploadStatus = "idle" | "instate" | "uploading" | "success" | "error";

const FileUploader = () => {
  const [pdfFile, setPDFFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPDFFile(e.target.files[0]);
    }
  };
  const clearFileField = () => {
    setPDFFile(null);
    setStatus("idle");
    setUploadProgress(0);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const recordPassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPassword(e.target.value);
    }
  };

  async function handleFileUpload() {
    if (!pdfFile) return;
    if (!password) return;
    setStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("password", password);
    try {
      await axios.post("http://127.0.0.1:8000/decrypt/", formData, {
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
    <div className="flex flex-col gap-3 justify-center items-center ">
      <h2 className="text-lg">Upload your M-PESA statement pdf</h2>
      <div
        className={` border border-white flex flex-col justify-center items-center p-3 gap-2 ${
          !pdfFile ? "hover:bg-slate-800" : ""
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

          {pdfFile && status != "uploading" && (
            <div className="border border-white px-2 flex gap-5 hover:bg-yellow-300 hover:text-black">
              <label>
                {pdfFile.name.slice(0, 20)}
                <input
                  ref={fileRef}
                  type="file"
                  onChange={handleFileChange}
                  className=" justify-center hidden"
                />
              </label>
            </div>
          )}
          {pdfFile && status != "uploading" && (
            <div className="flex justify-end cursor-pointer">
              <ArchiveX onClick={clearFileField}></ArchiveX>
            </div>
          )}
        </div>

        {pdfFile && status === "uploading" && (
          <p className="text-green-600">Upload status: {uploadProgress}%</p>
        )}
        {pdfFile && status === "success" && (
          <p className="text-green-600">File upload successful!</p>
        )}
        {pdfFile && status === "error" && (
          <p className="text-red-700">Upload failed. Please try again.</p>
        )}
        {pdfFile && status != "uploading" && (
          <div className="flex gap-3">
            <label htmlFor="password">Enter statement password</label>
            <input
              type="text"
              name="password"
              id=""
              className="border border-white text-right"
              onChange={recordPassword}
            />
          </div>
        )}
      </div>
      {pdfFile && status != "uploading" && (
        <div>
          <Button onClick={handleFileUpload}>Upload PDF</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
