import IncomeType from "./IncomeType";
import IncomevExpenses from "./IncomevExpenses";
import ExpenditureType from "./ExpenditureType";
import { SummarySection } from "./SummarySection";
import QueryComponent from "./QueryComponent";

const Analysis = () => {
  return (
    <div className="h-full lg:w-2/3 overflow-y-scroll pr-2">
      <SummarySection />
      <ol className="flex flex-col gap-10">
        <li className="border rounded-xl p-3">
          <h2 className="font-semibold text-lg">1. Income Type Breakdown</h2>
          <IncomeType />
        </li>
        <li className="border rounded-xl p-3">
          <h2 className="font-semibold text-lg">2. Spending Breakdown</h2>
          <ExpenditureType />
        </li>
        <li className="border rounded-xl p-3">
          <h2 className="font-semibold text-lg">
            3. Expenses vs Income per Month
          </h2>
          <IncomevExpenses />
        </li>
        <li>
          <h2 className="font-semibold text-lg">4. Query data</h2>
          <QueryComponent />
        </li>
      </ol>
    </div>
  );
};

export default Analysis;
