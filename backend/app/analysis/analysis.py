import pandas as pd
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
from .time_analysis import total_outin_by_month


def querying(column: str, condition: str | float, data: pd.DataFrame):
    return data[data[column] == condition]


def create_df_by_dates(
    data: pd.DataFrame, start_date: str, end_date: str | None = None
):
    if end_date:
        return data[data["Date"] > start_date & data["Date"] <= end_date]
    else:
        return data[data["Date"] > start_date]


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

def time_analysis(data:pd.DataFrame):
    return total_outin_by_month(data)
