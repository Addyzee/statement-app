import FileUploader from "./FileUploader";
const UploadPage = () => {
  return (
    <div className="w-full h-full py-10 px-5">
      <h2 className="text-xl font-bold mb-2">Statements App</h2>
      <FileUploader />
    </div>
  );
};

export default UploadPage;
