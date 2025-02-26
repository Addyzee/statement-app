import {
  useAccountsAnalysis,
  useTransactionAnalysis,
} from "../context/ResponseContext";
import { DropdownMenuRadio } from "./DropDownRadio";
import { DropdownMenuCheckbox } from "./DropDownCheckBox";
import { QueryTable } from "./QueryTable";
import { useMemo } from "react";

const QueryComponent = () => {
  const transactionTypes = useTransactionAnalysis().types;
//   const accountNames = useAccountsAnalysis().accounts;
  const accountsAnalysis = useAccountsAnalysis()
const accountNames = useMemo(() => accountsAnalysis.accounts, [accountsAnalysis]);

  return (
    <div className="h-96">
      <ul className="flex gap-4">
        <li>
          <DropdownMenuRadio values={transactionTypes} />
        </li>
        <li>
          <DropdownMenuCheckbox values={accountNames}/>
        </li>
      </ul>
      <QueryTable />
    </div>
  );
};

export default QueryComponent;
