import { MultipleBarChart } from "./MultipleBarChart";
import data from "./Data.json";


const IncomevExpenses = () => {
  const month_analysis = data.analysis.months_analysis;

  return (
    <div className="flex justify-center">
      <MultipleBarChart chartData={month_analysis}/>
    </div>
  );
};

export default IncomevExpenses;
