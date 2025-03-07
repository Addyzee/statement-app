import IncomeType from "./IncomeType";
import IncomevExpenses from "./IncomevExpenses";
import ExpenditureType from "./ExpenditureType";
import { SummarySection } from "./SummarySection";
import QueryComponent from "./Query/QueryComponent";
import QueryResponseProvider from "./Query/Context/QueryResponseProvider";

const Analysis = () => {
  return (
    <QueryResponseProvider>
      <div
        className="h-full w-full  bg-zinc-950 lg:w-10/12 overflow-y-scroll pr-2"
      >
        <SummarySection />
        <ol className="flex flex-col gap-10">
          <li className="border rounded-xl p-3 border-gray-700">
            <h2 className="font-semibold text-lg">1. Income Breakdown</h2>
            <IncomeType />
          </li>
          <li className="border border-gray-700 rounded-xl p-3">
            <h2 className="font-semibold text-lg">2. Spending Breakdown</h2>
            <ExpenditureType />
          </li>
          <li className="border rounded-xl p-3 border-gray-700">
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
    </QueryResponseProvider>
  );
};

export default Analysis;
