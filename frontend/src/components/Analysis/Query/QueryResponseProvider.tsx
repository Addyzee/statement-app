import { AccountsQuery, TransactionTypeQuery } from '@/components/context/types';
import React, { useState } from 'react'
import { QueryResponseContext } from './QueryResponse';


type QueryResponseProviderProps = {
  children: React.ReactNode;
};

const QueryResponseProvider = ({children}: QueryResponseProviderProps) => {
    const [accountsQueryData, setAccountsQueryData] = useState<AccountsQuery | null>(null)
    const [transactionTypeQuery, setTransactionTypeQuery] = useState<TransactionTypeQuery | null>(null)

    const values = {accountsQueryData, setAccountsQueryData, transactionTypeQuery, setTransactionTypeQuery}

    

  return (
    <QueryResponseContext.Provider value={values}>{children}</QueryResponseContext.Provider>
  )
}

export default QueryResponseProvider