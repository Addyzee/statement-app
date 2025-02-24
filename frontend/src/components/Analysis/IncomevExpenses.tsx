import { useMonthlyAnalysis } from "../context/ResponseContext";
import { MultipleBarChart } from "./MultipleBarChart";

const IncomevExpenses = () => {


  const month_analysis = useMonthlyAnalysis()

  return (
    <div className="flex justify-center">
      <MultipleBarChart chartData={month_analysis} />
    </div>
  );
};

export default IncomevExpenses;
