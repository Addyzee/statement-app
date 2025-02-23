import IncomeType from "./IncomeType";
import IncomevExpenses from "./IncomevExpenses";
import ExpenditureType from "./ExpenditureType";
// import ResponseData from "./Data.json"

const Analysis = () => {
  // const data = ResponseData
  // const t_type_amounts_in = data.analysis.transaction_type_analysis.amounts.In.slice(0,-1)
  // const t_type_amounts_out = data.analysis.transaction_type_analysis.amounts.Out.slice(0,-1)

  return (
    <div className="h-full w-full overflow-y-scroll">
      <ol>
        <li>
          <h2 className="font-semibold text-lg">
            1. Expenses vs Income as Measured by Period
          </h2>
          <IncomevExpenses />
        </li>
        <li>
          <h2 className="font-semibold text-lg">
            2. Income Type Breakdown
          </h2>
          <IncomeType />
        </li>
        <li>
          <h2 className="font-semibold text-lg">
            3. Spending Breakdown
          </h2>
          <ExpenditureType />
        </li>
      </ol>
    </div>
  );
};

export default Analysis;
