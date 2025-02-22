import pandas as pd
from typing import Dict, List
from .utils import convert_to_default
from .totals import total_cashflow


def get_top_account_names_outin(data: pd.DataFrame):
    return list(
        get_account_names_sum(data[data["Direction"] == "Out"], 10).keys()
    ) + list(get_account_names_sum(data[data["Direction"] == "In"], 10).keys())


def amount_outin_per_account_name(
    data: pd.DataFrame,
    account_names: str | List[str] | Dict[str, List[str]] | None = None,
) -> Dict[str, Dict[str, float]]:

    account_names = convert_to_default(
        data=data, object=account_names, defaulter_function=get_top_account_names_outin
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

def get_account_names_frequencies(data: pd.DataFrame, max: int = 15):
    return data["Account Name"].value_counts()[:max].to_dict()


def get_account_names_sum(data: pd.DataFrame, max: int = 15):
    # Deprecated
    return data.groupby("Account Name")["Amount"].sum().nlargest(max).to_dict()


def get_account_names_per_type(data: pd.DataFrame, type: str):
    return sorted(data.loc[data["Type"] == type, "Account Name"].unique())


def amount_per_account_name_per_type(
    data: pd.DataFrame,
    transaction_type: str,
    transaction_party: List[str] | str | None = None,
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
