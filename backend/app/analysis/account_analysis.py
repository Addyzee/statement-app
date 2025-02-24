import pandas as pd
from typing import Dict, List
from .utils import convert_to_default
from .totals import total_cashflow

def get_all_account_names(data:pd.DataFrame):
    return list(data["Account Name"].unique())


def get_top_account_names_outin(data: pd.DataFrame):
    # Defaulter function 
    return (
        [key[0] for key in get_account_names_sum(data[data["Direction"] == "Out"], 10).keys()] + [key[0] for key in get_account_names_sum(data[data["Direction"] == "In"], 10).keys()])


def get_top_accounts_with_amounts_outin(data: pd.DataFrame):
    acc_amounts_in = get_account_names_sum(data[data["Direction"] == "In"], 10)
    acc_amounts_out = get_account_names_sum(data[data["Direction"] == "Out"], 10)

    return {
        "In": [{"Account_name": k[0], "Type": k[1], "Amount": v} for k, v in acc_amounts_in.items()],
        "Out": [{"Account_name": k[0], "Type": k[1],  "Amount": v} for k, v in acc_amounts_out.items()],
    }


def amount_outin_per_account_name(
    data: pd.DataFrame,
    account_names: str | List[str] | Dict[str, List[str]] | None = None,
) -> Dict[str, Dict[str, float]]:

    account_names = convert_to_default(
        data=data, object=account_names, defaulter_function=get_top_account_names_outin
    )

    if len(account_names) == 0:
        raise "No transactions"
    

    filtered_data = data[data["Type"].isin(account_names)]
    grouped_data = filtered_data.groupby("Type")

    mapped_amounts = {"In": {}, "Out": {}}
    for dir in ["In", "Out"]:
        total = total_cashflow(data=filtered_data, direction=dir)

        if total == 0:
            continue

        mapped_amounts[dir] = []
        for account_name, df in grouped_data:
            amount = total_cashflow(data=df, direction=dir)
            attrs = {"Account_name": account_name, "Amount": amount}

            mapped_amounts[dir].append(attrs)

    return mapped_amounts


def get_account_names_frequencies(data: pd.DataFrame, max: int = 15):
    return data["Account Name"].value_counts()[:max].to_dict()


def get_account_names_sum(data: pd.DataFrame, max: int = 15):
    return data.groupby(["Account Name", "Type"])["Amount"].sum().nlargest(max).to_dict()


def get_account_names_per_type(data: pd.DataFrame, type: str):
    return sorted(data.loc[data["Type"] == type, "Account Name"].unique())


def amount_per_account_name_per_type(
    data: pd.DataFrame,
    transaction_type: str,
    account_name: List[str] | str | None = None,
    max: int = 15,
):
    """
    Returns the amount of money transacted with each party, for a transaction type.
    Transaction type is a mandatory parameter.
    If transaction party is not provided, this returns the highest 15 transaction parties(highest == ordered by amount).
    """
    if account_name == None:

        return (
            data.loc[data["Type"] == transaction_type, ["Amount", "Account Name"]]
            .groupby("Account Name")
            .sum()
            .nlargest(max, "Amount")
            .reset_index()
            .to_dict(orient="records")
        )

    else:
        account_name = [account_name] if type(account_name) == str else account_name
        return (
            data.loc[
                (data["Type"] == transaction_type)
                & (data["Account Name"].isin(account_name)),
                ["Amount", "Account Name"],
            ]
            .groupby("Account Name")
            .sum()
            .reset_index()
            .to_dict(orient="records")
        )
