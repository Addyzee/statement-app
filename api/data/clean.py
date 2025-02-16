import pandas as pd
from utils.dirs import get_output_dir
output_dir = get_output_dir()


def remove_negatives(data: pd.DataFrame):
    data["Amount"] = data["Amount"].map(lambda x: abs(x))
    return data

def clean_data(path: str = f"{output_dir}/raw_transactions.csv"):
    try:
        data = pd.read_csv(path)
        data = remove_negatives(data=data)
        data.to_csv("data/transactions.csv")
        return remove_negatives(data=data)
    except Exception as e:
        raise e