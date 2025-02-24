import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { MultipleBarChart } from "./MultipleBarChart";


const IncomevExpenses = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("DataContext must be used within a DataContextProvider");

  const month_analysis = context.monthlyAnalysisContext.monthlyAnalysisData

  return (
    <div className="flex justify-center">
      <MultipleBarChart chartData={month_analysis}/>
    </div>
  );
};

export default IncomevExpenses;
