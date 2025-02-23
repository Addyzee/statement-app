import { Doughnut } from "./Doughnut";
import data from "./Data.json";

const t_type_amounts_in =
  data.analysis.transaction_type_analysis.amounts.In.Main;

const IncomeType = () => {
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
