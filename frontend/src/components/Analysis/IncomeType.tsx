import { Doughnut } from "./Doughnut";
import {
  useAccountsAnalysis,
  useTransactionAnalysis,
} from "../context/ResponseContext";

const IncomeType = () => {
  const t_type_amounts_in = useTransactionAnalysis().amounts.In.Main;
  const t_type_others =
    useTransactionAnalysis().amounts.In.Others[0].Others.slice(0, 5);
  const top_accounts_in = useAccountsAnalysis().amounts.In.slice(0, 5);

  return (
    <div className="lg:flex">
      <div className="flex-1">
        <Doughnut data={t_type_amounts_in} />
      </div>
      <div className="flex-1">
        {top_accounts_in ? (
          <div className="my-4">
            <p className="font-medium mb-2">
              You received the highest amounts from these accounts:
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="">
                  <th className="p-2 border text-left">Account Name</th>
                  <th className="p-2 border text-left">Type</th>
                  <th className="p-2 border text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {top_accounts_in.map((account) => (
                  <tr key={account.Account_name}>
                    <td className="p-2 border">{account.Account_name}</td>
                    <td className="p-2 border">{account.Type}</td>
                    <td className="p-2 border text-right">
                      KES {account.Amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}

        {t_type_others ? (
          <div>
            Other sources of income include{" "}
            {t_type_others.map((t_type, idx) => (
              <span key={idx} className="font-bold">
                {idx == t_type_others.length - 1
                  ? `and ${t_type.Type}.`
                  : `${t_type.Type}, `}
              </span>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default IncomeType;
