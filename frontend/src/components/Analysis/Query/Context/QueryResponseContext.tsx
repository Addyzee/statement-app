import { AccountsQuery, TransactionTypeQuery } from "@/components/context/types"
import React, { createContext, useContext } from "react";
type QueryResponseType = {
    accountsQueryData : AccountsQuery | null;
    setAccountsQueryData: React.Dispatch<React.SetStateAction<AccountsQuery | null>>
    transactionTypeQuery : TransactionTypeQuery | null;
    setTransactionTypeQuery: React.Dispatch<React.SetStateAction<TransactionTypeQuery | null>>   
}

export const QueryResponseContext = createContext<QueryResponseType | undefined>(undefined)

export function useQueryResponseContext (){
    const context = useContext(QueryResponseContext)
    if (!context) throw new Error('useQueryResponse must be used within QueryResponseProvider')
    return context
}