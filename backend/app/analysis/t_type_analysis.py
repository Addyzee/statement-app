import pandas as pd
from .analysis import total_cashflow
from .utils import convert_to_default
from typing import Dict, List

def get_transaction_types(data: pd.DataFrame)-> List[str]:
    return list(data["Type"].unique())


def get_transaction_types_frequencies(data: pd.DataFrame):
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