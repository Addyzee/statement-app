import { useState } from "react";
import { QueryContext } from "./Context/QueryContext";
import FilterComponents from "./FilterComponents";
import QueryTables from "./QueryTables";

const QueryComponent = () => {


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

  return (
    <div className="h-96">
      <QueryContext.Provider value={values}>
        <div className="">
          <FilterComponents />
          <QueryTables/>
        </div>
      </QueryContext.Provider>
    </div>
  );
};

export default QueryComponent;
