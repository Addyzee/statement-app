import {
  useAccountsAnalysis,
  useTransactionAnalysis,
} from "../../context/ResponseContext";
import { DropdownMenuCheckbox } from "./DropDownCheckBox";
import { QueryTable } from "./QueryTable";
import { useMemo, useState } from "react";
import { Button } from "../../ui/button";
import { QueryContext } from "./QueryContext";

const QueryComponent = () => {
  const transactionTypes = useTransactionAnalysis().types;
  const accountsAnalysis = useAccountsAnalysis();
  const accountNames = useMemo(
    () => accountsAnalysis.accounts,
    [accountsAnalysis]
  );
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
    string[] | null
  >(null);
  const [selectedAccounts, setSelectedAccounts] = useState<string[] | null>(
    null
  );
  const transactionTypesContext = { selectedTransactionTypes, setSelectedTransactionTypes };
  const accountsContext = { selectedAccounts, setSelectedAccounts };
  const values = { transactionTypesContext, accountsContext };
  const sendQuery = () => {
    console.log(selectedTransactionTypes, selectedAccounts)
  }

  return (
    <div className="h-96">
      <QueryContext.Provider value={values}>
        <div className="flex gap-4">
          <ul className="space-y-4">
            <h3 className="font-semibold">Query transactions by:</h3>
            <li>
              {/* <DropdownMenuRadio title="Transaction types" values={transactionTypes} /> */}
              <DropdownMenuCheckbox title="Transaction types" setter={setSelectedTransactionTypes} values={transactionTypes}/>
            </li>
            <li>
              <DropdownMenuCheckbox title="Accounts" setter={setSelectedAccounts} values={accountNames} />
            </li>
            <li>
              <Button variant={"outline"} onClick={sendQuery}>Request Query</Button>
            </li>
          </ul>
          <div className="flex-1">
            <QueryTable />
          </div>
        </div>
      </QueryContext.Provider>
    </div>
  );
};

export default QueryComponent;
