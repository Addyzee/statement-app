import { useMemo } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useQueryContext } from "./Context/QueryContext";
import { useTransactionAnalysis, useAccountsAnalysis, useResponse } from "@/components/context/ResponseContext";
import { DropdownMenuCheckbox } from "./Utils/DropDownCheckBox";
import { useQueryResponseContext } from "./Context/QueryResponseContext";
const baseURL = import.meta.env.VITE_BACKEND_URL

const FilterComponents = () => {
  const { accountsContext, transactionTypesContext } = useQueryContext();
  const { selectedAccounts, setSelectedAccounts } = accountsContext;
  const { selectedTransactionTypes, setSelectedTransactionTypes } =
    transactionTypesContext;
  const transactionTypes = useTransactionAnalysis().types;
  const accountsAnalysis = useAccountsAnalysis();
  const { setAccountsQueryData, setTransactionTypeQuery} =useQueryResponseContext()
  const sessionID=useResponse().data?.session_id

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
    const accountsSet = new Set(accounts);
    accounts = Array.from(accountsSet);

    return accounts;
  }, [accountNamesWithTransactionType]);

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
            if (val && Array.isArray(val)) {
              accountsToDisplay = [...accountsToDisplay, ...val];
            }
          }
        })
      );
      const accountsToDisplaySet = new Set(accountsToDisplay);
      accountsToDisplay = Array.from(accountsToDisplaySet);

      return accountsToDisplay.length === 0 ? ["None"] : accountsToDisplay;
    }
    return ["None"];
  }, [
    accountNamesWithTransactionType,
    allAccountNames,
    selectedTransactionTypes,
  ]);

  const sendQuery = async () => {
    try {
      setAccountsQueryData(null);
      setTransactionTypeQuery(null);
      const response = await axios.post(
        `${baseURL}query/`,
        {
          SessionId: sessionID,
          TTypes: !selectedTransactionTypes ? [] : selectedTransactionTypes,
          AccountNames: !selectedAccounts ? [] : selectedAccounts,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (selectedAccounts) {
        setAccountsQueryData(response.data);
      } else {
        setTransactionTypeQuery(response.data);
      }
    } catch (err) {
      console.error("Error Response:", err);
    }
  };


  return (
    <div>
      <ul className="lg:flex space-y-4 lg:space-y-0 lg:items-center lg:space-x-4 relative">
        <h3 className="font-semibold">Query transactions by:</h3>
        <li className="">
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
        <li className="lg:absolute right-5">
          <Button variant={"outline"} onClick={sendQuery}>
            Request Query
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default FilterComponents;
