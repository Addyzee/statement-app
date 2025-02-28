import React, { useContext } from "react";
import { createContext } from "react";

type transactionTypesContextType = {
  selectedTransactionTypes: string[] | null;
  setSelectedTransactionTypes: React.Dispatch<
    React.SetStateAction<string[] | null>
  >;
};

type accountsContextType = {
    selectedAccounts : string[]| null;
    setSelectedAccounts : React.Dispatch<React.SetStateAction<string[]|null>>;
}

type QueryContextType = {
  transactionTypesContext: transactionTypesContextType;
  accountsContext: accountsContextType;
};

export const QueryContext = createContext<QueryContextType | undefined>(undefined)

export const useQueryContext = () => {
    const query = useContext(QueryContext)
    if(!query){
        throw new Error('query must be used in a Query Context')
    }
    return query
}



