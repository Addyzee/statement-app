import pandas as pd
import numpy as np
from typing import List, Dict
from .totals import total_cashflow


def total_outin_by_month(data: pd.DataFrame):
    grouped_data = data.groupby(pd.Grouper(key="Date", axis=0, freq="ME"))
    mapped_amounts = []

    for date, data in grouped_data:
        month_year = date.strftime("%b-%Y")
        amounts_in = data.loc[data["Direction"] == "In", "Amount"].sum()
        amounts_out = data.loc[data["Direction"] == "Out", "Amount"].sum()
        mapped_amounts.append(
            {"Month": month_year, "In": amounts_in, "Out": amounts_out}
        )
    return mapped_amounts


def highest_outin_months(mapped_amounts: List[Dict]):
    sorted_by_income = sorted(mapped_amounts, key=lambda d: d["In"])
    sorted_by_spending = sorted(mapped_amounts, key=lambda d: d["Out"])
    return {
        "highest_in": {
            "Month": sorted_by_income[-1]["Month"],
            "Amount": sorted_by_income[-1]["In"],
        },
        "highest_out": {
            "Month": sorted_by_spending[-1]["Month"],
            "Amount": sorted_by_spending[-1]["Out"],
        },
    }


def get_period(data: pd.DataFrame):
    last_date = data.iloc[0]["Date"].date()
    first_date = data.iloc[-1]["Date"].date()
    return {"from": first_date, "to": last_date}


def average_outin_per_month(data: pd.DataFrame):
    last_date = data.iloc[0]["Date"]
    first_date = data.iloc[-1]["Date"]
    months_num = (last_date - first_date).days / 30.436875
    total_amounts = total_cashflow(data=data)
    amounts_in = round(total_amounts["In"] / months_num, 2)
    amounts_out = round(total_amounts["Out"] / months_num, 2)
    return {"average_in": amounts_in, "average_out": amounts_out}

def calculate_percentage_differences(amount: float, average: float) -> float:
    return round((amount/average * 100) - 100,2)


    

    