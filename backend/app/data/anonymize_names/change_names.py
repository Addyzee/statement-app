import pandas as pd
from app.config import DATA_DIR
from app.data.anonymize_names.name_generator import get_mapped_names
from app.data_writing.transaction_mapping.utils import from_to_at_checker

df = pd.read_csv(f"{DATA_DIR}/transactions.csv")

account_names = df["Account Name"]
mapped_names = get_mapped_names(account_names)

df["Account ID"] = df["Account ID"].apply(lambda x: "X" * len(x))
df["Account Name"] = df["Account Name"].apply(
    lambda x: mapped_names[x] if x != "Safaricom" else "Safaricom"
)


def change_original_transaction(transaction: str):
    mid = str(transaction).find(" -")

    if mid != -1:
        _, splitter_2 = from_to_at_checker(transaction)
        new_original = transaction[:splitter_2] + " - "
    else:
        new_original = transaction

    return new_original


df["Original Transaction"] = df.apply(
    lambda x: (
        change_original_transaction(x["Original Transaction"])
        + " "
        + x["Account ID"]
        + " "
        + x["Account Name"]
        if (
            (x["Account Name"] != "Safaricom"
            and x["Type"] in ["Send money", "Receive money", "Withdraw Money", "From bank/org", "Airtime", "Buy Goods", "Receive money from bank/org"])
            or x["Type"] == "Airtime"
        )
        else x["Original Transaction"]
    ),
    axis=1,
)


df.to_csv("sample.csv")

print(df)
print(df.shape)
