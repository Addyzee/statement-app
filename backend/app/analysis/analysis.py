import pandas as pd
import numpy as np
from typing import Dict, List
from collections.abc import Callable
from app.data.clean import clean_data2, clean_data

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


def get_transaction_types(data: pd.DataFrame = data)-> List[str]:
    print("called")
    return list(data["Type"].unique())


def get_transaction_types_sum(data: pd.DataFrame = data):
    return data["Type"].value_counts().to_dict()


def amount_outin_per_transaction_type(
    data: pd.DataFrame, transaction_types: str | List[str] | None = None
) -> Dict[str, Dict[str, float]]:

    transaction_types = convert_to_default(
        data=data,
        object=transaction_types, defaulter_function=get_transaction_types
    )

    if len(transaction_types) == 0:
        raise "No transactions"

    mapped_amounts = {"In": {}, "Out": {}}
    for dir in ["In", "Out"]:
        for transaction_type in transaction_types:
            df = data[data["Type"] == transaction_type]
            amount = total_cashflow(data=df, direction=dir)
            if amount > 0:
                mapped_amounts[dir][transaction_type] = amount

    return mapped_amounts


def get_top_account_names_outin(data: pd.DataFrame):
    return (list(get_account_names_sum(data[data["Direction"] == "Out"], 10).keys()) +list(get_account_names_sum(data[data["Direction"] == "In"], 10).keys()))
    


def amount_outin_per_account_name(
    data: pd.DataFrame,
    account_names: str | List[str] | Dict[str, List[str]] | None = None
) -> Dict[str, Dict[str, float]]:
    
    account_names = convert_to_default(
        data=data,
        object=account_names, defaulter_function=get_top_account_names_outin
    )

    if len(account_names) == 0:
        raise "No transactions"

    mapped_amounts = {"In": {}, "Out": {}}
    for dir in ["In", "Out"]:
        for account_name in account_names:
            df = data[data["Account Name"] == account_name]
            amount = total_cashflow(data=df, direction=dir)
            if abs(amount) > 0:
                mapped_amounts[dir][account_name] = amount

    return mapped_amounts


def convert_to_default(
    defaulter_function: Callable[[], List[str]], data:pd.DataFrame, object: List[str] | str | None
):
    if object == None:
        return defaulter_function(data)
    elif type(object) == str:
        return [object]
    elif type(object) == List[str]:
        return object
    else:
        raise "Type must be str, list, or None"


def get_account_names_sum(data: pd.DataFrame = data, max: int = 15):
    return data["Account Name"].value_counts()[:max].to_dict()

def get_account_names_sum(data: pd.DataFrame = data, max: int = 15):
    return data.groupby("Account Name")["Amount"].sum().nlargest(max).to_dict()


def get_account_names_per_type(type: str, data: pd.DataFrame = data):
    return sorted(data.loc[data["Type"] == type, "Account Name"].unique())


def amount_per_account_name_per_type(
    transaction_type: str,
    transaction_party: List[str] | str | None = None,
    data: pd.DataFrame = data,
    max: int = 15,
):
    """
    Returns the amount of money transacted with each party, for a transaction type.
    Transaction type is a mandatory parameter.
    If transaction party is not provided, this returns the highest 15 transaction parties(highest == ordered by amount).
    """
    if transaction_party == None:

        return (
            data.loc[data["Type"] == transaction_type, ["Amount", "Account Name"]]
            .groupby("Account Name")
            .sum()
            .nlargest(max, "Amount")
            .reset_index()
            .to_dict(orient="records")
        )

    else:
        transaction_party = (
            [transaction_party] if type(transaction_party) == str else transaction_party
        )
        return (
            data.loc[
                (data["Type"] == transaction_type)
                & (data["Account Name"].isin(transaction_party)),
                ["Amount", "Account Name"],
            ]
            .groupby("Account Name")
            .sum()
            .reset_index()
            .to_dict(orient="records")
        )
        
def transaction_type_analysis(data:pd.DataFrame):
    try:
        transaction_types = get_transaction_types(data)
        frequencies = get_transaction_types_sum(data)    
        amounts = amount_outin_per_transaction_type(data)
        return {
            "transaction_types": transaction_types,
            "frequencies": frequencies,
            "amounts": amounts
        }
    except Exception as e:
        raise e


# print(total_cashflow())
# print(get_transaction_types())
# print(amount_outin_per_transaction_type()["Out"])
# print(get_account_names_per_type("Buy Goods"))
# print(amount_per_account_name_per_type(transaction_type="Receive money" ))
# print(get_account_names_sum())
# print(get_transaction_types_sum())
# print(amount_outin_per_account_name()["In"])
# print(total_cashflow(data=querying("Account Name", "Andrew Kamau Kimani")))
