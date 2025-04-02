import { createContext, useContext } from "react";
import { Response } from "./types";
type ResponseContextType = {
  fileUploaded: boolean;
  setFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  data: Response | null;
  setData: React.Dispatch<React.SetStateAction<Response | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
};

export const ResponseContext = createContext<ResponseContextType | undefined>(
  undefined
);

export function useResponseTest() {
  const context = useContext(ResponseContext);
  if (!context)
    throw new Error("useResponse must be used within ResponseProvider");
  return context;
}

export function useResponse() {
  const context = useContext(ResponseContext);
  if (!context)
    throw new Error("useResponse must be used within ResponseProvider");
  return context;
}

export function useSummary() {
  const { data } = useResponse();
  if (!data) throw new Error("No Response data available");
  return data.analysis.summary;
}

export function useMonthlyAnalysis() {
  const { data } = useResponse();
  if (!data) throw new Error("No Response data available");
  return data.analysis.months_analysis;
}

export function useTransactionAnalysis() {
  const { data } = useResponse();
  if (!data) throw new Error("No Response data available");
  return data.analysis.transaction_type_analysis;
}

export function useAccountsAnalysis() {
  const { data } = useResponse();
  if (!data) throw new Error("No Response data available");
  return data.analysis.accounts_analysis;
}
