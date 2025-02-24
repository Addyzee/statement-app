import { useState } from "react";
import { ReactNode } from "react";
import { DataContext } from "./DataContext";
export const DataContextProvider = ({ children }: { children: ReactNode }) => {
    const [userName, setUserName] = useState<string | null>(null);
    const [monthlyAnalysisData, setMonthlyAnalysisData] = useState<
      { Month: string | null; In: number | null; Out: number | null }[]
    >([{ Month: null, In: null, Out: null }]);
  
    return (
      <DataContext.Provider
        value={{
          userContext: { userName, setUserName },
          monthlyAnalysisContext: { monthlyAnalysisData, setMonthlyAnalysisData },
        }}
      >
        {children}
      </DataContext.Provider>
    );
  };
  