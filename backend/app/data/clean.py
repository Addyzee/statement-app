import pandas as pd
from app.config import OUTPUT_DIR, DATA_DIR

output_dir = OUTPUT_DIR


def remove_negatives(data: pd.DataFrame):
    data["Amount"] = data["Amount"].map(lambda x: abs(x))
    return data

def uniform_safaricom_naming(data: pd.DataFrame):
    data.loc[data["Account ID"].str.lower().str.contains("safaricom"),"Account ID"] = "Safaricom"
    data.loc[data["Account Name"].str.lower().str.contains("safaricom offers"),"Account Name"] = "Safaricom"
    data.loc[data["Type"].str.lower().str.contains("airtime"),"Account Name"] = "Safaricom"    
    return data

def uniform_mali_naming(data: pd.DataFrame):
    data.loc[data["Account Name"].str.lower().str.contains("mali"), "Account Name"] = \
    data.loc[data["Account Name"].str.lower().str.contains("mali"), "Account Name"].map(lambda x: x[:21])
    return data

    

def clean_data(path: str = f"{output_dir}/raw_transactions.csv"):
    try:
        data = pd.read_csv(path)
        data = remove_negatives(data=data)
        data = uniform_safaricom_naming(data=data)
        data = uniform_mali_naming(data=data)
        data.to_csv(DATA_DIR / "transactions.csv", index=False)
        return remove_negatives(data=data)
    except Exception as e:
        raise e