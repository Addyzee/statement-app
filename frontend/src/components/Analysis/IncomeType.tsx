import { Doughnut } from "./Doughnut";
import { useTransactionAnalysis } from "../context/ResponseContext";

const IncomeType = () => {
  const t_type_amounts_in = useTransactionAnalysis().amounts.In.Main;
  const t_type_others = useTransactionAnalysis().amounts.In.Others[0].Others;

  return (
    <div className="lg:flex">
      <div className="flex-1">
        <Doughnut data={t_type_amounts_in} />
      </div>
      <div className="flex-1">
        Other sources of income include{" "}
        {t_type_others.map((t_type, idx) => (
          <span>
            {idx == t_type_others.length - 1
              ? `and ${t_type.Type}.`
              : `${t_type.Type}, `}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IncomeType;
