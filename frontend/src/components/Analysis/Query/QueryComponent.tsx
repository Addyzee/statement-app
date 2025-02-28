import {
  useAccountsAnalysis,
  useResponse,
  useTransactionAnalysis,
} from "../../context/ResponseContext";
import { DropdownMenuCheckbox } from "./DropDownCheckBox";
import { QueryTable } from "./QueryTable";
import { useMemo, useState } from "react";
import { Button } from "../../ui/button";
import { QueryContext } from "./QueryContext";
import axios from "axios";
import { useQueryResponseContext } from "./QueryResponse";

const QueryComponent = () => {
  const {
    accountsQueryData,
    setAccountsQueryData,
    transactionTypeQuery,
    setTransactionTypeQuery,
  } = useQueryResponseContext();
  const sessionID = useResponse().data?.session_id;

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
    const accountsSet = new Set(accounts);
    accounts = Array.from(accountsSet);

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
        "http://127.0.0.1:8000/query/",
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
    <div className="h-96">
      <QueryContext.Provider value={values}>
        <div className="">
          <ul className="flex items-center space-x-4">
            <h3 className="font-semibold">Query transactions by:</h3>
            <li>
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
          <div className="flex-1 mt-7">
            {accountsQueryData ? (
              <div>
                {selectedAccounts && (
                  <p>
                    Accounts selected:{" "}
                    {`${selectedAccounts.slice(0, 5)} ${
                      selectedAccounts.length > 5 ? "..." : ""
                    }`}
                  </p>
                )}
                {selectedTransactionTypes && (
                  <p>
                    {`${selectedTransactionTypes.slice(0, 5)}
                    ${selectedTransactionTypes.length > 5 ? "..." : ""}`}
                  </p>
                )}
                {accountsQueryData.In?.Transactions && (
                  <div>
                    <h3 className="font-semibold text-base">Income</h3>
                    <QueryTable
                      tableData={accountsQueryData?.In?.Transactions}
                      tableHeaders={Object.keys(
                        accountsQueryData?.In?.Transactions[0]
                      )}
                      totalAmount={accountsQueryData.In.Amounts.Total}
                    />
                  </div>
                )}
                {accountsQueryData.Out?.Transactions && (
                  <div>
                  <h3 className="font-semibold text-base">Expenditure</h3>
                  <QueryTable
                    tableData={accountsQueryData?.Out.Transactions}
                    tableHeaders={Object.keys(
                      accountsQueryData?.Out.Transactions[0]
                    )}
                    totalAmount={accountsQueryData.Out.Amounts.Total}
                  />
                  </div>
                )}
              </div>
            ) : transactionTypeQuery ? (
              <div>
                <div>
                  {selectedTransactionTypes ? (
                    <p className="font-bold">
                      {`${selectedTransactionTypes.slice(0, 5)} ${
                        selectedTransactionTypes.length > 5 ? "..." : ""
                      }`}
                    </p>
                  ) : (
                    <h3 className="font-bold text-lg">
                      Top Accounts Transacted With
                    </h3>
                  )}
                </div>

                {transactionTypeQuery.In?.Accounts && (
                  <div>
                    <h3 className="font-semibold text-base">Income</h3>
                    <QueryTable
                      tableData={transactionTypeQuery.In.Accounts}
                      tableHeaders={Object.keys(
                        transactionTypeQuery.In.Accounts[0]
                      )}
                      totalAmount={transactionTypeQuery.In.Amounts["Total"]}
                    />
                  </div>
                )}
                {transactionTypeQuery.Out?.Accounts && (
                  <div>
                    <h3 className="font-semibold text-base">Expenditure</h3>

                    <QueryTable
                      tableData={transactionTypeQuery.Out.Accounts}
                      tableHeaders={Object.keys(
                        transactionTypeQuery.Out.Accounts[0]
                      )}
                      totalAmount={transactionTypeQuery.Out.Amounts["Total"]}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-10">Request query to see some data</p>
            )}
          </div>
        </div>
      </QueryContext.Provider>
    </div>
  );
};

export default QueryComponent;
