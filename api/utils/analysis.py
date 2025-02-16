import pandas as pd

data = pd.read_json(
    "../documents/output/transactions.json"
)


def get_total_cash_flow(data: pd.DataFrame=data):
    money_received = data[data.Direction == "In"]["Amount"].sum()
    print(money_received)
    
get_total_cash_flow()
    
