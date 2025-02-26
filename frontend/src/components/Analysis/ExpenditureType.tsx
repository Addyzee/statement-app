import { Doughnut } from "./Doughnut";
import {
  useAccountsAnalysis,
  useTransactionAnalysis,
} from "../context/ResponseContext";

const ExpenditureType = () => {
  const t_type_amounts_out = useTransactionAnalysis().amounts.Out.Main;
  const t_type_others =
    useTransactionAnalysis().amounts.Out.Others[0].Others.slice(0, 5);
  const top_accounts_out = useAccountsAnalysis().amounts.Out.slice(0, 5);

  return (
    <div className="lg:flex ">
      <div className="flex-1">
        <Doughnut data={t_type_amounts_out} />
      </div>
      <div className="flex-1">
        {top_accounts_out ? (
          <div className="my-4">
            <p className="font-medium mb-2">You sent the highest amounts to these accounts:</p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="">
                  <th className="p-2 border text-left">Account Name</th>
                  <th className="p-2 border text-left">Type</th>
                  <th className="p-2 border text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {top_accounts_out.map((account) => (
                  <tr key={account.Account_name}>
                    <td className="p-2 border">{account.Account_name}</td>
                    <td className="p-2 border text-left">
                      {account.Type}
                    </td>
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
            Other expenditures include{" "}
            {t_type_others.map((t_type, idx) => (
              <span className="font-bold">
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

export default ExpenditureType;
