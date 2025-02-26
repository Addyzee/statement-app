import { Doughnut } from "./Doughnut";
import { useTransactionAnalysis } from "../context/ResponseContext";

const ExpenditureType = () => {
  const t_type_amounts_out = useTransactionAnalysis().amounts.Out.Main;
  const t_type_others = useTransactionAnalysis().amounts.Out.Others[0].Others;

  return (
    <div className="lg:flex lg:flex-row-reverse">
      <div className="flex-1">
        <Doughnut data={t_type_amounts_out} />
      </div>
      <div className="flex-1">
        Other ways you spend money include{" "}
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

export default ExpenditureType;
