import pandas as pd
from .totals import total_cashflow
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

    grouped_data = data.groupby("Type")

    for dir in ["In", "Out"]:
        total = total_cashflow(data=data, direction=dir)

        for transaction_type, df in grouped_data:
            amount = total_cashflow(data=df, direction=dir)
            percent = (amount / total * 100) if total != 0 else 0

            if amount > 0 and percent >= 7:
                mapped_amounts[dir][transaction_type] = amount
            elif amount > 0 and percent < 7:
                mapped_amounts[dir].setdefault("others", {})[transaction_type] = amount

    return mapped_amounts