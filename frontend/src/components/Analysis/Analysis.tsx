import IncomeType from "./IncomeType";
import IncomevExpenses from "./IncomevExpenses";
import ExpenditureType from "./ExpenditureType";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Analysis = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("DataContext must be used within a DataContextProvider");

  const { userName } = context.userContext;

  return (
    <div className="h-full lg:w-2/3 overflow-y-scroll">
      <div className="mb-5">
        <h3 className="font-semibold text-lg">Hey, {userName}! 👋</h3>
        <br />
        <p>
          Over &lt;period&gt;, you’ve spent KES &lt;amount out&gt; and received
          KES &lt;amount in&gt; via M-Pesa.
          <br />
          💰 Most of your money went to &lt;top account name + corresponding
          type&gt;, totaling KES &lt;amount&gt;.
          <br />
          📤 You got the most money from &lt;name&gt;, receiving KES
          &lt;amount&gt;. <br />
          💸 MPESA transaction charges added up to KES &lt;fees&gt;. <br />
          Your average spending and income is &lt;X&gt;% &lt;X&gt;% per month,
          respectively.
          <br />
          📊 You spent the most amount of money on &lt;X&gt; month, which is
          &lt;X&gt;% more than the average spent per month.
          <br />
        </p>
      </div>
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
