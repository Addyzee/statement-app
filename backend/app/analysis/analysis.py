import pandas as pd
import numpy as np
from typing import Dict, List
from collections.abc import Callable
from app.data.clean import clean_data2, clean_data
from .t_type_analysis import (
    get_transaction_types,
    get_transaction_types_frequencies,
    amount_outin_per_transaction_type,
)
from .account_analysis import (
    get_account_names_frequencies,
    get_account_names_per_type,
    amount_outin_per_account_name,
    amount_per_account_name_per_type,
    get_account_names_sum,
    get_top_account_names_outin,
)

data = clean_data()
# data = clean_data2()


def querying(column: str, condition: str | float, data: pd.DataFrame = data):
    return data[data[column] == condition]


def create_df_by_dates(
    start_date: str, end_date: str | None = None, data: pd.DataFrame = data
):
    if end_date:
        return data[data["Date"] > start_date & data["Date"] <= end_date]
    else:
        return data[data["Date"] > start_date]


def total_cashflow(
    direction: List[str] | str = ["In", "Out"], data: pd.DataFrame = data
) -> Dict[str, float] | float:
    try:
        if type(direction) == str:
            amount = float(
                np.round(data[data.Direction == direction]["Amount"].sum(), 3)
            )
            return amount
        money_received = float(
            np.round(data[data.Direction == "In"]["Amount"].sum(), 3)
        )
        money_sent = float(np.round(data[data.Direction == "Out"]["Amount"].sum(), 3))
        return {"In": money_received, "Out": money_sent}
    except Exception as e:
        raise e


def transaction_type_analysis(data: pd.DataFrame):
    try:
        transaction_types = get_transaction_types(data)
        frequencies = get_transaction_types_frequencies(data)
        amounts = amount_outin_per_transaction_type(data)
        return {
            "types": transaction_types,
            "frequencies": frequencies,
            "amounts": amounts,
        }
    except Exception as e:
        raise e


def transaction_accounts_analysis(data: pd.DataFrame):
    top_account_names = get_top_account_names_outin(data)
    amounts = amount_outin_per_account_name(data)
    frequencies = get_account_names_frequencies(data)
    return {"types": top_account_names, "frequencies": frequencies, "amounts": amounts}
