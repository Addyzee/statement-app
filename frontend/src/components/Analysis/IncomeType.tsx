import { Doughnut } from "./Doughnut";
import { useTransactionAnalysis } from "../context/ResponseContext";



const IncomeType = () => {
  const t_type_amounts_in = useTransactionAnalysis().amounts.In.Main
  return (
    <div className="lg:flex border">
      <div className="flex-1">
        <Doughnut data={t_type_amounts_in} />
      </div>
      <div className="border flex-1">Some text will come here</div>
    </div>
  );
};

export default IncomeType;
