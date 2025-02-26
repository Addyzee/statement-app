import { useResponse, useSummary } from "../context/ResponseContext";
import { formatDate } from "./Utils";
export function SummarySection() {
  const userName = useResponse().data?.the_name;
  const summary = useSummary();

  return (
    <div className="mb-5 space-y-6">
      <h3 className="font-semibold text-lg text-white">Hey, {userName}! 👋</h3>

      <div className="space-y-4 text-gray-300">
        {/* Overview */}
        <p>
          From{" "}
          <span className="font-medium text-white">
            {formatDate(summary.period.from)}
          </span>{" "}
          to{" "}
          <span className="font-medium text-white">
            {formatDate(summary.period.to)}
          </span>
          , you've:
        </p>
        <ul className="ml-4 space-y-1">
          <li>
            💰 Received{" "}
            <span className="font-semibold text-green-400">
              KES {summary.total_cashflow.In.toLocaleString()}
            </span>
          </li>
          <li>
            💸 Spent{" "}
            <span className="font-semibold text-red-400">
              KES {summary.total_cashflow.Out.toLocaleString()}
            </span>
          </li>
        </ul>

        {/* Monthly Averages */}
        <div className="lg:flex gap-3 ">
          <div className="p-4 rounded-lg border border-gray-700  shadow-md flex-1 mb-3">
            <p className="font-medium text-white">Monthly Averages:</p>
            <div className="ml-4 space-y-1 mt-2">
              <p>
                💵 Income:{" "}
                <span className="font-medium text-white">
                  KES {summary.average_monthly.average_in.toLocaleString()}
                </span>
              </p>
              <p>
                💳 Spending:{" "}
                <span className="font-medium text-white">
                  KES {summary.average_monthly.average_out.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
          {/* Peak earning month */}
          <div className="p-4 rounded-lg border border-gray-700 shadow-md flex-1 mb-3">
            <p className="font-medium text-white">
              Peak Earning Month: {summary.highest_months.highest_in.Month}
            </p>
            <div className="ml-4 mt-2 space-y-2 text-sm">
              <p>
                Amount:{" "}
                <span className="font-semibold text-green-400">
                  KES{" "}
                  {summary.highest_months.highest_in.Amount.toLocaleString()}
                </span>
              </p>
              <p className="font-bold text-purple-400">
                {summary.highest_months.highest_in.percent_average_difference}%
                above monthly average
              </p>
            </div>
          </div>
          {/* Peak Month Spending */}
          <div className="p-4 rounded-lg border border-gray-700 shadow-md flex-1 mb-3">
            <p className="font-medium text-white">
              Peak Spending Month: {summary.highest_months.highest_out.Month}
            </p>
            <div className="ml-4 mt-2 space-y-3 text-sm">
              <p>
                Amount:{" "}
                <span className="font-semibold text-red-400">
                  KES{" "}
                  {summary.highest_months.highest_out.Amount.toLocaleString()}
                </span>
              </p>
              <p className="text-purple-400 font-bold">
                {summary.highest_months.highest_out.percent_average_difference}%
                above monthly average
              </p>
            </div>
          </div>
        </div>

        {/* Highest spending and income sources */}
        <div className="p-4 rounded-lg border border-gray-700 shadow-md">
          <p className="font-medium text-white">
            Highest cumulative spending and income
          </p>
          <ul className="space-y-2">
          <li>
              📥 Highest amount from:{" "}
              <span className="font-medium text-white">
                {summary.top_accounts.In.Account_name} 
                <span className="font-light">{" "} type </span>
                {summary.top_accounts.In.Type}
              </span>
              <div className="ml-4 text-sm">
                Total:{" "}
                <span className="font-semibold text-green-400">
                  KES {summary.top_accounts.In.Amount.toLocaleString()}
                </span>
              </div>
            </li>
            <li>
              📤 Highest amount sent to:{" "}
              <span className="font-medium text-white">
                {summary.top_accounts.Out.Account_name} via{" "}
                {summary.top_accounts.Out.Type}
              </span>
              <div className="ml-4 text-sm">
                Total:{" "}
                <span className="font-semibold text-red-400">
                  KES {summary.top_accounts.Out.Amount.toLocaleString()}
                </span>
              </div>
            </li>
           
          </ul>
        </div>

        {/* Charges */}
        <div className="p-4 rounded-lg border border-gray-700 shadow-md">
          <p>
            Total M-PESA Charges:{" "}
            <span className="font-semibold text-orange-400">
              KES {summary.safaricom_charges.Out[0].Amount.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
