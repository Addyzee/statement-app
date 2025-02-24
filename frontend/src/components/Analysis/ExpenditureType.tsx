import { Doughnut } from "./Doughnut";
import { useTransactionAnalysis } from "../context/ResponseContext";


const ExpenditureType = () => {
    const t_type_amounts_out = useTransactionAnalysis().amounts.Out.Main
  
  return (
    <div className="lg:flex lg:flex-row-reverse border">
      
      <div className="flex-1">
        <Doughnut data={t_type_amounts_out} />
      </div>
      <div className="flex-1 border">
        Some text here too
      </div>
    </div>
  );
};

export default ExpenditureType;
