import { useQueryResponseContext } from "./Context/QueryResponseContext";
import { DataTable } from "./Utils/DataTable";
import { useQueryContext } from "./Context/QueryContext";
import TotalsTable from "./TotalsTable";

const QueryTables = () => {
  const { accountsQueryData, transactionTypeQuery } = useQueryResponseContext();
  const { accountsContext, transactionTypesContext } = useQueryContext();
  const { selectedAccounts } = accountsContext;
  const { selectedTransactionTypes } = transactionTypesContext;
  return (
    <div className="flex-1 mt-7 ">
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
            <div className="border p-2 rounded-xl mb-3 border-gray-700 mt-4">
              <h3 className="font-semibold text-base">Income</h3>
              <DataTable
                tableData={accountsQueryData?.In?.Transactions}
                tableHeaders={Object.keys(
                  accountsQueryData?.In?.Transactions[0]
                )}
                totalAmount={accountsQueryData.In.Amounts.Total}
                tableCaption="Top Transactions In"
              />
            </div>
          )}
          {accountsQueryData.Out?.Transactions && (
            <div className="border p-2 rounded-xl mb-3 border-gray-700">
              <h3 className="font-semibold text-base">Expenditure</h3>
              <DataTable
                tableData={accountsQueryData?.Out.Transactions}
                tableHeaders={Object.keys(
                  accountsQueryData?.Out.Transactions[0]
                )}
                totalAmount={accountsQueryData.Out.Amounts.Total}
                tableCaption="Top Transactions Out"
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
          <div className="flex justify-center p-3 border border-gray-700 rounded-xl mb-5 mt-3">
            <div className="lg:flex mt-3 rounded-xl lg:p-3 lg:w-4/5 justify-around">
              {transactionTypeQuery.In?.Accounts && (
                <div className="lg:border-r lg:pr-3">
                  <h3 className="font-bold lg:text-right">Income</h3>
                  <TotalsTable Amounts={transactionTypeQuery.In.Amounts} />
                </div>
              )}
              {transactionTypeQuery.Out?.Accounts && (
                <div className="lg:border-l max-lg:pt-3 max-lg:pb-3 lg:pl-3">
                  <h3 className="font-bold">Expenditure</h3>
                  <TotalsTable Amounts={transactionTypeQuery.Out.Amounts} />
                </div>
              )}
            </div>
          </div>

          {transactionTypeQuery.In?.Accounts && (
            <div className=" p-2 rounded-xl mb-4 border border-gray-700">
              <h3 className="font-semibold text-base">Income</h3>
              <DataTable
                tableData={transactionTypeQuery.In.Accounts}
                tableHeaders={Object.keys(transactionTypeQuery.In.Accounts[0])}
                totalAmount={transactionTypeQuery.In.Amounts["Total"]}
                tableCaption="Top Transactions In"

              />
            </div>
          )}
          {transactionTypeQuery.Out?.Accounts && (
            <div className="p-2 rounded-xl mb-4 border border-gray-700">
              <h3 className="font-semibold text-base">Expenditure</h3>
              <DataTable
                tableData={transactionTypeQuery.Out.Accounts}
                tableHeaders={Object.keys(transactionTypeQuery.Out.Accounts[0])}
                totalAmount={transactionTypeQuery.Out.Amounts["Total"]}
                tableCaption="Top Transactions Out"

              />
            </div>
          )}
        </div>
      ) : (
        <p className="mt-10">Request query to see some data</p>
      )}
    </div>
  );
};

export default QueryTables;
