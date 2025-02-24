import { createContext } from "react";

export type UserContextType = {
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
};

export type MonthlyAnalysisContextType = {
  monthlyAnalysisData: { Month: string | null; In: number | null; Out: number | null }[];
  setMonthlyAnalysisData: React.Dispatch<
    React.SetStateAction<
      { Month: string | null; In: number | null; Out: number | null }[]
    >
  >;
};

export type DataContextType = {
  userContext: UserContextType;
  monthlyAnalysisContext: MonthlyAnalysisContextType;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);
