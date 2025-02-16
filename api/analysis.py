import pandas as pd
import numpy as np
from typing import Dict, List
from collections.abc import Callable
from data.clean import clean_data

data = clean_data()


def total_cashflow(
    direction: List[str] | str = ["In", "Out"], data: pd.DataFrame = data
) -> Dict[str, np.float64] | np.float64:
    try:
        if type(direction) == str:
            amount = np.round(data[data.Direction == direction]["Amount"].sum(), 3)
            return amount
        money_received = np.round(data[data.Direction == "In"]["Amount"].sum(), 3)
        money_sent = np.round(data[data.Direction == "Out"]["Amount"].sum(), 3)
        return {"In": money_received, "Out": money_sent}
    except Exception as e:
        raise e


def cashflow_by_dates(
    start_date: str, end_date: str | None = None, data: pd.DataFrame = data
):
    """
    end_date inclusive
    """
    if end_date:
        df = data[data["Date"] > start_date & data["Date"] <= end_date]
    else:
        df = data[data["Date"] > start_date]
    return total_cashflow(df)


def get_transaction_types(data: pd.DataFrame = data):
    return data["Type"].unique()


def amount_per_transaction_type(
    transaction_types: str | List[str] | None = None, data: pd.DataFrame = data
) -> Dict[str, Dict[str, np.float64]]:

    transaction_types = convert_to_default(object=transaction_types, defaulter_function=get_transaction_types)

    if len(transaction_types) == 0:
        raise "No transactions"

    mapped_amounts = {"In": {}, "Out": {}}
    for dir in ["In", "Out"]:
        for transaction_type in transaction_types:
            df = data[data["Type"] == transaction_type]
            amount = total_cashflow(data=df, direction=dir)
            if abs(amount) > 0:
                mapped_amounts[dir][transaction_type] = amount

    return mapped_amounts

def convert_to_default(defaulter_function: Callable[[],np.ndarray], object: List[str]|str|None):
    if object == None:
        return defaulter_function()
    elif type(object) == str:
        return [object]
    elif type(object) == List[str]:
        return object
    else:
        raise "Type must be str, list, or None"
    
def get_transaction_parties_per_type(type:str, max:int=10, data: pd.DataFrame = data):
    data.loc[data["Type"] == type,"Party"]


def amount_per_party(
    transaction_party: List[str] | None,
    transaction_types: List[str] | None = None,
    data: pd.DataFrame = data,
):
    transaction_party = (
        get_transaction_types()
        if transaction_types == None
        else (
            [transaction_types] if type(transaction_types) == str else transaction_types
        )
    )
    transaction_types = (
        get_transaction_types()
        if transaction_types == None
        else (
            [transaction_types] if type(transaction_types) == str else transaction_types
        )
    )
    pass


# print(total_cashflow())
# print(cashflow_by_dates("2024-12-01"))
# print(get_transaction_types())
print(amount_per_transaction_type())
