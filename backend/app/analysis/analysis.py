import pandas as pd
from typing import Dict
from app.data.clean import clean_data2, clean_data
from .t_type_analysis import (
    get_transaction_types,
    get_transaction_types_frequencies,
    amount_outin_per_transaction_type,
)
from .account_analysis import (
    get_account_names_frequencies,
    get_all_account_names,
    get_account_names_per_type,
    amount_outin_per_account_name,
    amount_per_account_name_per_type,
    get_account_names_sum,
    get_account_names_sum_with_others,
    get_top_account_names_outin,
    get_top_accounts_with_amounts_outin,
)
from .time_analysis import (
    total_outin_by_month,
    calculate_percentage_differences,
    average_outin_per_month,
    get_period,
    highest_outin_months,
)


def create_df_by_dates(
    data: pd.DataFrame, start_date: str, end_date: str | None = None
):
    if end_date:
        return data[data["Date"] > start_date & data["Date"] <= end_date]
    else:
        return data[data["Date"] > start_date]


def filterable_headers():
    return ["Type", "Account Name", "Direction"]


def transaction_type_analysis(data: pd.DataFrame):
    try:
        transaction_types = get_transaction_types(data)
        frequencies = get_transaction_types_frequencies(data)
        amounts = amount_outin_per_transaction_type(data)
        safaricom_charges = amount_outin_per_transaction_type(
            data, transaction_types="Safaricom Charges"
        )
        return {
            "types": sorted(transaction_types, key=str.casefold),
            "frequencies": frequencies,
            "amounts": amounts,
            "safaricom_charges": safaricom_charges,
        }
    except Exception as e:
        raise e


def query_analysis(data: pd.DataFrame, queries: Dict[str, str]):
    if "account_name" in queries:
        return amount_outin_per_account_name(data=data, account_names=queries["account_name"])
    return get_account_names_sum_with_others(data)    


def transaction_accounts_analysis(data: pd.DataFrame):
    all_accounts = get_all_account_names(data=data)
    frequencies = get_account_names_frequencies(data)
    amounts = get_top_accounts_with_amounts_outin(data)
    top_accounts = {"In": amounts["In"][0], "Out": amounts["Out"][0]}
    return {
        "accounts": sorted(all_accounts, key=str.casefold),
        "frequencies": frequencies,
        "amounts": amounts,
        "top_accounts": top_accounts,
    }


def time_analysis(data: pd.DataFrame):
    period = get_period(data)
    monthly_outin = total_outin_by_month(data)
    month_average = average_outin_per_month(data)
    highest_months = highest_outin_months(monthly_outin)
    average_out_difference = calculate_percentage_differences(
        highest_months["highest_out"]["Amount"], month_average["average_out"]
    )
    average_in_difference = calculate_percentage_differences(
        highest_months["highest_in"]["Amount"], month_average["average_in"]
    )
    highest_months["highest_in"]["percent_average_difference"] = average_in_difference
    highest_months["highest_out"]["percent_average_difference"] = average_out_difference
    return {
        "period": period,
        "monthly_analysis": monthly_outin,
        "average_monthly": month_average,
        "highest_months": highest_months,
    }
