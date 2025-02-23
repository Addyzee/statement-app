import { Doughnut } from "./Doughnut";
import data from "./Data.json";


const t_type_amounts_out = data.analysis.transaction_type_analysis.amounts.Out.Main;

const ExpenditureType = () => {
  return (
    <div>
      <Doughnut data={t_type_amounts_out} />
    </div>
  );
};

export default ExpenditureType;
