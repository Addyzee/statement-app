import React, { useState, useCallback, ChangeEvent, DragEvent } from "react";
import { AlertCircle, Upload, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UploadPage: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFile = (file: File | null): void => {
    setError("");

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file only");
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      setError("File size should be less than 30MB");
      return;
    }

    setPdfFile(file);
  };

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const removeFile = (): void => {
    setPdfFile(null);
    setError("");
  };

  return (
    <div className="h-full py-10 px-4">
      <h2 className="font-bold text-lg">MPESA Statement</h2>
      <p className="text-gray-600 mb-6">
        Upload the PDF of your M-PESA statement
      </p>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-center h-2/3 items-center">
        {!pdfFile ? (
          <div
            className={`h-2/3 w-full max-w-2xl border-2 border-dashed rounded-lg 
              ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"} 
              ${error ? "border-red-500" : ""}
              transition-colors duration-200`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <label className="flex flex-col items-center justify-center h-full cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PDF (MAX. 30MB)</p>
              </div>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
          </div>
        ) : (
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-900">
                    {pdfFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                type="button"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="w-full h-96 border border-gray-200 rounded-lg">
              <object
                data={URL.createObjectURL(pdfFile)}
                type="application/pdf"
                className="w-full h-full"
              >
                <p>Your browser does not support PDF preview.</p>
              </object>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
