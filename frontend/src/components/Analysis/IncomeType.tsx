import { Doughnut } from "./Doughnut"
import data from "./Data.json";


const t_type_amounts_in = data.analysis.transaction_type_analysis.amounts.In.Main;

const IncomeType = () => {
  return (
    <div>
        <Doughnut data={t_type_amounts_in}/>
    </div>
  )
}

export default IncomeType