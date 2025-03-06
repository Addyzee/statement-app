import { Text, View } from "@react-pdf/renderer";

import { useResponse, useSummary } from "../context/ResponseContext";
import { formatDate } from "../Analysis/Utils";

export function SummarySectionPDF() {
  const userName = useResponse().data?.the_name;
  const summary = useSummary();

  return (
    <View
      style={{
        marginBottom: 20,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with user name */}
      <View style={{ marginBottom: 15, width: "100%" }}>
        <Text style={{ fontWeight: 600, color: "#FFFFFF" }}>
          Hey, {userName}! 👋{"\n"}
        </Text>
      </View>

      {/* Summary content */}
      <View style={{ marginBottom: 10, width: "100%" }}>
        <Text style={{ color: "#D1D5DB" }}>
          From {"\n"}
          <Text style={{ fontWeight: 500, color: "#FFFFFF" }}>
            {formatDate(summary.period.from)}
          </Text>{" "}
          to{" "}
          <Text style={{ fontWeight: 500, color: "#FFFFFF" }}>
            {formatDate(summary.period.to)}
          </Text>
          , you've:
        </Text>
      </View>

      {/* List items */}
      <View
        style={{
          marginLeft: 15,
          marginTop: 8,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Income item */}
        <View style={{ marginBottom: 4, width: "100%" }}>
          <Text style={{ color: "#D1D5DB" }}>
            💰 Received{" "}
            <Text style={{ fontWeight: 600, color: "#4ADE80" }}>
              KES {summary.total_cashflow.In.toLocaleString()}
            </Text>
          </Text>
        </View>

        {/* Expense item */}
        <View style={{ width: "100%" }}>
          <Text style={{ color: "#D1D5DB" }}>
            💸 Spent{" "}
            <Text style={{ fontWeight: 600, color: "#F87171" }}>
              KES {summary.total_cashflow.Out.toLocaleString()}
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 15,
          marginBottom: 15,
          display: "flex",
          gap: "10px",
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 15,
            borderWidth: 1,
            borderColor: "#374151",
            borderRadius: 8,
            marginBottom: 12,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text style={{ fontWeight: 500, color: "#FFFFFF", marginBottom: 8 }}>
            Monthly Averages:
          </Text>
          <View
            style={{
              marginLeft: 15,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text style={{ color: "#D1D5DB", marginBottom: 4 }}>
              💵 Income:{" "}
              <Text style={{ fontWeight: 500, color: "#FFFFFF" }}>
                KES {summary.average_monthly.average_in.toLocaleString()}
              </Text>
            </Text>
            <Text style={{ color: "#D1D5DB" }}>
              💳 Spending:{" "}
              <Text style={{ fontWeight: 500, color: "#FFFFFF" }}>
                KES {summary.average_monthly.average_out.toLocaleString()}
              </Text>
            </Text>
          </View>
        </View>

        {/* Peak Earning Month */}
        <View
          style={{
            width: "100%",
            padding: 15,
            borderWidth: 1,
            borderColor: "#374151",
            borderRadius: 8,
            marginBottom: 12,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text style={{ fontWeight: 500, color: "#FFFFFF", marginBottom: 8 }}>
            Peak Earning Month: {summary.highest_months.highest_in.Month}
          </Text>
          <View
            style={{
              marginLeft: 15,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text style={{ color: "#D1D5DB", marginBottom: 4 }}>
              Amount:{" "}
              <Text style={{ fontWeight: 600, color: "#4ADE80" }}>
                KES {summary.highest_months.highest_in.Amount.toLocaleString()}
              </Text>
            </Text>
            <Text style={{ fontWeight: 700, color: "#A78BFA", fontSize: 12 }}>
              {summary.highest_months.highest_in.percent_average_difference}%
              above monthly average
            </Text>
          </View>
        </View>

        {/* Peak Spending Month */}
        <View
          style={{
            width: "100%",
            padding: 15,
            borderWidth: 1,
            borderColor: "#374151",
            borderRadius: 8,
            marginBottom: 12,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text style={{ fontWeight: 500, color: "#FFFFFF", marginBottom: 8 }}>
            Peak Spending Month: {summary.highest_months.highest_out.Month}
          </Text>
          <View
            style={{
              marginLeft: 15,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text style={{ color: "#D1D5DB", marginBottom: 4 }}>
              Amount:{" "}
              <Text style={{ fontWeight: 600, color: "#F87171" }}>
                KES {summary.highest_months.highest_out.Amount.toLocaleString()}
              </Text>
            </Text>
            <Text style={{ fontWeight: 700, color: "#A78BFA", fontSize: 12 }}>
              {summary.highest_months.highest_out.percent_average_difference}%
              above monthly average
            </Text>
          </View>
        </View>
      </View>

      {/* Highest spending and income sources */}
      <View
        style={{
          width: "100%",
          padding: 15,
          borderWidth: 1,
          borderColor: "#374151",
          borderRadius: 8,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontWeight: 500, color: "#FFFFFF", marginBottom: 8 }}>
          Highest cumulative spending and income
        </Text>
        <View
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <View
            style={{
              width: "100%",
              marginBottom: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text style={{ color: "#D1D5DB" }}>
              📥 Highest amount from:{" "}
              <Text style={{ fontWeight: 500, color: "#FFFFFF" }}>
                {summary.top_accounts.In.Account_name}
                <Text style={{ fontWeight: 300 }}> type </Text>
                {summary.top_accounts.In.Type}
              </Text>
            </Text>
            <View style={{ marginLeft: 15, display: "flex", flexDirection: "column" }}>
              <Text style={{ color: "#D1D5DB"}}>
                Total:{" "}
                <Text style={{ fontWeight: 600, color: "#4ADE80" }}>
                  KES {summary.top_accounts.In.Amount.toLocaleString()}
                </Text>
              </Text>
            </View>
          </View>

          <View style={{ width: "100%" }}>
            <Text style={{ color: "#D1D5DB" }}>
              📤 Highest amount sent to:{" "}
              <Text style={{ fontWeight: 500, color: "#FFFFFF" }}>
                {summary.top_accounts.Out.Account_name} via{" "}
                {summary.top_accounts.Out.Type}
              </Text>
            </Text>
            <View style={{ marginLeft: 15, display: "flex", flexDirection: "column" }}>
              <Text style={{ color: "#D1D5DB"}}>
                Total:{" "}
                <Text style={{ fontWeight: 600, color: "#F87171" }}>
                  KES {summary.top_accounts.Out.Amount.toLocaleString()}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Charges */}
      <View
        style={{
          width: "100%",
          padding: 15,
          borderWidth: 1,
          borderColor: "#374151",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#D1D5DB" }}>
          Total M-PESA Charges:{" "}
          <Text style={{ fontWeight: 600, color: "#FB923C" }}>
            KES {summary.safaricom_charges.Out[0].Amount.toLocaleString()}
          </Text>
        </Text>
      </View>
    </View>
  );
}
