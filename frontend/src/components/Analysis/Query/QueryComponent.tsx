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
  const accountNamesWithTransactionType = useMemo(
    () => accountsAnalysis.accounts,
    [accountsAnalysis]
  );
  const allAccountNames = useMemo(() => {
    let accounts: string[] = [];
    accountNamesWithTransactionType.forEach((val) => {
      const transactionType: string = Object.keys(val)[0];
      const accountsForType = Object(val)[transactionType];
      if (Array.isArray(accountsForType)) {
        accounts = [...accounts, ...accountsForType];
      }
    });
    accounts.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    const accountsSet = new Set(accounts)
    accounts = Array.from(accountsSet)

    return accounts;
  }, [accountNamesWithTransactionType]);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
    string[] | null
  >(null);
  const [selectedAccounts, setSelectedAccounts] = useState<string[] | null>(
    null
  );
  const transactionTypesContext = {
    selectedTransactionTypes,
    setSelectedTransactionTypes,
  };
  const accountsContext = { selectedAccounts, setSelectedAccounts };
  const values = { transactionTypesContext, accountsContext };

  const accountNamesByTrasactionType = useMemo(() => {
    if (!selectedTransactionTypes) {
      return allAccountNames;
    } else if (selectedTransactionTypes) {
      let accountsToDisplay: string[] = [];
      selectedTransactionTypes.forEach((tType) =>
        accountNamesWithTransactionType.forEach((accWType) => {
          const key = Object.keys(accWType)[0];
          if (key === tType) {
            const val: string[] = Object(accWType)[key];
            console.log(tType, val, val.length)
            if (val && Array.isArray(val)) {
              accountsToDisplay = [...accountsToDisplay, ...val];
            }
          }
        })
      );
      const accountsToDisplaySet = new Set(accountsToDisplay)
      accountsToDisplay = Array.from(accountsToDisplaySet)


      return accountsToDisplay.length===0 ? ["None"] : accountsToDisplay;
    }
    return ["None"];
  }, [
    accountNamesWithTransactionType,
    allAccountNames,
    selectedTransactionTypes,
  ]);

  const sendQuery = () => {
    console.log(selectedTransactionTypes, selectedAccounts);
  };

  return (
    <div className="h-96">
      <QueryContext.Provider value={values}>
        <div className="flex gap-4">
          <ul className="space-y-4">
            <h3 className="font-semibold">Query transactions by:</h3>
            <li>
              {/* <DropdownMenuRadio title="Transaction types" values={transactionTypes} /> */}
              <DropdownMenuCheckbox
                title="Transaction types"
                setter={setSelectedTransactionTypes}
                values={transactionTypes}
              />
            </li>
            <li>
              <DropdownMenuCheckbox
                title="Accounts"
                setter={setSelectedAccounts}
                values={accountNamesByTrasactionType}
              />
            </li>
            <li>
              <Button variant={"outline"} onClick={sendQuery}>
                Request Query
              </Button>
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
