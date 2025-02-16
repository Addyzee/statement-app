import pandas as pd


def remove_negatives(data: pd.DataFrame):
    data["Amount"] = data["Amount"].map(lambda x: abs(x))
    return data

def clean_data(path: str = "documents/output/raw_transactions.csv"):
    try:
        data = pd.read_csv(path)
        data = remove_negatives(data=data)
        data.to_csv("transactions.csv")
        return remove_negatives(data=data)
    except Exception as e:
        raise e