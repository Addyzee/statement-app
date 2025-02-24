import IncomeType from "./IncomeType";
import IncomevExpenses from "./IncomevExpenses";
import ExpenditureType from "./ExpenditureType";
import { SummarySection } from "./SummarySection";

const Analysis = () => {
  return (
    <div className="h-full lg:w-2/3 overflow-y-scroll pr-2">
      <SummarySection/>
      <ol className="flex flex-col gap-3">
        <li>
          <h2 className="font-semibold text-lg">
            1. Expenses vs Income as Measured by Period
          </h2>
          <IncomevExpenses />
        </li>
        <li>
          <h2 className="font-semibold text-lg">2. Income Type Breakdown</h2>
          <IncomeType />
        </li>
        <li>
          <h2 className="font-semibold text-lg">3. Spending Breakdown</h2>
          <ExpenditureType />
        </li>
      </ol>
    </div>
  );
};

export default Analysis;
