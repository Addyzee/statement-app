import pandas as pd
from app.config import OUTPUT_DIR, DATA_DIR

output_dir = OUTPUT_DIR


def remove_negatives(data: pd.DataFrame):
    data["Amount"] = data["Amount"].map(lambda x: abs(x))
    return data


def uniform_safaricom_naming(data: pd.DataFrame):
    data.loc[data["Account ID"].str.lower().str.contains("safaricom"), "Account ID"] = (
        "Safaricom"
    )
    data.loc[
        data["Account Name"].str.lower().str.contains("safaricom offers"),
        "Account Name",
    ] = "Safaricom"
    data.loc[data["Type"].str.lower().str.contains("airtime"), "Account Name"] = (
        "Safaricom"
    )
    return data


def remove_original_conversation_messages(data: pd.DataFrame):
    mask = (
        data["Account Name"].str.lower().str.contains("original conversation", na=False)
    )
    data.loc[mask, "Account Name"] = data.loc[mask, "Account Name"].map(
        lambda x: x[: x.lower().find("original conversation")].strip()
    )
    return data


def uniform_mali_naming(data: pd.DataFrame):
    mask = (data["Account Name"].str.contains("MALI")) & (data["Direction"] == "Out")
    data.loc[mask, "Account Name"] = data.loc[mask, "Account Name"].map(
        lambda x: x[:27]
    )
    return data


def clean_data(path: str = f"{output_dir}/raw_transactions.csv"):
    try:
        data = pd.read_csv(path, parse_dates=["Date"])
        data = remove_negatives(data=data)
        data = uniform_safaricom_naming(data=data)
        data = remove_original_conversation_messages(data=data)
        data = uniform_mali_naming(data)
        data.to_csv(DATA_DIR / "transactions.csv", index=False)
        return remove_negatives(data=data)
    except Exception as e:
        raise e


def clean_data2(data: pd.DataFrame):
    try:
        data["Date"] = pd.to_datetime(data["Date"], errors="coerce")
        data = remove_negatives(data=data)
        data = uniform_safaricom_naming(data=data)
        data = remove_original_conversation_messages(data=data)
        data = uniform_mali_naming(data)
        return remove_negatives(data=data)
    except Exception as e:
        raise e
