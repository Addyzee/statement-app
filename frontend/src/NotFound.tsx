import { useNavigate } from "react-router-dom"
import { Button } from "./components/ui/button"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="h-full flex flex-col space-y-4">
      <p>Please upload an M-Pesa statement.</p>
      <Button onClick={()=> navigate("/")}>Navigate to home to upload</Button>
    </div>
  )
}

export default NotFound