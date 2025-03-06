import { Text, View, Image } from "@react-pdf/renderer";

import { useChartImages } from "../context/ChartImagesContext";
import { Response } from "../context/types";

interface IncomeTypeProps {
  pdfResponse : Response 
}

export const IncomeTypePDF = ({pdfResponse}: IncomeTypeProps) => {
  const { chartImage } = useChartImages();
  console.log(chartImage)
  const t_type_others = pdfResponse.analysis.transaction_type_analysis.amounts.In.Others?.[0]?.Others?.slice(0, 5) || [];
  const top_accounts_in = pdfResponse.analysis.accounts_analysis.amounts.In.slice(0,5)
  return (
    <View style={{ width: "100%" }}>
      <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        {/* Left column with chart */}
        <View style={{ flex: 1, width: "50%", padding: 10 }}>
          {chartImage ? (
            <Image src={chartImage} style={{ width: "100%" }} />
          ) : (
            <View
              style={{
                width: "100%",
                height: 150,
                backgroundColor: "#E5E7EB",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#4B5563" }}>Chart not available</Text>
            </View>
          )}
        </View>

        {/* Right column with table */}
        <View style={{ flex: 1, width: "50%" }}>
          {top_accounts_in && top_accounts_in.length > 0 ? (
            <View style={{ marginVertical: 15, width: "100%" }}>
              <Text
                style={{ fontWeight: 500, marginBottom: 8, color: "#FFFFFF" }}
              >
                You received the highest amounts from these accounts:
              </Text>

              {/* Table header */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: "#6B7280",
                  display: "flex",
                }}
              >
                <View
                  style={{
                    flex: 2,
                    padding: 8,
                    borderRightWidth: 1,
                    borderColor: "#6B7280",
                  }}
                >
                  <Text style={{ fontWeight: 500, color: "#FFFFFF" }}>
                    Account Name
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 8,
                    borderRightWidth: 1,
                    borderColor: "#6B7280",
                  }}
                >
                  <Text style={{ fontWeight: 500, color: "#FFFFFF" }}>
                    Type
                  </Text>
                </View>
                <View style={{ flex: 1, padding: 8 }}>
                  <Text
                    style={{
                      fontWeight: 500,
                      textAlign: "right",
                      color: "#FFFFFF",
                    }}
                  >
                    Amount
                  </Text>
                </View>
              </View>

              {/* Table rows */}
              {top_accounts_in.map((account, index) => (
                <View
                  key={`${account.Account_name}-${index}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: "#6B7280",
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      padding: 8,
                      borderRightWidth: 1,
                      borderColor: "#6B7280",
                    }}
                  >
                    <Text style={{ color: "#D1D5DB" }}>
                      {account.Account_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      padding: 8,
                      borderRightWidth: 1,
                      borderColor: "#6B7280",
                    }}
                  >
                    <Text style={{ color: "#D1D5DB" }}>{account.Type}</Text>
                  </View>
                  <View style={{ flex: 1, padding: 8 }}>
                    <Text style={{ textAlign: "right", color: "#D1D5DB" }}>
                      KES {account.Amount.toLocaleString()}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {/* Other sources text */}
          {t_type_others && t_type_others.length > 0 ? (
            <View style={{ width: "100%", marginTop: 10 }}>
              <Text style={{ color: "#D1D5DB" }}>
                Other sources of income include{" "}
                {t_type_others.map((t_type, idx) => (
                  <Text key={idx} style={{ fontWeight: 700, color: "#FFFFFF" }}>
                    {idx === t_type_others.length - 1
                      ? `and ${t_type.Type}.`
                      : `${t_type.Type}, `}
                  </Text>
                ))}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default IncomeTypePDF;
