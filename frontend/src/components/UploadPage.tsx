import FileUploader from "./FileUploader";
const UploadPage = () => {
  return (
    <div className="w-full h-full py-10 px-5">
      <h2 className="text-lg">Upload your M-PESA statement pdf</h2>
      <FileUploader />
    </div>
  );
};

export default UploadPage;
