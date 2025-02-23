import { Doughnut } from "./Doughnut";
import data from "./Data.json";

const t_type_amounts_out =
  data.analysis.transaction_type_analysis.amounts.Out.Main;

const ExpenditureType = () => {
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
