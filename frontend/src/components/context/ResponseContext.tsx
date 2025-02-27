import { createContext, useContext } from 'react';
import { Response } from './types';
import Data from "../Analysis/Data.json"
type ResponseContextType = {
  data: Response | null;
  setData: React.Dispatch<React.SetStateAction<Response | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
};

export const ResponseContext = createContext<ResponseContextType | undefined>(undefined);

export function useResponseMain(){
  const context = useContext(ResponseContext);
  if (!context) throw new Error('useResponse must be used within ResponseProvider');
  return context
}

export function useResponse() {
  // created this to test without having to rely on the api
  // const context = useContext(ResponseContext);
  // if (!context) throw new Error('useResponse must be used within ResponseProvider');
  const  data  = Data
  return { data }

  // return context;
}

export function useSummary() {
  const { data } = useResponse();
  if (!data) throw new Error('No Response data available');
  return data.analysis.summary;
}

export function useMonthlyAnalysis() {
  const { data } = useResponse();
  if (!data) throw new Error('No Response data available');
  return data.analysis.months_analysis;
}

export function useTransactionAnalysis() {
  const { data } = useResponse();
  if (!data) throw new Error('No Response data available');
  return data.analysis.transaction_type_analysis;
}

export function useAccountsAnalysis() {
  const { data } = useResponse();
  if (!data) throw new Error('No Response data available');
  return data.analysis.accounts_analysis;
}