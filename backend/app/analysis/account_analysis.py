import pandas as pd
import numpy as np
from typing import Dict, List
from .utils import convert_to_default
from .totals import total_cashflow


def get_all_account_names(data: pd.DataFrame):
    # Used
    return list(data["Account Name"].unique())


def get_all_account_names_by_type(data: pd.DataFrame):
    # Used
    dfs = data.groupby("Type")["Account Name"]
    accounts = []
    for t_type, df in dfs:
        accounts.append({t_type: sorted(list(set(df.values)), key=str.casefold)})
    return accounts


def get_top_account_names_outin(data: pd.DataFrame):
    # Defaulter function
    return [
        key[0]
        for key in get_account_names_sum(data[data["Direction"] == "Out"], 10).keys()
    ] + [
        key[0]
        for key in get_account_names_sum(data[data["Direction"] == "In"], 10).keys()
    ]


def get_top_accounts_with_amounts_outin(data: pd.DataFrame):
    acc_amounts_in = get_account_names_sum(data[data["Direction"] == "In"], 10)
    acc_amounts_out = get_account_names_sum(data[data["Direction"] == "Out"], 10)

    return {
        "In": [
            {"Account_name": k[0], "Type": k[1], "Amount": v}
            for k, v in acc_amounts_in.items()
        ],
        "Out": [
            {"Account_name": k[0], "Type": k[1], "Amount": v}
            for k, v in acc_amounts_out.items()
        ],
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

    filtered_data = data[data["Account Name"].isin(account_names)]


    mapped_amounts = {"In": {}, "Out": {}}
    for dir in ["In", "Out"]:
        total = total_cashflow(data=filtered_data, direction=dir)

        if total == 0:
            continue

        mapped_amounts[dir] = []
        transactions = []
        
        df = filtered_data[filtered_data["Direction"] == dir].sort_values(by="Amount",ascending=False)
        attrs = {}
        attrs["Amounts"] ={}
        attrs["Amounts"]["Totals"] = total
        grouped_df = df.groupby("Account Name")
        for acc_name, small_df in grouped_df:
            attrs["Amounts"][acc_name] = small_df["Amount"].sum()
        
        
        
        head_df = df[:10]
        others = {}
        if df.shape[0]>10:
            tail_df = df[10:]
            tail_total = total_cashflow(data=tail_df, direction=dir)
            others = {}
            others["Original Message"] = "Others"
            others["Date"] = f"{tail_df.iloc[-1]["Date"]} - {tail_df.iloc[0]["Date"]}"
            others["Amount"] = tail_total
            others["Direction"] = dir
            
        for idx, row in head_df.iterrows():
            transaction = {}
            transaction["Account"] = row["Account Name"]
            transaction["Date"] = row["Date"]
            transaction["Amount"] = row["Amount"]
            transaction["Direction"] = row["Direction"]
            original_transaction = row["Original Transaction"]
            transaction["Original Message"] = (
                "No description" if
                type(original_transaction)==float
                else original_transaction
            )
            transactions.append(transaction)
        if len(others.keys()) > 0:
            transactions.append(others)
        
        
        attrs["Transactions"] = transactions
            

        mapped_amounts[dir].append(attrs)

    return mapped_amounts


def get_account_names_frequencies(data: pd.DataFrame, max: int = 15):
    return data["Account Name"].value_counts()[:max].to_dict()


def get_account_names_sum_with_others(data: pd.DataFrame, max: int = 15):
    mapped_amounts = {"In": {}, "Out": {}}
    for dir in ["In", "Out"]:
        filtered_data = data[data["Direction"] == dir]
        acc_names_sum = filtered_data.groupby(["Account Name", "Type"])["Amount"].sum()
        total_sum = acc_names_sum.values.sum()
        if total_sum == 0:
            continue
        acc_names_shape = acc_names_sum.shape[0]
        # Get sum of first <max> numbers
        max_largest = acc_names_sum.nlargest(max, "all")
        # Others sum
        others = acc_names_sum.nsmallest(acc_names_shape - max, "all")
        max_largest_dict = max_largest.to_dict()
        all_acc_dict = {}
        all_acc_dict["Amounts"] = {}
        all_acc_dict["Amounts"]["Total"] = total_sum
        grouped_df = filtered_data.groupby("Type")
        for t_type, small_df in grouped_df:
                all_acc_dict["Amounts"][t_type] = small_df["Amount"].sum()
                
        
        all_acc_dict["Accounts"] = [
            {"Account Name": k[0], "Type": k[1], "Amount": v}
            for k, v in max_largest_dict.items()
        ]
        if others.shape[0] > 0:
            others_sum = others.values.sum()
            all_acc_dict["Accounts"].append(
                {"Account Name": "Others", "Type": "Others", "Amount": others_sum}
            )
        mapped_amounts[dir] = all_acc_dict
    
    return mapped_amounts


def get_account_names_sum(data: pd.DataFrame, max: int = 15):
    return (
        data.groupby(["Account Name", "Type"])["Amount"].sum().nlargest(max).to_dict()
    )


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
        data.loc[data["Type"] == transaction_type, ["Amount", "Account Name"]].groupby(
            "Account Name"
        ).sum()

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
