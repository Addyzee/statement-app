import pandas as pd


def total_outin_by_month(data: pd.DataFrame):
    grouped_data = data.groupby(pd.Grouper(key="Date", axis=0, freq="ME"))
    mapped_amounts = []

    for date, df in grouped_data:
        month_year = date.strftime("%b-%Y")
        amounts_in = df.loc[df["Direction"] == "In", "Amount"].sum()
        amounts_out = df.loc[df["Direction"] == "Out", "Amount"].sum()
        mapped_amounts.append({"Month": month_year,
                               "In": amounts_in,
                               "Out":amounts_out})
    return mapped_amounts
