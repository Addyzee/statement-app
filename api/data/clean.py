import pandas as pd
from utils.dirs import get_output_dir
output_dir = get_output_dir()


def remove_negatives(data: pd.DataFrame):
    data["Amount"] = data["Amount"].map(lambda x: abs(x))
    return data

def uniform_safaricom_naming(data: pd.DataFrame):
    data.loc[data["Account"].str.lower().str.contains("safaricom"),"Account"] = "Safaricom"
    return data

def uniform_mali_naming(data: pd.DataFrame):
    data.loc[data["Party Details"].str.lower().str.contains("mali"), "Party Details"] = \
    data.loc[data["Party Details"].str.lower().str.contains("mali"), "Party Details"].map(lambda x: x[:21])
    return data

    

def clean_data(path: str = f"{output_dir}/raw_transactions.csv"):
    try:
        data = pd.read_csv(path)
        data = remove_negatives(data=data)
        data = uniform_safaricom_naming(data=data)
        data = uniform_mali_naming(data=data)
        data.to_csv("data/transactions.csv", index=False)
        return remove_negatives(data=data)
    except Exception as e:
        raise e